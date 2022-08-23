import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { Error, Optional } from '../typeDefs'

import {
  CreateExpenseDocument,
  ExpenseResult,
  FindPersonsDocument,
  GetAllExpensesDocument,
  Person,
} from '../graphql/generated'

interface Debtor {
  person: Person
  amount: number
}

export interface ExpenseForm {
  name: string
  totalAmount: number
  payer: Person
  debtors: Debtor[]
}

export interface ExpenseListElement {
  id: string
  name: string
  timestamp: string
  outstandingAmount: number
}

export type ExpensesListResult = ExpenseListElement[] | Error

export type PersonsResult = Person[] | Error

export type SplitMethod = 'equal' | 'unequal'

export interface SplitResult {
  debtors: Debtor[]
  rest: number
}

export const calculateSplit: IExpenseService['calculateSplit'] = (
  totalAmount: number,
  splitMethod: SplitMethod,
  persons: Person[],
  amounts: Optional<number>[],
) => {
  if (splitMethod === 'equal') {
    const amountPerPerson = Math.floor((totalAmount * 100) / persons.length) / 100
    const floatingCents = Math.round((totalAmount - amountPerPerson * persons.length) * 100)

    return {
      debtors: persons.map((p, i) => {
        const cent = i < floatingCents ? 0.01 : 0

        return {
          person: p,
          amount: amountPerPerson + cent,
        }
      }),
      rest: 0,
    }
  }

  const rest = amounts.reduce((acc: number, amount) => acc - (amount ?? 0), totalAmount)
  return {
    debtors: persons.map((p, i) => ({
      person: p,
      amount: amounts.at(i) ?? 0,
    })),
    rest,
  }
}

export interface IExpenseService {
  create(form: ExpenseForm): Promise<ExpenseResult>
  getAll(userId: string): Promise<ExpensesListResult>
  findPersons(name: string): Promise<PersonsResult>
  calculateSplit(
    totalAmount: number,
    splitMethod: SplitMethod,
    persons: Person[],
    amounts: Optional<number>[],
  ): SplitResult
}

export default class ExpenseService implements IExpenseService {
  constructor(private apolloClient: ApolloClient<NormalizedCacheObject>) {}

  async create(form: ExpenseForm): Promise<ExpenseResult> {
    const res = await this.apolloClient.query({
      query: CreateExpenseDocument,
      variables: {
        name: form.name,
        totalAmount: form.totalAmount,
        payerId: form.payer.id,
        debtors: form.debtors.map((d) => ({ personId: d.person.id, amount: d.amount })),
      },
    })

    return res.data.createExpense
  }

  async getAll(userId: string): Promise<ExpensesListResult> {
    const res = await this.apolloClient.query({
      query: GetAllExpensesDocument,
    })

    const data = res.data.getAllExpenses

    if ('errorMessage' in data) {
      return data
    }

    return data.expenses.map((e) => {
      let outstandingAmount = 0
      if (e.payer.id === userId) {
        for (const debtor of e.debtors) {
          if (debtor.person.id === userId) continue

          outstandingAmount += debtor.amount
        }
      } else {
        const matchingDebtor = e.debtors.find((d) => d.person.id === userId)
        outstandingAmount -= matchingDebtor?.amount ?? 0
      }

      return {
        id: e.id,
        name: e.name,
        timestamp: e.timestamp,
        outstandingAmount,
      }
    })
  }

  async findPersons(name: string): Promise<PersonsResult> {
    const res = await this.apolloClient.query({
      query: FindPersonsDocument,
      variables: { name },
    })

    const data = res.data.findPersons
    return 'errorMessage' in data ? data : data.persons
  }

  calculateSplit(...args: Parameters<IExpenseService['calculateSplit']>) {
    return calculateSplit(...args)
  }
}
