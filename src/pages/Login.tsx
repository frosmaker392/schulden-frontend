import React from 'react'
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
import './Login.css'

const Login: React.FC = () => {
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
        <form className='login'>
          <IonItem lines='full'>
            <IonLabel position='floating'>Email</IonLabel>
            <IonInput type='email' required />
          </IonItem>
          <IonItem lines='full'>
            <IonLabel position='floating'>Password</IonLabel>
            <IonInput type='password' required />
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
