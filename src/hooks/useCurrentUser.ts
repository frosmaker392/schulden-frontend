import { useLazyQuery } from '@apollo/client'
import { useContext, useState } from 'react'
import { useAsync } from 'react-async-hook'
import { CurrentUserDocument, User } from '../graphql/generated'
import { CredentialsCacheContext } from '../utils/CredentialsCache'

const useCurrentUser = () => {
  const credentialsCache = useContext(CredentialsCacheContext)
  const [currentUserQuery, { loading, error }] = useLazyQuery(CurrentUserDocument)

  const [user, setUser] = useState<User>()

  useAsync(async () => {
    if (credentialsCache.user) setUser(credentialsCache.user)
    else {
      const result = (await currentUserQuery()).data
      setUser(result?.currentUser ?? undefined)
    }
  }, [])

  return { user, loading, error }
}

export default useCurrentUser
