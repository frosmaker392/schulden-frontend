import {
  InputCustomEvent,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import React, { useCallback, useState } from 'react'
import DebtorsForm from '../components/createExpense/DebtorsForm'
import PersonInput from '../components/form/PersonInput'
import TextInput from '../components/form/TextInput'
import { Debtor } from '../graphql/generated'
import { Person } from '../typeDefs'

import './CreateExpense.css'

const CreateExpense: React.FC = () => {
  const [totalAmount, setTotalAmount] = useState(0)
  const [payer, setPayer] = useState<Person>()
  const [debtors, setDebtors] = useState<Debtor[]>([])

  const onAmountChange = useCallback((e: InputCustomEvent) => {
    const amount = parseFloat(e.detail.value ?? '0')
    if (isNaN(amount)) setTotalAmount(0)
    setTotalAmount(amount)
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Expense</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <TextInput label='Expense name' type='text' name='name' />
        <TextInput label='Amount' type='number' name='totalAmount' onIonChange={onAmountChange} />
        <PersonInput label='Payer' person={payer} onChange={setPayer} />

        <DebtorsForm onChange={setDebtors} totalAmount={totalAmount} />

        <IonButton class='create-btn'>Create</IonButton>
      </IonContent>
    </IonPage>
  )
}

export default CreateExpense
