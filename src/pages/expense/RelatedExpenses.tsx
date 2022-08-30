import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import React from 'react'
import { useParams } from 'react-router'
import PersonLabel from '../../components/atoms/PersonLabel'
import ExpenseList from '../../components/organisms/ExpenseList'
import useDebounce from '../../hooks/useDebounce'
import useGetPerson from '../../hooks/useGetPerson'
import useRelatedExpenseList from '../../hooks/useRelatedExpenseList'

import './RelatedExpenses.css'

interface RelatedExpensesRouteParams {
  personId: string
}

const RelatedExpenses: React.FC = () => {
  const { personId } = useParams<RelatedExpensesRouteParams>()

  const { person, loading: personLoading } = useGetPerson(personId)
  const { expenses, loading: expenseLoading } = useRelatedExpenseList(personId)

  const debouncedLoading = useDebounce(personLoading || expenseLoading, 100)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/main/expenses' />
          </IonButtons>
          <IonTitle>Related Expenses</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class='related-expenses'>
        {debouncedLoading && <IonSpinner class='spinner' />}
        {person && (
          <p className='decor-text'>
            between you and <PersonLabel person={person} />
          </p>
        )}
        <ExpenseList expenses={expenses} />
      </IonContent>
    </IonPage>
  )
}

export default RelatedExpenses
