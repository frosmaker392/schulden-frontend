import { IonInput, useIonModal } from '@ionic/react'
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces'
import React from 'react'
import { Optional, Person } from '../../typeDefs'
import InputFieldContainer from '../atoms/InputFieldContainer'
import PersonSearchModal from '../organisms/PersonSearchModal'

interface PersonInputProps {
  label?: string
  placeholder?: string
  person?: Person
  existingPersons?: Person[]
  onChange: (person: Optional<Person>) => void
}

const PersonInput: React.FC<PersonInputProps> = ({
  label,
  placeholder,
  person,
  existingPersons,
  onChange,
}) => {
  const [present, dismiss] = useIonModal(PersonSearchModal, {
    existingPersons,
    onDismiss: (data: Person, role?: string) => dismiss(data, role),
  })

  const onClickInput = () =>
    present({
      onWillDismiss(e: CustomEvent<OverlayEventDetail>) {
        if (e.detail.role === 'submit') onChange(e.detail.data)
      },
    })

  const input = <IonInput value={person?.name} placeholder={placeholder} onClick={onClickInput} />

  return label ? <InputFieldContainer label={label}>{input}</InputFieldContainer> : input
}

export default PersonInput
