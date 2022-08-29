import { IonItem, IonLabel, IonList, IonNote } from '@ionic/react'
import React from 'react'
import { Debtor } from '../../graphql/generated'
import AmountLabel from '../atoms/AmountLabel'
import PersonLabel from '../atoms/PersonLabel'
import OutstandingNote from '../molecules/OutstandingNote'
import PersonItem from '../molecules/PersonItem'

import './List.css'

interface DebtListProps {
  debts: Debtor[]
  noOutstanding?: boolean
  userId?: string
}

const DebtList: React.FC<DebtListProps> = ({ debts, noOutstanding, userId }) => {
  return (
    <IonList class='item-list debt-list'>
      {debts.map((d) => (
        <IonItem key={d.person.id} lines='full'>
          <IonLabel slot='start'>
            <PersonItem
              class='ion-no-padding person-item'
              person={d.person}
              isMe={userId === d.person.id}
              lines='none'
            />
          </IonLabel>

          {noOutstanding ? (
            <IonNote slot='end' class='end-label'>
              <AmountLabel amount={d.amount} />
            </IonNote>
          ) : (
            <OutstandingNote slot='end' className='end-label' amount={d.amount} />
          )}
        </IonItem>
      ))}
    </IonList>
  )
}

export default DebtList
