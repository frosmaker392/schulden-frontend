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

import FormError from '../components/form/FormError'
import PasswordInput from '../components/form/PasswordInput'
import TextInput from '../components/form/TextInput'

const Login: React.FC = () => {
  const [present] = useIonToast()

  const formRef = useRef<HTMLFormElement>(null)
  const [redirect, setRedirect] = useState(false)

  const { login, success, error } = useAuth()

  useEffect(() => {
    if (success) {
      present('Login successful!', 2000)
      setRedirect(true)
    }
  }, [success])

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const email = formRef.current?.email.value ?? ''
    const password = formRef.current?.password.value ?? ''

    login({ email, password })
  }, [])

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
          <TextInput label='Email' type='email' />
          <PasswordInput label='Password' />

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
