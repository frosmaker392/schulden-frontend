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
import React, { useState } from 'react'
import DebtorsForm from '../components/createExpense/DebtorsForm'
import CurrencyInput from '../components/form/CurrencyInput'
import PersonInput from '../components/form/PersonInput'
import TextInput from '../components/form/TextInput'
import { Debtor } from '../graphql/generated'
import { Person } from '../typeDefs'

import './CreateExpense.css'

const CreateExpense: React.FC = () => {
  const [totalAmount, setTotalAmount] = useState(0)
  const [payer, setPayer] = useState<Person>()
  const [debtors, setDebtors] = useState<Debtor[]>([])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton />
          </IonButtons>
          <IonTitle>Create Expense</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <TextInput label='Expense name' type='text' name='name' />
        <CurrencyInput label='Amount' onChange={setTotalAmount} />
        <PersonInput label='Payer' person={payer} onChange={setPayer} />

        <DebtorsForm onChange={setDebtors} totalAmount={totalAmount} />

        <IonButton class='create-btn'>Create</IonButton>
      </IonContent>
    </IonPage>
  )
}

export default CreateExpense
