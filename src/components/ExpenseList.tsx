import { IonItem, IonLabel, IonList, IonNote } from '@ionic/react'
import React from 'react'
import dayjs from 'dayjs'

import './ExpenseList.css'

export interface ExpenseListElement {
  id: string
  name: string
  timestamp: string
  outstandingAmount: number
}

interface OutstandingLabelProps {
  amount: number
}

interface ExpenseListProps {
  expenses: ExpenseListElement[]
}

export const OutstandingLabel: React.FC<OutstandingLabelProps> = ({ amount }) => {
  const formattedAmount = Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(Math.abs(amount))

  const outstandingLabelOptions = {
    negative: ['You owe ', formattedAmount, 'negative'],
    zero: ['', '--', ''],
    positive: ['You receive ', formattedAmount, 'positive'],
  }

  const labelChoice =
    outstandingLabelOptions[amount < 0 ? 'negative' : amount === 0 ? 'zero' : 'positive']

  return (
    <>
      <p data-testid='decorator'>{labelChoice[0]}</p>
      <p data-testid='amount' className={labelChoice[2]}>
        {labelChoice[1]}
      </p>
    </>
  )
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  return (
    <IonList class='expense-list'>
      {expenses.map((e) => (
        <IonItem key={e.id} lines='full'>
          <IonLabel slot='start'>
            <h2>{e.name}</h2>
            <p>{dayjs(e.timestamp).fromNow()}</p>
          </IonLabel>
          <IonNote slot='end' className='outstanding-label'>
            <OutstandingLabel amount={e.outstandingAmount} />
          </IonNote>
        </IonItem>
      ))}
    </IonList>
  )
}

export default ExpenseList
