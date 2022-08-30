import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
  useIonAlert,
  useIonRouter,
} from '@ionic/react'
import { add } from 'ionicons/icons'

import React, { useCallback, useContext } from 'react'
import AmountLabel from '../../components/atoms/AmountLabel'
import DebtList from '../../components/organisms/DebtList'
import useDebounce from '../../hooks/useDebounce'
import useDebtSummary from '../../hooks/useDebtSummary'
import { CredentialsCacheContext } from '../../utils/CredentialsCache'

import './Home.css'

const Home: React.FC = () => {
  const [showLogoutConfirmation] = useIonAlert()
  const r = useIonRouter()

  const credsCache = useContext(CredentialsCacheContext)
  const { summary, loading, refresh } = useDebtSummary()
  const debouncedLoading = useDebounce(loading, 100)

  const onRefresh = useCallback(
    (e: CustomEvent<RefresherEventDetail>) => {
      setTimeout(async () => {
        await refresh()
        e.detail.complete()
      }, 500)
    },
    [refresh],
  )

  const logout = useCallback(() => {
    credsCache.clearToken()
    r.push('/login', 'none')
  }, [credsCache, r])

  const onClickLogout = useCallback(() => {
    showLogoutConfirmation({
      header: 'Log out',
      message: 'Are you sure you want to log out?',
      buttons: ['No', { text: 'Yes', handler: logout }],
    })
  }, [logout, showLogoutConfirmation])

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

        {debouncedLoading && <IonSpinner class='spinner' />}
        {summary && (
          <>
            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle class='summary-subtitle'>{label}</IonCardSubtitle>
                <IonCardTitle class='summary-title'>
                  {summary ? <AmountLabel amount={summary.totalAmount} /> : '--'}
                </IonCardTitle>
              </IonCardHeader>
            </IonCard>

            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>Top debtors</IonCardSubtitle>
              </IonCardHeader>

              <DebtList debts={summary.topDebtors} />

              <IonItem
                class='show-all-link'
                routerLink='/main/debts'
                routerDirection='none'
                detail
                lines='none'
              >
                Show all
              </IonItem>
            </IonCard>
          </>
        )}

        <IonButton class='logout-button' fill='clear' color='danger' onClick={onClickLogout}>
          Logout
        </IonButton>

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
