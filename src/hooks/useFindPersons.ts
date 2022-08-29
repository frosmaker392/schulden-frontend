import { useQuery } from '@apollo/client'
import { FindPersonsDocument } from '../graphql/generated'

const useFindPersons = (name: string) => {
  const { data, loading, error } = useQuery(FindPersonsDocument, {
    variables: { name },
  })

  return { persons: data?.findPersons, loading, error }
}

export default useFindPersons
