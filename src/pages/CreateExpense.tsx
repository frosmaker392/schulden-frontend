import {
  InputCustomEvent,
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
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import DebtorsForm from '../components/createExpense/DebtorsForm'
import CurrencyInput from '../components/form/CurrencyInput'
import FormError from '../components/form/FormError'
import PersonInput from '../components/form/PersonInput'
import TextInput from '../components/form/TextInput'
import useCreateExpense from '../hooks/useCreateExpense'
import { SplitResult } from '../services/ExpenseService'
import { Person } from '../typeDefs'

import './CreateExpense.css'

const CreateExpense: React.FC = () => {
  const [name, setName] = useState('')
  const [totalAmount, setTotalAmount] = useState(0)
  const [payer, setPayer] = useState<Person>()
  const [splitResult, setSplitResult] = useState<SplitResult>({
    debtors: [],
    rest: 0,
  })

  const [present] = useIonToast()
  const h = useHistory()

  const { createExpense, loading, error } = useCreateExpense({
    name,
    totalAmount,
    payer,
    splitResult,
  })

  const onNameChange = useCallback((e: InputCustomEvent) => {
    setName(e.detail.value ?? '')
  }, [])

  const onSubmit = useCallback(() => {
    createExpense().then((e) => {
      h.goBack()
      present(`Successfully created expense "${e.name}"`, 2000)
    })
  }, [createExpense, h, present])

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

      <IonContent class='create-expense-form'>
        <TextInput label='Expense name' type='text' name='name' onIonChange={onNameChange} />
        <CurrencyInput label='Amount' onChange={setTotalAmount} />
        <PersonInput label='Payer' person={payer} onChange={setPayer} />

        <DebtorsForm onChange={setSplitResult} totalAmount={totalAmount} />

        <FormError error={error?.message} />

        <IonButton disabled={loading} class='create-btn' onClick={onSubmit}>
          Create
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

export default CreateExpense
