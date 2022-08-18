import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { Error } from '../typeDefs'

import { GetAllExpensesDocument } from '../graphql/generated'

export interface IExpenseService {
  getAll(userId: string): Promise<ExpensesListResult>
}

export interface ExpenseListElement {
  id: string
  name: string
  timestamp: string
  outstandingAmount: number
}

export type ExpensesListResult = ExpenseListElement[] | Error

export default class ExpenseService implements IExpenseService {
  constructor(private apolloClient: ApolloClient<NormalizedCacheObject>) {}

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
}
