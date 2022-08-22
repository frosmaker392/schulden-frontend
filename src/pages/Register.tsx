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
} from '@ionic/react'
import './LoginRegister.css'
import useAuth from '../hooks/useAuth'
import FormError from '../components/form/FormError'
import { extractFromForm } from '../utils/FormUtils'
import { Redirect } from 'react-router'
import PasswordInput from '../components/form/PasswordInput'
import TextInput from '../components/form/TextInput'

const Register: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [redirect, setRedirect] = useState(false)

  const { register, success, error } = useAuth()

  useEffect(() => {
    if (success) setRedirect(true)
  }, [success])

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
          <TextInput label='Email' type='email' />
          <TextInput label='Username' type='text' name='username' />
          <PasswordInput label='Password' />

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
