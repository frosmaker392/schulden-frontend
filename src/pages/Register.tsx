import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react'
import './LoginRegister.css'
import useAuth from '../hooks/useAuth'
import { extractFromForm } from '../utils/FormUtils'
import { Redirect } from 'react-router'
import TextInput from '../components/molecules/TextInput'
import FormError from '../components/atoms/FormError'
import PasswordInput from '../components/molecules/PasswordInput'

const Register: React.FC = () => {
  const [present] = useIonToast()

  const formRef = useRef<HTMLFormElement>(null)
  const [redirect, setRedirect] = useState(false)

  const { register, success, error } = useAuth()

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
      const username = extractFromForm(formRef.current, 'username')
      const password = extractFromForm(formRef.current, 'password')

      register({ email, username, password })
    },
    [register],
  )

  return (
    <IonPage>
      {redirect && <Redirect exact to='/main' />}

      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/login' />
          </IonButtons>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form className='login-register' ref={formRef} onSubmit={handleSubmit}>
          <TextInput label='Email' type='email' name='email' required />
          <TextInput label='Username' type='text' name='username' required />
          <PasswordInput label='Password' name='password' required />

          <FormError error={error} />

          <IonButton type='submit' class='submit-btn'>
            Register
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  )
}

export default Register
