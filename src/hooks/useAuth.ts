import { useCallback, useContext, useState } from 'react'
import { ServiceContext } from '../providers/ServiceProvider'
import { LoginForm, RegisterForm } from '../services/AuthService'

const useAuth = (onSuccess: () => void) => {
  const { auth } = useContext(ServiceContext)
  const [error, setError] = useState('')

  const login = useCallback(async (form: LoginForm) => {
    const result = await auth.login(form)
    if ('token' in result) {
      auth.storeToken(result.token)
      onSuccess()
    } else setError(result.errorMessage)
  }, [])

  const register = useCallback(async (form: RegisterForm) => {
    const result = await auth.register(form)
    if ('token' in result) {
      auth.storeToken(result.token)
      onSuccess()
    } else setError(result.errorMessage)
  }, [])

  return { login, register, error }
}

export default useAuth
