import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import './LoginRegister.css'
import useAuth from '../hooks/useAuth'
import FormError from '../components/FormError'
import { extractFromForm } from '../utils/FormUtils'
import { Redirect } from 'react-router'

const Register: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [redirect, setRedirect] = useState(false)

  const { register, success, error } = useAuth()

  useEffect(() => {
    if (success) setRedirect(true)
  }, [success])

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const email = extractFromForm(formRef.current, 'email')
    const username = extractFromForm(formRef.current, 'username')
    const password = extractFromForm(formRef.current, 'password')

    register({ email, username, password })
  }, [])

  return (
    <IonPage>
      {redirect && <Redirect exact to='/home' />}

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
          <IonItem lines='full'>
            <IonLabel position='floating'>Email</IonLabel>
            <IonInput type='email' name='email' required />
          </IonItem>
          <IonItem lines='full'>
            <IonLabel position='floating'>Username</IonLabel>
            <IonInput type='text' name='username' required />
          </IonItem>
          <IonItem lines='full'>
            <IonLabel position='floating'>Password</IonLabel>
            <IonInput type='password' name='password' required />
          </IonItem>

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
