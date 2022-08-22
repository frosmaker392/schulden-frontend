import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonSearchbar,
  IonSpinner,
  IonTitle,
  IonToolbar,
  SearchbarCustomEvent,
  useIonModal,
} from '@ionic/react'
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces'
import React, { useCallback, useState } from 'react'
import useCurrentUser from '../../hooks/useCurrentUser'
import useFindPersons from '../../hooks/useFindPersons'
import { Optional, Person } from '../../typeDefs'
import PersonItem from '../PersonItem'
import InputFieldContainer from './InputFieldContainer'

type ModalRole = 'submit' | 'cancel'

interface PersonSearchModalProps {
  existingPersons?: Person[]
  onDismiss: (person: Optional<Person>, role: ModalRole) => void
}

interface PersonInputProps {
  label?: string
  placeholder?: string
  person?: Person
  existingPersons?: Person[]
  onChange: (person: Optional<Person>) => void
}

const PersonSearchModal: React.FC<PersonSearchModalProps> = ({ existingPersons, onDismiss }) => {
  const { user } = useCurrentUser()

  const [query, setQuery] = useState('')

  const { persons: suggestions, loading } = useFindPersons(query)

  const filteredSuggestions = existingPersons
    ? suggestions?.filter((s) => !existingPersons.some((p) => p.id === s.id))
    : suggestions

  const onSearchbarChange = useCallback((e: SearchbarCustomEvent) => {
    setQuery(e.detail.value ?? '')
  }, [])

  const onClickSuggestion = useCallback(
    (person: Person) => () => onDismiss(person, 'submit'),
    [onDismiss],
  )

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonButton onClick={() => onDismiss(undefined, 'cancel')}>Back</IonButton>
          </IonButtons>
          <IonTitle>Search person</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar debounce={200} onIonChange={onSearchbarChange} />
        <IonList>
          {loading ? (
            <IonItem>
              <IonSpinner />
            </IonItem>
          ) : (
            filteredSuggestions &&
            filteredSuggestions.map((s) => (
              <PersonItem
                key={s.id}
                person={s}
                isMe={s.id === user?.id}
                onClick={onClickSuggestion(s)}
              />
            ))
          )}
        </IonList>
      </IonContent>
    </IonPage>
  )
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