import React, { useState } from 'react'
import { IonInput, IonIcon } from '@ionic/react'
import { eyeOutline, eyeOffOutline } from 'ionicons/icons'

import './PasswordInput.css'
import InputFieldContainer from './InputFieldContainer'

interface PasswordInputProps {
  label: string
  name?: string
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, name }) => {
  const [show, setShow] = useState(false)

  return (
    <InputFieldContainer label={label}>
      <IonInput
        type={show ? 'text' : 'password'}
        name={name ?? 'password'}
        required
        data-testid='input'
      />
      <IonIcon
        slot='end'
        icon={show ? eyeOffOutline : eyeOutline}
        className='show-password-icon'
        onClick={() => setShow((v) => !v)}
        data-testid='icon'
      />
    </InputFieldContainer>
  )
}

export default PasswordInput
