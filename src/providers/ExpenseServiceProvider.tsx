import React, { createContext } from 'react'
import { IExpenseService } from '../services/ExpenseService'

interface ExpenseServiceProviderProps {
  service: IExpenseService
}

export const ExpenseServiceContext = createContext<IExpenseService>({} as IExpenseService)

const ExpenseServiceProvider: React.FC<ExpenseServiceProviderProps> = ({ service, children }) => {
  return <ExpenseServiceContext.Provider value={service}>{children}</ExpenseServiceContext.Provider>
}

export default ExpenseServiceProvider
