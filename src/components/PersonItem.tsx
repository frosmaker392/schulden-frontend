import { IonChip, IonItem, IonLabel } from '@ionic/react'
import React from 'react'
import { OfflinePerson, User } from '../graphql/generated'

interface PersonItemProps {
  person: User | OfflinePerson
  isMe: boolean
}

const PersonItem: React.FC<PersonItemProps> = ({ person, isMe }) => {
  const name = 'email' in person ? `@${person.name}` : person.name

  return (
    <IonItem>
      <IonLabel>{name}</IonLabel>
      {isMe && (
        <IonChip color='primary' slot='end'>
          Me
        </IonChip>
      )}
    </IonItem>
  )
}

export default PersonItem
