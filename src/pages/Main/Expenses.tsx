import { IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import ExpenseList from '../../components/ExpenseList'
import useExpenseList from '../../hooks/useExpenseList'

const Expenses: React.FC = () => {
  const { expenses, loading } = useExpenseList()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Expenses</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Expenses</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonLoading isOpen={loading} />

        <ExpenseList expenses={expenses ?? []} />
      </IonContent>
    </IonPage>
  )
}

export default Expenses
