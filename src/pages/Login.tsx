import React, { FormEvent, useCallback, useContext, useState } from 'react'
import {
  InputCustomEvent,
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
  useIonToast,
} from '@ionic/react'
import './Login.css'
import { ServiceContext } from '../providers/ServiceProvider'

const Login: React.FC = () => {
  const { auth } = useContext(ServiceContext)
  const [present] = useIonToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e: InputCustomEvent) => setEmail(e.detail.value ?? '')
  const handlePasswordChange = (e: InputCustomEvent) => setPassword(e.detail.value ?? '')

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const response = await auth.login({ email, password })
      if ('errorMessage' in response) present(`An error occurred: ${response.errorMessage}`, 2000)
      else present(`Token: ${response.token}`, 2000)
    },
    [email, password],
  )

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton />
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class='ion-padding'>
        <form className='login' onSubmit={handleSubmit}>
          <IonItem lines='full'>
            <IonLabel position='floating'>Email</IonLabel>
            <IonInput type='email' required onIonChange={handleEmailChange} />
          </IonItem>
          <IonItem lines='full'>
            <IonLabel position='floating'>Password</IonLabel>
            <IonInput type='password' required onIonChange={handlePasswordChange} />
          </IonItem>

          <IonButton type='submit' class='login-btn'>
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
