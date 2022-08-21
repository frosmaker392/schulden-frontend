import { TextFieldTypes } from '@ionic/core'
import { IonItem, IonLabel, IonInput, InputCustomEvent } from '@ionic/react'
import React from 'react'

interface TextInputProps {
  label: string
  type: TextFieldTypes
  name?: string
  id?: string
  onIonChange?: (e: InputCustomEvent) => void
}

const TextInput: React.FC<TextInputProps> = ({ label, type, name, id, onIonChange }) => {
  return (
    <IonItem lines='full'>
      <IonLabel position='floating' data-testid='label'>
        {label}
      </IonLabel>
      <IonInput
        type={type}
        name={name ?? type}
        required
        data-testid='input'
        id={id}
        onIonChange={onIonChange}
      />
    </IonItem>
  )
}

export default TextInput
