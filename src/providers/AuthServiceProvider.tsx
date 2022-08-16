import React, { createContext } from 'react'
import { IAuthService } from '../services/AuthService'

interface AuthServiceProviderProps {
  service: IAuthService
}

export const AuthServiceContext = createContext<IAuthService>({} as IAuthService)

const AuthServiceProvider: React.FC<AuthServiceProviderProps> = ({ service, children }) => {
  return <AuthServiceContext.Provider value={service}>{children}</AuthServiceContext.Provider>
}

export default AuthServiceProvider
