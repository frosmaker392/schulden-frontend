import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

import {
  LoginDocument,
  RegisterDocument,
  CurrentUserDocument,
  LoginMutation,
  User,
} from '../graphql/generated'
import { Error } from '../typeDefs'

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
  getCurrentUser(): Promise<UserResult>
}

export default class AuthService implements IAuthService {
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

    return result.data?.currentUser ?? { errorMessage: 'Invalid token!' }
  }
}
