export type AuthSuccess = {
  token: string
}
export type Error = {
  errorMessage: string
}

export type AuthResult = AuthSuccess | Error

// Utilities
export type Optional<T> = T | undefined
