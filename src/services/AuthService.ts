import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client'

import { AuthResult, Optional } from '../typeDefs'

export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  email: string
  username: string
  password: string
}

export interface IAuthService {
  login(form: LoginForm): Promise<AuthResult>
  register(form: RegisterForm): Promise<AuthResult>

  getToken(): Optional<string>
  storeToken(token: string): void
  clearToken(): void
}

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ... on AuthPayload {
        token
      }
      ... on Error {
        errorMessage
      }
    }
  }
`

export const REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ... on AuthPayload {
        token
      }
      ... on Error {
        errorMessage
      }
    }
  }
`

const tokenStoreKey = 'schulden-jwt'

export default class AuthService implements IAuthService {
  constructor(
    private apolloClient: ApolloClient<NormalizedCacheObject>,
    private tokenStore: Storage,
  ) {}

  async login(form: LoginForm): Promise<AuthResult> {
    const result = await this.apolloClient.mutate({
      mutation: LOGIN,
      variables: { ...form },
    })
    return result.data.login
  }

  async register(form: RegisterForm): Promise<AuthResult> {
    const result = await this.apolloClient.mutate({
      mutation: REGISTER,
      variables: { ...form },
    })
    return result.data.register
  }

  getToken(): Optional<string> {
    return this.tokenStore.getItem(tokenStoreKey) ?? undefined
  }

  storeToken(token: string): void {
    this.tokenStore.setItem(tokenStoreKey, token)
  }

  clearToken(): void {
    this.tokenStore.removeItem(tokenStoreKey)
  }
}
