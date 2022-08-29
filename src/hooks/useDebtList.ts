import { useQuery } from '@apollo/client'
import { GetAllDebtsDocument } from '../graphql/generated'

const useDebtList = () => {
  const { data, loading, error } = useQuery(GetAllDebtsDocument)

  return { debts: data?.getAllDebts, loading, error }
}

export default useDebtList
