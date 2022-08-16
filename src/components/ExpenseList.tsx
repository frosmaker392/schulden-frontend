import { IonItem, IonLabel, IonList } from '@ionic/react'
import React from 'react'

import './ExpenseList.css'

export interface ExpenseListElement {
  id: string
  name: string
  outstandingAmount: number
}

interface ExpenseListProps {
  expenses: ExpenseListElement[]
}

const outstandingAmountLabel = (amount: number): string => {
  if (amount === 0) return '--'

  const formattedAmount = Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(Math.abs(amount))

  if (amount < 0) return `You owe ${formattedAmount}`
  return `You receive ${formattedAmount}`
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  return (
    <IonList class='expense-list'>
      {expenses.map((e) => (
        <IonItem key={e.id} lines='none'>
          <IonLabel slot='start'>{e.name}</IonLabel>
          <IonLabel slot='end'>{outstandingAmountLabel(e.outstandingAmount)}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  )
}

export default ExpenseList
