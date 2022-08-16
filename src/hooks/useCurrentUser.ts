import { useContext, useEffect, useState } from 'react'
import { AuthServiceContext } from '../providers/AuthServiceProvider'
import { Optional, User } from '../typeDefs'

const useCurrentUser = () => {
  const authService = useContext(AuthServiceContext)

  const [user, setUser] = useState<Optional<User>>()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const execute = async () => {
      setPending(true)

      const userResult = await authService.getCurrentUser()

      if ('errorMessage' in userResult) setError(userResult.errorMessage)
      else setUser(userResult)

      setPending(false)
    }

    execute()
  }, [])

  return { user, pending, error }
}

export default useCurrentUser
