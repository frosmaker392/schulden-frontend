export interface AuthSuccess {
  token: string
}

export interface User {
  id: string
  email: string
  username: string
}

export interface Error {
  errorMessage: string
}

export type AuthResult = AuthSuccess | Error
export type UserResult = User | Error

// Utilities
export type Optional<T> = T | undefined
