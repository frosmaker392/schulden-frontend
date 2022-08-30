import { useQuery } from '@apollo/client'
import { useMemo } from 'react'
import { GetAllRelatedExpensesDocument } from '../graphql/generated'
import { toExpenseListElement } from '../utils'
import useCurrentUser from './useCurrentUser'

const useRelatedExpenseList = (otherPersonId: string) => {
  const { user } = useCurrentUser()
  const { data, loading, error } = useQuery(GetAllRelatedExpensesDocument, {
    variables: { personId: otherPersonId },
  })

  const expenses = useMemo(
    () => toExpenseListElement(user?.id, data?.getAllRelatedExpenses),
    [data, user],
  )

  return { expenses, loading, error }
}

export default useRelatedExpenseList
