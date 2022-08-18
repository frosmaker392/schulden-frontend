import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import DebtorsForm from '../components/createExpense/DebtorsForm'
import TextInput from '../components/form/TextInput'

import './CreateExpense.css'

const CreateExpense: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Expense</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <TextInput label='Expense name' type='text' name='name' />
        <TextInput label='Amount' type='number' name='totalAmount' />
        <TextInput label='Payer' type='search' name='payer' id='payer-recommendations' />

        <DebtorsForm />

        <IonButton class='create-btn'>Create</IonButton>
      </IonContent>
    </IonPage>
  )
}

export default CreateExpense
