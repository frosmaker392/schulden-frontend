import { useContext } from 'react'
import { AuthServiceContext } from '../providers/AuthServiceProvider'
import { useAsync } from 'react-async-hook'

const useCurrentUser = () => {
  const authService = useContext(AuthServiceContext)

  const { result, loading, error } = useAsync(async () => {
    if (authService.cachedUser) return authService.cachedUser

    const result = await authService.getCurrentUser()
    if ('errorMessage' in result) throw new Error(result.errorMessage)
    return result
  }, [])

  return { user: result, loading, error }
}

export default useCurrentUser
