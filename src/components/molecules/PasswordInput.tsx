import React, { ComponentProps, useState } from 'react'
import { IonInput, IonIcon } from '@ionic/react'
import { eyeOutline, eyeOffOutline } from 'ionicons/icons'

import './PasswordInput.css'
import InputFieldContainer from '../atoms/InputFieldContainer'

interface PasswordInputProps extends Omit<ComponentProps<typeof IonInput>, 'type'> {
  label: string
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, ...inputProps }) => {
  const [show, setShow] = useState(false)

  return (
    <InputFieldContainer label={label}>
      <IonInput type={show ? 'text' : 'password'} {...inputProps} />
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
