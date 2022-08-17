import React, { useState } from 'react'
import { IonItem, IonLabel, IonInput, IonIcon } from '@ionic/react'
import { eyeOutline, eyeOffOutline } from 'ionicons/icons'

import './PasswordInput.css'

const PasswordInput: React.FC = () => {
  const [show, setShow] = useState(false)

  return (
    <IonItem lines='full'>
      <IonLabel position='floating'>Password</IonLabel>
      <IonInput type={show ? 'text' : 'password'} name='password' required data-testid='input' />
      <IonIcon
        slot='end'
        icon={show ? eyeOffOutline : eyeOutline}
        className='show-password-icon'
        onClick={() => setShow((v) => !v)}
        data-testid='icon'
      />
    </IonItem>
  )
}

export default PasswordInput
