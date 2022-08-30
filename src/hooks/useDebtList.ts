import { useQuery } from '@apollo/client'
import { GetAllDebtsDocument } from '../graphql/generated'

const useDebtList = () => {
  const { data, loading, error, refetch } = useQuery(GetAllDebtsDocument)

  return { debts: data?.getAllDebts, loading, error, refresh: refetch }
}

export default useDebtList
