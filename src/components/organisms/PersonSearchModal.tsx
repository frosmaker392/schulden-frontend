import {
  SearchbarCustomEvent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonSpinner,
} from '@ionic/react'
import React, { useCallback, useState } from 'react'
import useCurrentUser from '../../hooks/useCurrentUser'
import useFindPersons from '../../hooks/useFindPersons'
import { Person, Optional } from '../../typeDefs'
import PersonItem from '../molecules/PersonItem'

type ModalRole = 'submit' | 'cancel'

interface PersonSearchModalProps {
  existingPersons?: Person[]
  onDismiss: (person: Optional<Person>, role: ModalRole) => void
}

const PersonSearchModal: React.FC<PersonSearchModalProps> = ({ existingPersons, onDismiss }) => {
  const { user } = useCurrentUser()
  const [query, setQuery] = useState('')

  const { persons, loading, createPerson } = useFindPersons(query)

  let suggestions = persons ?? []
  if (user && query.length === 0) suggestions = [user, ...suggestions]

  const filteredSuggestions = existingPersons
    ? suggestions.filter((s) => !existingPersons.some((p) => p.id === s.id))
    : suggestions

  const onSearchbarChange = useCallback((e: SearchbarCustomEvent) => {
    setQuery(e.detail.value ?? '')
  }, [])

  const onClickSuggestion = useCallback(
    (person: Person) => () => onDismiss(person, 'submit'),
    [onDismiss],
  )

  const onClickCreate = useCallback(() => {
    createPerson(query)
  }, [createPerson, query])

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

        {!loading && query.length > 0 && (
          <IonButton onClick={onClickCreate}>Create person with name "{query}"</IonButton>
        )}
      </IonContent>
    </IonPage>
  )
}

export default PersonSearchModal
