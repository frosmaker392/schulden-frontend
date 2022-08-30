import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
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
import ExpenseList from '../../components/organisms/ExpenseList'
import useDebounce from '../../hooks/useDebounce'
import useExpenseList from '../../hooks/useExpenseList'

const Expenses: React.FC = () => {
  const { expenses, loading, refresh } = useExpenseList()
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
          <IonTitle>Expenses</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Expenses</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonRefresher slot='fixed' onIonRefresh={onRefresh}>
          <IonRefresherContent pullingText='Pull to refresh' />
        </IonRefresher>

        {debouncedLoading && <IonSpinner className='spinner' />}
        <ExpenseList expenses={expenses ?? []} />

        <IonFab vertical='bottom' horizontal='end' slot='fixed'>
          <IonFabButton routerLink='/expense/create'>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}

export default Expenses
