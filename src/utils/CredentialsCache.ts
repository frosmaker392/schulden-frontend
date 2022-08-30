import { createContext } from 'react'
import { User } from '../graphql/generated'
import { Optional } from '../typeDefs'

export class CredentialsCache {
  private readonly jwtTokenKey = 'schulden-jwt-token'
  private _user: Optional<User>

  getToken(): Optional<string> {
    return localStorage.getItem(this.jwtTokenKey) ?? undefined
  }

  storeToken(token: string) {
    localStorage.setItem(this.jwtTokenKey, token)
  }

  clearToken() {
    localStorage.removeItem(this.jwtTokenKey)
  }

  get user(): Optional<User> {
    return this._user
  }

  set user(v: Optional<User>) {
    this._user = v
  }
}

export const CredentialsCacheContext = createContext<CredentialsCache>(new CredentialsCache())
