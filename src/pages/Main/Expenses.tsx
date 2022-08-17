import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import ExpenseList, { ExpenseListElement } from '../../components/ExpenseList'

const mockExpenses: ExpenseListElement[] = [
  {
    id: 'expense-1',
    name: 'Expense 1',
    timestamp: new Date(2022, 7, 10, 19, 34).toISOString(),
    outstandingAmount: -50,
  },
  {
    id: 'expense-2',
    name: 'Expense 2',
    timestamp: new Date(2022, 6, 29, 10, 6).toISOString(),
    outstandingAmount: 62,
  },
  {
    id: 'expense-3',
    name: 'Expense 3',
    timestamp: new Date(2022, 0, 4, 0, 34).toISOString(),
    outstandingAmount: 0,
  },
]

const Expenses: React.FC = () => {
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

        <ExpenseList expenses={mockExpenses} />
      </IonContent>
    </IonPage>
  )
}

export default Expenses
