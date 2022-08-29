import { useMutation } from '@apollo/client'
import { useCallback, useContext, useState } from 'react'
import { LoginDocument, LoginMutationVariables } from '../graphql/generated'
import { CredentialsCacheContext } from '../utils/CredentialsCache'

export type LoginForm = LoginMutationVariables

const useLogin = () => {
  const credentialsCache = useContext(CredentialsCacheContext)
  const [loginMutation, { loading, error }] = useMutation(LoginDocument)

  const [success, setSuccess] = useState(false)

  const login = useCallback(
    (form: LoginForm) => {
      loginMutation({ variables: { ...form } }).then((res) => {
        if (res.data) {
          credentialsCache.storeToken(res.data.login.token)
          setSuccess(true)
        }
      })
    },
    [credentialsCache, loginMutation],
  )

  return { login, success, loading, error }
}

export default useLogin
