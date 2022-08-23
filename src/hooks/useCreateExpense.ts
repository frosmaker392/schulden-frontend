import { useContext } from 'react'
import { useAsyncCallback } from 'react-async-hook'
import { ExpenseServiceContext } from '../providers/ExpenseServiceProvider'
import { SplitResult } from '../services/ExpenseService'
import { Person } from '../typeDefs'

interface ExpenseFormUI {
  name: string
  totalAmount: number
  payer?: Person
  splitResult: SplitResult
}

const useCreateExpense = ({ name, totalAmount, payer, splitResult }: ExpenseFormUI) => {
  const expenseService = useContext(ExpenseServiceContext)

  const nameValid = name.length > 0
  const amountValid = totalAmount > 0
  const payerValid = !!payer
  const splitResultValid = splitResult.rest === 0 && splitResult.debtors.length > 0

  const createExpense = useAsyncCallback(async () => {
    if (!nameValid) throw new Error('Expense name cannot be empty!')
    if (!amountValid) throw new Error('Amount has to be greater than zero!')
    if (!payerValid) throw new Error('Please specify who paid for this expense!')
    if (!splitResultValid)
      throw new Error('Please make sure the rest is zero or have at least one debtor!')

    const result = await expenseService.create({
      name,
      totalAmount,
      payer,
      debtors: splitResult.debtors,
    })

    if ('errorMessage' in result) throw new Error(result.errorMessage)
    return result
  })

  return {
    createExpense: createExpense.execute,
    loading: createExpense.loading,
    error: createExpense.error,
  }
}

export default useCreateExpense
