import { IonItem, IonLabel } from '@ionic/react'
import React from 'react'

interface InputFieldContainerProps {
  label: string
}

const InputFieldContainer: React.FC<InputFieldContainerProps> = ({ label, children }) => {
  return (
    <IonItem lines='full'>
      <IonLabel position='floating'>{label}</IonLabel>
      {children}
    </IonItem>
  )
}

export default InputFieldContainer
