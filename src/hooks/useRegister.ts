import { useMutation } from '@apollo/client'
import { useCallback, useContext, useState } from 'react'
import { RegisterDocument, RegisterMutationVariables } from '../graphql/generated'
import { CredentialsCacheContext } from '../utils/CredentialsCache'

export type RegisterForm = RegisterMutationVariables

const useRegister = () => {
  const credentialsCache = useContext(CredentialsCacheContext)
  const [registerMutation, { loading, error }] = useMutation(RegisterDocument)

  const [success, setSuccess] = useState(false)

  const register = useCallback(
    (form: RegisterForm) => {
      registerMutation({ variables: { ...form } }).then((res) => {
        if (res.data) {
          credentialsCache.storeToken(res.data.register.token)
          setSuccess(true)
        }
      })
    },
    [credentialsCache, registerMutation],
  )

  return { register, success, loading, error }
}

export default useRegister
