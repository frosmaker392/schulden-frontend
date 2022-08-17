import { ApolloClient, ApolloQueryResult, gql, NormalizedCacheObject } from '@apollo/client'
import { ExpensesListResult, ExpensesResult } from '../typeDefs'

export interface IExpenseService {
  getAll(userId: string): Promise<ExpensesListResult>
}

const GET_ALL_EXPENSES = gql`
  query Expenses {
    getAllExpenses {
      ... on Expenses {
        expenses {
          id
          name
          timestamp
          payer {
            ... on User {
              id
            }
            ... on OfflinePerson {
              id
            }
          }
          debtors {
            person {
              ... on User {
                id
              }
              ... on OfflinePerson {
                id
              }
            }
            amount
          }
        }
      }
      ... on Error {
        errorMessage
      }
    }
  }
`

export default class ExpenseService implements IExpenseService {
  constructor(private apolloClient: ApolloClient<NormalizedCacheObject>) {}

  async getAll(userId: string): Promise<ExpensesListResult> {
    const { data }: ApolloQueryResult<{ getAllExpenses: ExpensesResult }> =
      await this.apolloClient.query({
        query: GET_ALL_EXPENSES,
      })

    if ('errorMessage' in data.getAllExpenses) {
      return data.getAllExpenses
    }

    return data.getAllExpenses.expenses.map((e) => {
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
