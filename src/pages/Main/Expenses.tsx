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
import React from 'react'
import ExpenseList from '../../components/ExpenseList'
import useDebounce from '../../hooks/useDebounce'
import useExpenseList from '../../hooks/useExpenseList'

import './Expenses.css'

const Expenses: React.FC = () => {
  const { expenses, isLoading, refresh } = useExpenseList()
  const debouncedLoading = useDebounce(isLoading, 100)

  const onRefresh = (e: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      refresh().then(() => {
        e.detail.complete()
      })
    }, 500)
  }

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

        {debouncedLoading && <IonSpinner className='expenses-spinner' />}
        <ExpenseList expenses={expenses ?? []} />

        <IonFab vertical='bottom' horizontal='end' slot='fixed'>
          <IonFabButton routerLink='/createExpense'>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}

export default Expenses
