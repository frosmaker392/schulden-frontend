import { IonNote } from '@ionic/react'
import React, { ComponentProps } from 'react'
import AmountLabel from '../atoms/AmountLabel'

interface OutstandingNoteProps extends ComponentProps<typeof IonNote> {
  amount: number
}

const OutstandingNote: React.FC<OutstandingNoteProps> = ({ amount, ...noteProps }) => {
  const outstandingLabelPrefix = amount < 0 ? 'You owe ' : amount > 0 ? 'You receive ' : ''

  return (
    <IonNote {...noteProps}>
      <p>{outstandingLabelPrefix}</p>
      <AmountLabel amount={amount} conditionallyColored />
    </IonNote>
  )
}

export default OutstandingNote
