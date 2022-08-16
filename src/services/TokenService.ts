import { Optional } from '../typeDefs'

export interface ITokenService {
  getToken(): Optional<string>
  storeToken(token: string): void
  clearToken(): void
}

export default class TokenService implements ITokenService {
  readonly tokenStoreKey: string = 'schulden-jwt'
  constructor(private store: Storage) {}

  getToken(): Optional<string> {
    return this.store.getItem(this.tokenStoreKey) ?? undefined
  }

  storeToken(token: string): void {
    this.store.setItem(this.tokenStoreKey, token)
  }

  clearToken(): void {
    this.store.removeItem(this.tokenStoreKey)
  }
}
