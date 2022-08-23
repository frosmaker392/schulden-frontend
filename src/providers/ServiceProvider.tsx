import React from 'react'
import { IAuthService } from '../services/AuthService'
import { IDebtService } from '../services/DebtService'
import { IExpenseService } from '../services/ExpenseService'
import { ITokenService } from '../services/TokenService'
import AuthServiceProvider from './AuthServiceProvider'
import DebtServiceProvider from './DebtServiceProvider'
import ExpenseServiceProvider from './ExpenseServiceProvider'
import TokenServiceProvider from './TokenServiceProvider'

export interface Services {
  auth: IAuthService
  token: ITokenService
  expense: IExpenseService
  debt: IDebtService
}

interface ServiceProviderProps {
  services: Services
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({ services, children }) => {
  return (
    <AuthServiceProvider service={services.auth}>
      <TokenServiceProvider service={services.token}>
        <ExpenseServiceProvider service={services.expense}>
          <DebtServiceProvider service={services.debt}>{children}</DebtServiceProvider>
        </ExpenseServiceProvider>
      </TokenServiceProvider>
    </AuthServiceProvider>
  )
}
