import { useMutation, useQuery } from '@apollo/client'
import { DeleteExpenseDocument, GetExpenseDocument } from '../graphql/generated'

const useExpenseDetail = (id: string) => {
  const { data, loading, error } = useQuery(GetExpenseDocument, {
    variables: {
      expenseId: id,
    },
  })
  const [deleteExpense] = useMutation(DeleteExpenseDocument, {
    variables: {
      expenseId: id,
    },
  })

  return { expense: data?.getExpense, loading, error, deleteExpense }
}

export default useExpenseDetail
