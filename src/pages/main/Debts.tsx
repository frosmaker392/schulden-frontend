import {
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
} from '@ionic/react'
import React, { useCallback } from 'react'
import DebtList from '../../components/organisms/DebtList'
import useDebounce from '../../hooks/useDebounce'
import useDebtList from '../../hooks/useDebtList'

const Debts: React.FC = () => {
  const { debts, loading, refresh } = useDebtList()
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Debts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Debts</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonRefresher slot='fixed' onIonRefresh={onRefresh}>
          <IonRefresherContent pullingText='Pull to refresh' />
        </IonRefresher>

        {debouncedLoading && <IonSpinner class='spinner' />}
        <DebtList debts={debts ?? []} link />
      </IonContent>
    </IonPage>
  )
}

export default Debts
