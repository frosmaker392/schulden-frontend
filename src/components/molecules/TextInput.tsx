import { IonInput } from '@ionic/react'
import React, { ComponentProps } from 'react'
import InputFieldContainer from '../atoms/InputFieldContainer'

interface TextInputProps extends ComponentProps<typeof IonInput> {
  label: string
}

const TextInput: React.FC<TextInputProps> = ({ label, ...restOfProps }) => {
  return (
    <InputFieldContainer label={label}>
      <IonInput {...restOfProps} />
    </InputFieldContainer>
  )
}

export default TextInput
