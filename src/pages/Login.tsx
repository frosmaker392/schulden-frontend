import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react'
import './LoginRegister.css'
import useAuth from '../hooks/useAuth'
import { Redirect } from 'react-router'

import TextInput from '../components/molecules/TextInput'
import FormError from '../components/atoms/FormError'
import { extractFromForm } from '../utils'
import PasswordInput from '../components/molecules/PasswordInput'

const Login: React.FC = () => {
  const [present] = useIonToast()

  const formRef = useRef<HTMLFormElement>(null)
  const [redirect, setRedirect] = useState(false)

  const { login, success, error } = useAuth()

  useEffect(() => {
    if (success) {
      present(`Logged in as ${extractFromForm(formRef.current, 'email')}`, 2000)
      setRedirect(true)
    }
  }, [present, success])

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const email = extractFromForm(formRef.current, 'email')
      const password = extractFromForm(formRef.current, 'password')

      login({ email, password })
    },
    [login],
  )

  return (
    <IonPage>
      {redirect && <Redirect exact to='/main' />}

      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form className='login-register' onSubmit={handleSubmit} ref={formRef}>
          <TextInput label='Email' type='email' name='email' required />
          <PasswordInput label='Password' name='email' required />

          <FormError error={error} />

          <IonButton type='submit' class='submit-btn'>
            Login
          </IonButton>
          <IonButton fill='clear' routerLink='/register'>
            Register
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  )
}

export default Login
