import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client'

import { AuthResult } from '../typeDefs'

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
}

const LOGIN = gql`
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

const REGISTER = gql`
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

export default class AuthService implements IAuthService {
  constructor(private apolloClient: ApolloClient<NormalizedCacheObject>) {}

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
}