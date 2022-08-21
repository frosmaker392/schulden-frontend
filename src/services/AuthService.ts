import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

import {
  LoginDocument,
  RegisterDocument,
  CurrentUserDocument,
  LoginMutation,
  User,
} from '../graphql/generated'
import { Error, Optional } from '../typeDefs'

export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  email: string
  username: string
  password: string
}

export type AuthResult = LoginMutation['login']

export type UserResult = User | Error

export interface IAuthService {
  login(form: LoginForm): Promise<AuthResult>
  register(form: RegisterForm): Promise<AuthResult>
  cachedUser: Optional<User>
  getCurrentUser(): Promise<UserResult>
}

export default class AuthService implements IAuthService {
  private _cachedUser: Optional<User> = undefined
  constructor(private apolloClient: ApolloClient<NormalizedCacheObject>) {}

  async login(form: LoginForm): Promise<AuthResult> {
    const res = await this.apolloClient.mutate({
      mutation: LoginDocument,
      variables: { ...form },
    })
    return res.data?.login ?? { errorMessage: 'No server response!' }
  }

  async register(form: RegisterForm): Promise<AuthResult> {
    const result = await this.apolloClient.mutate({
      mutation: RegisterDocument,
      variables: { ...form },
    })
    return result.data?.register ?? { errorMessage: 'No server response!' }
  }

  async getCurrentUser(): Promise<UserResult> {
    const result = await this.apolloClient.query({
      query: CurrentUserDocument,
    })

    const userResult = result.data?.currentUser
    if (userResult && 'email' in userResult) this._cachedUser = userResult

    return userResult ?? { errorMessage: 'Invalid token!' }
  }

  public get cachedUser(): Optional<User> {
    return this._cachedUser
  }
}
