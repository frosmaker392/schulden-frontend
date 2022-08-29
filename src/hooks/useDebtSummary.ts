import { useQuery } from '@apollo/client'
import { GetDebtSummaryDocument } from '../graphql/generated'

const useDebtSummary = () => {
  const { data, loading, error, refetch } = useQuery(GetDebtSummaryDocument)

  return {
    summary: data?.getDebtSummary,
    loading,
    error,
    refresh: refetch,
  }
}

export default useDebtSummary
