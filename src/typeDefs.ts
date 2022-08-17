// GraphQL types
export interface AuthSuccess {
  token: string
}

export interface User {
  id: string
  email: string
  username: string
}

export interface OfflinePerson {
  id: string
  name: string
}

export type Person = User | OfflinePerson

export interface Expense {
  id: string
  name: string
  timestamp: string
  totalAmount: number
  payer: Person
  debtors: {
    person: Person
    amount: number
  }[]
}

export interface Error {
  errorMessage: string
}

export type AuthResult = AuthSuccess | Error
export type UserResult = User | Error
export type ExpensesResult =
  | {
      expenses: Expense[]
    }
  | Error

// UI types
export interface ExpenseListElement {
  id: string
  name: string
  timestamp: string
  outstandingAmount: number
}

export type ExpensesListResult = ExpenseListElement[] | Error

// Utilities
export type Optional<T> = T | undefined
