import { OfflinePerson, User } from './graphql/generated'

export type Person = User | OfflinePerson

export interface Error {
  errorMessage: string
}

// Utilities
export type Optional<T> = T | undefined
