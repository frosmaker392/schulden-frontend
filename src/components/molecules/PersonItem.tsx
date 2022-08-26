import { IonChip, IonItem } from '@ionic/react'
import React, { ComponentProps } from 'react'
import { Person } from '../../typeDefs'

interface PersonItemProps extends ComponentProps<typeof IonItem> {
  person: Person
  isMe: boolean
}

const PersonItem: React.FC<PersonItemProps> = ({ person, isMe, ...itemProps }) => {
  const name = 'email' in person ? `@${person.name}` : person.name

  return (
    <IonItem {...itemProps}>
      {name}
      {isMe && <IonChip color='primary'>You</IonChip>}
    </IonItem>
  )
}

export default PersonItem
