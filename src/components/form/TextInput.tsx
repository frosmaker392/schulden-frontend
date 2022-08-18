import { TextFieldTypes } from '@ionic/core'
import { IonItem, IonLabel, IonInput } from '@ionic/react'
import React from 'react'

interface TextInputProps {
  label: string
  type: TextFieldTypes
  name?: string
  id?: string
}

const TextInput: React.FC<TextInputProps> = ({ label, type, name, id }) => {
  return (
    <IonItem lines='full'>
      <IonLabel position='floating' data-testid='label'>
        {label}
      </IonLabel>
      <IonInput type={type} name={name ?? type} required data-testid='input' id={id} />
    </IonItem>
  )
}

export default TextInput
