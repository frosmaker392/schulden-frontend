import { useMutation, useQuery } from '@apollo/client'
import { useCallback } from 'react'
import { CreateOfflinePersonDocument, FindPersonsDocument } from '../graphql/generated'

const useFindPersons = (name: string) => {
  const { data, loading, error, refetch } = useQuery(FindPersonsDocument, {
    variables: { name },
  })
  const [createPersonMutation] = useMutation(CreateOfflinePersonDocument)

  const createPerson = useCallback(
    (personName: string) => {
      createPersonMutation({ variables: { name: personName } }).then(() => refetch({ name }))
    },
    [createPersonMutation, name, refetch],
  )

  return { persons: data?.findPersons, loading, error, createPerson }
}

export default useFindPersons
