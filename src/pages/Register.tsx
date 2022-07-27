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
import './Register.css'

const Register: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/login' />
          </IonButtons>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class='ion-padding'>
        <form className='register'>
          <IonItem lines='full'>
            <IonLabel position='floating'>Email</IonLabel>
            <IonInput type='email' required />
          </IonItem>
          <IonItem lines='full'>
            <IonLabel position='floating'>Username</IonLabel>
            <IonInput type='text' required />
          </IonItem>
          <IonItem lines='full'>
            <IonLabel position='floating'>Password</IonLabel>
            <IonInput type='password' required />
          </IonItem>

          <IonButton type='submit' class='register-btn'>
            Register
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  )
}

export default Register
