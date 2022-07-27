export type AuthResult =
  | {
      token: string
    }
  | {
      errorMessage: string
    }
