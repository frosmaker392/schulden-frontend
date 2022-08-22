import {
  IonButton,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react'
import { add, trash } from 'ionicons/icons'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Debtor } from '../../graphql/generated'
import useCurrentUser from '../../hooks/useCurrentUser'
import { ExpenseServiceContext } from '../../providers/ExpenseServiceProvider'
import { SplitMethod, SplitResult } from '../../services/ExpenseService'
import { Optional, Person } from '../../typeDefs'
import { toFormattedCurrency } from '../../utils'
import CurrencyInput from '../form/CurrencyInput'
import PersonInput from '../form/PersonInput'
import PersonItem from '../PersonItem'

import './DebtorsForm.css'

interface DebtorsFormProps {
  totalAmount: number
  onChange: (debtorsWithAmounts: Debtor[]) => void
}

const DebtorsForm: React.FC<DebtorsFormProps> = ({ totalAmount, onChange }) => {
  const { user } = useCurrentUser()
  const expenseService = useContext(ExpenseServiceContext)

  const [splitResult, setSplitResult] = useState<SplitResult>({
    debtors: [],
    rest: 0,
  })
  const [debtors, setDebtors] = useState<Person[]>([])
  const [inputtedAmounts, setInputtedAmounts] = useState<Optional<number>[]>([])
  const [equalAmounts, setEqualAmounts] = useState<number[]>([])

  const [personToAdd, setPersonToAdd] = useState<Optional<Person>>()
  const [splitMethod, setSplitMethod] = useState<SplitMethod>('equal')

  useEffect(() => {
    const newSplitResult = expenseService.calculateSplit(
      totalAmount,
      splitMethod,
      debtors,
      inputtedAmounts,
    )
    setSplitResult(newSplitResult)
    onChange(newSplitResult.debtors)
  }, [debtors, inputtedAmounts, expenseService, totalAmount, splitMethod, onChange])

  useEffect(() => {
    if (splitMethod === 'equal') setEqualAmounts(splitResult.debtors.map(({ amount }) => amount))
  }, [splitResult, splitMethod])

  const updateAmount = useCallback((amount: number, index: number) => {
    setInputtedAmounts((amts) => {
      const newAmts = [...amts]
      newAmts[index] = amount
      return newAmts
    })
  }, [])

  const addDebtor = useCallback(() => {
    if (personToAdd) {
      setDebtors((ds) => [...ds, personToAdd])
      setPersonToAdd(undefined)
    }
  }, [personToAdd])

  return (
    <div className='debtors-form'>
      <p className='decor-label'>Expense should be split</p>

      <IonSegment
        value={splitMethod}
        onIonChange={(e) => setSplitMethod(e.detail.value as SplitMethod)}
      >
        <IonSegmentButton value='equal'>
          <IonLabel>equally</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value='unequal'>
          <IonLabel>unequally</IonLabel>
        </IonSegmentButton>
      </IonSegment>

      <p className='decor-label'>between</p>

      <IonList>
        {debtors.map((d, i) => (
          <IonItemSliding key={d.id}>
            <IonItem class='person-item-container'>
              <PersonItem
                person={d}
                isMe={d.id === user?.id}
                className='person-item'
                lines='none'
              />
              {splitMethod === 'equal' ? (
                <IonLabel className='amount-text'>{toFormattedCurrency(equalAmounts[i])}</IonLabel>
              ) : (
                <CurrencyInput className='amount-text' onChange={(v) => updateAmount(v, i)} />
              )}
            </IonItem>

            <IonItemOptions>
              <IonItemOption color='danger'>
                <IonIcon slot='icon-only' icon={trash} />
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        ))}

        <IonItem className='person-field'>
          <PersonInput
            person={personToAdd}
            placeholder='Add debtor...'
            existingPersons={debtors}
            onChange={(p) => p && setPersonToAdd(p)}
          />
          <IonButton shape='round' onClick={addDebtor}>
            <IonIcon icon={add} />
          </IonButton>
        </IonItem>
      </IonList>
    </div>
  )
}

export default DebtorsForm
