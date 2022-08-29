import { Debtor, OfflinePerson, User } from './graphql/generated'

export type Person = User | OfflinePerson

export interface Error {
  errorMessage: string
}

export type SplitMethod = 'equal' | 'unequal'

export interface SplitResult {
  debtors: Debtor[]
  rest: number
}

export interface ExpenseListElement {
  id: string
  name: string
  timestamp: string
  outstandingAmount: number
}

// Utilities
export type Optional<T> = T | undefined
