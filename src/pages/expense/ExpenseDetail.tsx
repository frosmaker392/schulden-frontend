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
  IonButton,
  IonIcon,
  useIonAlert,
  useIonToast,
  useIonRouter,
} from '@ionic/react'
import dayjs from 'dayjs'
import { trash } from 'ionicons/icons'
import React, { useCallback } from 'react'
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
  const [showDeleteConfirmation] = useIonAlert()
  const [showToast] = useIonToast()
  const r = useIonRouter()

  const { user } = useCurrentUser()
  const { expense, loading, deleteExpense } = useExpenseDetail(id)

  const onDeleteConfirm = useCallback(() => {
    deleteExpense().then(({ data }) => {
      showToast(`Successfully deleted expense "${data?.deleteExpense.name}"`, 2000)
      r.push('/main/expenses', 'back')
    })
  }, [deleteExpense, r, showToast])

  const onClickDelete = useCallback(() => {
    showDeleteConfirmation({
      header: 'Delete Expense',
      message: 'Are you sure you want to delete this expense?',
      buttons: ['No', { text: 'Yes', handler: onDeleteConfirm }],
    })
  }, [onDeleteConfirm, showDeleteConfirmation])

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

            <IonButton class='delete-button' color='danger' fill='outline' onClick={onClickDelete}>
              <IonIcon slot='start' icon={trash} />
              Delete
            </IonButton>
          </>
        )}
      </IonContent>
    </IonPage>
  )
}

export default ExpenseDetail
