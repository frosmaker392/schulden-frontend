import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import {
  DebtSummaryResult,
  GetAllDebtsDocument,
  DebtorsResult,
  GetDebtSummaryDocument,
} from '../graphql/generated'

export interface IDebtService {
  getAllDebts(): Promise<DebtorsResult>
  getDebtSummary(): Promise<DebtSummaryResult>
}

export default class DebtService implements IDebtService {
  constructor(private apolloClient: ApolloClient<NormalizedCacheObject>) {}

  async getAllDebts(): Promise<DebtorsResult> {
    const { data } = await this.apolloClient.query({
      query: GetAllDebtsDocument,
    })
    return data.getAllDebts
  }

  async getDebtSummary(): Promise<DebtSummaryResult> {
    const { data } = await this.apolloClient.query({
      query: GetDebtSummaryDocument,
    })
    return data.getDebtSummary
  }
}
