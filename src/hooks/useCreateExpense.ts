import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { useAsyncCallback } from 'react-async-hook'
import { CreateExpenseDocument, DebtorInputType } from '../graphql/generated'
import { Person, SplitResult } from '../typeDefs'

interface ExpenseFormUI {
  name: string
  totalAmount: number
  payer?: Person
  splitResult: SplitResult
}

const useCreateExpense = () => {
  const [validationError, setValidationError] = useState('')
  const [createExpenseMutation, { data, loading, error }] = useMutation(CreateExpenseDocument)

  const createExpense = useAsyncCallback(async (form: ExpenseFormUI) => {
    const nameValid = form.name.length > 0
    const amountValid = form.totalAmount > 0
    const payerValid = !!form.payer
    const splitResultValid = form.splitResult.rest === 0 && form.splitResult.debtors.length > 0

    if (!nameValid) {
      setValidationError('Expense name cannot be empty!')
      return
    }
    if (!amountValid) {
      setValidationError('Amount has to be greater than zero!')
      return
    }
    if (!payerValid) {
      setValidationError('Please specify who paid for this expense!')
      return
    }
    if (!splitResultValid) {
      setValidationError('Please make sure the rest is zero or have at least one debtor!')
      return
    }

    await createExpenseMutation({
      variables: {
        name: form.name,
        totalAmount: form.totalAmount,
        payerId: form.payer!.id,
        debtors: form.splitResult.debtors.map(
          (d): DebtorInputType => ({
            personId: d.person.id,
            amount: d.amount,
          }),
        ),
      },
    })
  })

  return {
    createExpense: createExpense.execute,
    data,
    loading,
    error: validationError || error?.message,
  }
}

export default useCreateExpense
