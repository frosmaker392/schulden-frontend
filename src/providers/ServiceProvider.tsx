import React from 'react'
import { IAuthService } from '../services/AuthService'
import { IExpenseService } from '../services/ExpenseService'
import { ITokenService } from '../services/TokenService'
import AuthServiceProvider from './AuthServiceProvider'
import ExpenseServiceProvider from './ExpenseServiceProvider'
import TokenServiceProvider from './TokenServiceProvider'

export interface Services {
  auth: IAuthService
  token: ITokenService
  expense: IExpenseService
}

interface ServiceProviderProps {
  services: Services
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({ services, children }) => {
  return (
    <AuthServiceProvider service={services.auth}>
      <TokenServiceProvider service={services.token}>
        <ExpenseServiceProvider service={services.expense}>{children}</ExpenseServiceProvider>
      </TokenServiceProvider>
    </AuthServiceProvider>
  )
}
