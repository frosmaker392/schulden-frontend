import { useQuery } from '@apollo/client'
import { GetExpenseDocument } from '../graphql/generated'

const useExpenseDetail = (id: string) => {
  const { data, loading, error } = useQuery(GetExpenseDocument, {
    variables: {
      expenseId: id,
    },
  })

  return { expense: data?.getExpense, loading, error }
}

export default useExpenseDetail
