import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonBackButton,
  IonButtons,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/react'
import dayjs from 'dayjs'
import React from 'react'
import { useParams } from 'react-router'
import AmountLabel from '../../components/atoms/AmountLabel'
import PersonLabel from '../../components/atoms/PersonLabel'
import DebtList from '../../components/organisms/DebtList'
import useCurrentUser from '../../hooks/useCurrentUser'
import useExpenseDetail from '../../hooks/useExpenseDetail'

import './ExpenseDetail.css'

interface ExpenseDetailRouteParams {
  id: string
}

const ExpenseDetail: React.FC = () => {
  const { id } = useParams<ExpenseDetailRouteParams>()

  const { user } = useCurrentUser()
  const { expense, loading } = useExpenseDetail(id)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/main/expenses' />
          </IonButtons>
          <IonTitle>Expense Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='expense-detail'>
        {loading && <IonSpinner />}
        {expense && (
          <>
            <IonCard className='upper-card'>
              <IonCardHeader>
                <IonCardTitle class='name'>{expense.name}</IonCardTitle>
                <IonCardSubtitle class='from-now'>
                  {dayjs(expense.timestamp).fromNow()}
                </IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent>
                <div className='total-amount-label'>
                  <AmountLabel amount={expense.totalAmount} />
                </div>
                paid by <PersonLabel person={expense.payer} />
              </IonCardContent>
            </IonCard>

            <IonCard className='lower-card'>
              <IonCardHeader>
                <IonCardSubtitle>People involved</IonCardSubtitle>
              </IonCardHeader>

              <DebtList debts={expense.debtors} noOutstanding userId={user?.id} />
            </IonCard>
          </>
        )}
      </IonContent>
    </IonPage>
  )
}

export default ExpenseDetail
