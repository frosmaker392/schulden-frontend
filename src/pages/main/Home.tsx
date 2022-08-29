import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
} from '@ionic/react'
import { add } from 'ionicons/icons'

import React, { useCallback } from 'react'
import AmountLabel from '../../components/atoms/AmountLabel'
import PersonItem from '../../components/molecules/PersonItem'
import useDebounce from '../../hooks/useDebounce'
import useDebtSummary from '../../hooks/useDebtSummary'

import './Home.css'

const Home: React.FC = () => {
  const { summary, loading, refresh } = useDebtSummary()
  const debouncedLoading = useDebounce(loading, 100)

  const onRefresh = useCallback(
    (e: CustomEvent<RefresherEventDetail>) => {
      setTimeout(() => {
        refresh().then(() => {
          e.detail.complete()
        })
      }, 500)
    },
    [refresh],
  )

  const label = summary ? (summary.totalAmount > 0 ? 'You would receive' : 'You owe people') : ''

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className='home'>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonRefresher slot='fixed' onIonRefresh={onRefresh}>
          <IonRefresherContent pullingText='Pull to refresh' />
        </IonRefresher>

        <IonCard>
          {debouncedLoading ? (
            <IonSpinner class='loading-spinner' />
          ) : (
            <>
              <IonCardHeader>
                <IonCardSubtitle class='summary-subtitle'>{label}</IonCardSubtitle>
                <IonCardTitle class='summary-title'>
                  {summary ? <AmountLabel amount={summary.totalAmount} /> : '--'}
                </IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                {summary?.topDebtors.map((d) => (
                  <IonItem lines='none' key={d.person.id} class='top-debtor-entry' color='light'>
                    <PersonItem
                      slot='start'
                      lines='none'
                      person={d.person}
                      isMe={false}
                      color='light'
                    />
                    <IonLabel slot='end'>
                      <AmountLabel amount={d.amount} conditionallyColored />
                    </IonLabel>
                  </IonItem>
                ))}
              </IonCardContent>
            </>
          )}
        </IonCard>

        <IonFab vertical='bottom' horizontal='end' slot='fixed'>
          <IonFabButton routerLink='/expense/create'>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}

export default Home
