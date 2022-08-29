import { IonItem, IonLabel, IonList, IonNote } from '@ionic/react'
import React, { ComponentProps } from 'react'
import dayjs from 'dayjs'

import { ExpenseListElement } from '../../typeDefs'
import AmountLabel from '../atoms/AmountLabel'

import './ExpenseList.css'

interface OutstandingNoteProps extends ComponentProps<typeof IonNote> {
  amount: number
}

interface ExpenseListProps {
  expenses: ExpenseListElement[]
}

const OutstandingNote: React.FC<OutstandingNoteProps> = ({ amount, ...noteProps }) => {
  const outstandingLabelPrefix = amount < 0 ? 'You owe ' : amount > 0 ? 'You receive ' : ''

  return (
    <IonNote {...noteProps}>
      <p>{outstandingLabelPrefix}</p>
      <AmountLabel amount={amount} conditionallyColored />
    </IonNote>
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
          <OutstandingNote slot='end' className='outstanding-label' amount={e.outstandingAmount} />
        </IonItem>
      ))}
    </IonList>
  )
}

export default ExpenseList
