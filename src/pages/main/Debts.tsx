import { IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import DebtList from '../../components/organisms/DebtList'
import useDebtList from '../../hooks/useDebtList'

const Debts: React.FC = () => {
  const { debts, loading } = useDebtList()

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

        {loading && <IonSpinner />}
        {debts && <DebtList debts={debts} />}
      </IonContent>
    </IonPage>
  )
}

export default Debts
