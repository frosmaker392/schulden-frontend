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
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { add } from 'ionicons/icons'

import React, { useContext } from 'react'
import { useAsync } from 'react-async-hook'
import AmountLabel from '../../components/atoms/AmountLabel'
import PersonItem from '../../components/molecules/PersonItem'
import useDebounce from '../../hooks/useDebounce'
import { DebtServiceContext } from '../../providers/DebtServiceProvider'

import './Home.css'

const Home: React.FC = () => {
  const debtService = useContext(DebtServiceContext)

  const { result, loading } = useAsync(async () => {
    const data = await debtService.getDebtSummary()

    if ('errorMessage' in data) throw new Error(data.errorMessage)
    return data
  }, [debtService])
  const debouncedLoading = useDebounce(loading, 100)

  const label = result ? (result.totalAmount > 0 ? 'You would receive' : 'You owe people') : ''

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

        <IonCard>
          {debouncedLoading ? (
            <IonSpinner class='loading-spinner' />
          ) : (
            <>
              <IonCardHeader>
                <IonCardSubtitle class='summary-subtitle'>{label}</IonCardSubtitle>
                <IonCardTitle class='summary-title'>
                  {result ? <AmountLabel amount={result.totalAmount} /> : '--'}
                </IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                {result?.topDebtors.map((d) => (
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
