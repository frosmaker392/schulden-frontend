import {
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonLabel,
  IonRow,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react'
import React from 'react'
import { OfflinePerson, User } from '../../graphql/generated'
import PersonItem from '../PersonItem'

import './DebtorsForm.css'

const dummyPersons: (User | OfflinePerson)[] = [
  {
    id: 'test-id-1',
    name: 'user1',
    email: 'user1@test.com',
  },
  {
    id: 'test-id-2',
    name: 'user2',
    email: 'user2@test.com',
  },
  {
    id: 'test-id-3',
    name: 'person1',
  },
]

const DebtorsForm: React.FC = () => {
  return (
    <div className='debtors-form'>
      <p className='decor-label'>Expense should be split</p>

      <IonSegment value='equal'>
        <IonSegmentButton value='equal'>
          <IonLabel>equally</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value='unequal'>
          <IonLabel>unequally</IonLabel>
        </IonSegmentButton>
      </IonSegment>

      <p className='decor-label'>between</p>

      <IonGrid>
        {dummyPersons.map((p) => (
          <IonRow key={p.id}>
            <IonCol size='12'>
              <PersonItem person={p} isMe={p.id === 'test-id-1'} />
            </IonCol>
          </IonRow>
        ))}

        <IonRow>
          <IonCol size='10'>
            <IonInput placeholder='Enter name here' />
          </IonCol>
          <IonCol size='2'>
            <IonButton>Add</IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  )
}

export default DebtorsForm
