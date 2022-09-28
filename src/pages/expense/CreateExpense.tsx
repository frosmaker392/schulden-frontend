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
  useIonRouter,
  useIonToast,
} from '@ionic/react'
import React, { useCallback, useState } from 'react'
import FormError from '../../components/atoms/FormError'
import CurrencyInput from '../../components/molecules/CurrencyInput'
import PersonInput from '../../components/organisms/PersonInput'
import TextInput from '../../components/molecules/TextInput'
import DebtorsForm from '../../components/organisms/DebtorsForm'
import useCreateExpense from '../../hooks/useCreateExpense'
import { Person, SplitResult } from '../../typeDefs'

import './CreateExpense.css'

const CreateExpense: React.FC = () => {
  const [present] = useIonToast()
  const r = useIonRouter()

  const [name, setName] = useState('')
  const [totalAmount, setTotalAmount] = useState(0)
  const [payer, setPayer] = useState<Person>()
  const [splitResult, setSplitResult] = useState<SplitResult>({
    debtors: [],
    rest: 0,
  })

  const { createExpense, loading, error } = useCreateExpense()

  const onNameChange = useCallback((e: InputCustomEvent) => {
    setName(e.detail.value ?? '')
  }, [])

  const onSubmit = useCallback(() => {
    createExpense({
      name,
      totalAmount,
      payer,
      splitResult,
    }).then((res) => {
      if (!res) return

      const lastRoute = r.routeInfo.pushedByRoute

      if (lastRoute) r.push(lastRoute, 'back')
      else r.push('/main', 'back')

      if (res?.data) present(`Successfully created expense "${res.data.createExpense.name}"`, 2000)
    })
  }, [createExpense, name, payer, present, r, splitResult, totalAmount])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/main' />
          </IonButtons>
          <IonTitle>Create Expense</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class='create-expense-form'>
        <TextInput label='Expense name' type='text' name='name' onIonChange={onNameChange} />
        <CurrencyInput label='Amount' onChange={setTotalAmount} />
        <PersonInput label='Payer' person={payer} onChange={setPayer} />

        <DebtorsForm onChange={setSplitResult} totalAmount={totalAmount} />

        <FormError error={error} />

        <IonButton disabled={loading} class='create-btn' onClick={onSubmit}>
          Create
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

export default CreateExpense
