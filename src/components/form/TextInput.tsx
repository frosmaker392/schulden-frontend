import { TextFieldTypes } from '@ionic/core'
import { IonInput, InputCustomEvent } from '@ionic/react'
import React from 'react'
import InputFieldContainer from './InputFieldContainer'

interface TextInputProps {
  label: string
  type: TextFieldTypes
  name?: string
  id?: string
  onIonChange?: (e: InputCustomEvent) => void
}

const TextInput: React.FC<TextInputProps> = ({ label, type, name, id, onIonChange }) => {
  return (
    <InputFieldContainer label={label}>
      <IonInput
        type={type}
        name={name ?? type}
        required
        data-testid='input'
        id={id}
        onIonChange={onIonChange}
      />
    </InputFieldContainer>
  )
}

export default TextInput
