import { useQuery } from '@apollo/client'
import { GetPersonDocument } from '../graphql/generated'

const useGetPerson = (id: string) => {
  const { data, loading, error } = useQuery(GetPersonDocument, {
    variables: { personId: id },
  })

  return { person: data?.getPerson, loading, error }
}

export default useGetPerson
