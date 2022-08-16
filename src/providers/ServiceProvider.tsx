import React from 'react'
import { IAuthService } from '../services/AuthService'
import { ITokenService } from '../services/TokenService'
import AuthServiceProvider from './AuthServiceProvider'
import TokenServiceProvider from './TokenServiceProvider'

export interface Services {
  auth: IAuthService
  token: ITokenService
}

interface ServiceProviderProps {
  services: Services
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({ services, children }) => {
  return (
    <AuthServiceProvider service={services.auth}>
      <TokenServiceProvider service={services.token}>{children}</TokenServiceProvider>
    </AuthServiceProvider>
  )
}
