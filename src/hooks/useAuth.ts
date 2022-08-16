import { useCallback, useContext, useState } from 'react'
import { AuthServiceContext } from '../providers/AuthServiceProvider'
import { TokenServiceContext } from '../providers/TokenServiceProvider'
import { LoginForm, RegisterForm } from '../services/AuthService'

const useAuth = () => {
  const authService = useContext(AuthServiceContext)
  const tokenService = useContext(TokenServiceContext)

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const login = useCallback(async (form: LoginForm) => {
    const result = await authService.login(form)

    if ('token' in result) {
      tokenService.storeToken(result.token)
      setSuccess(true)
    } else setError(result.errorMessage)
  }, [])

  const register = useCallback(async (form: RegisterForm) => {
    const result = await authService.register(form)

    if ('token' in result) {
      tokenService.storeToken(result.token)
      setSuccess(true)
    } else setError(result.errorMessage)
  }, [])

  return { login, register, success, error }
}

export default useAuth
