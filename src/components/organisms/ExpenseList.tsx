import { IonItem, IonLabel, IonList } from '@ionic/react'
import React from 'react'
import dayjs from 'dayjs'

import { ExpenseListElement } from '../../typeDefs'

import './List.css'
import OutstandingNote from '../molecules/OutstandingNote'

interface ExpenseListProps {
  expenses: ExpenseListElement[]
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  return (
    <IonList class='item-list expense-list'>
      {expenses.map((e) => (
        <IonItem key={e.id} lines='full' routerLink={`/expense/details/${e.id}`} detail={false}>
          <IonLabel slot='start'>
            <h2>{e.name}</h2>
            <p>{dayjs(e.timestamp).fromNow()}</p>
          </IonLabel>
          <OutstandingNote slot='end' className='end-label' amount={e.outstandingAmount} />
        </IonItem>
      ))}
    </IonList>
  )
}

export default ExpenseList
