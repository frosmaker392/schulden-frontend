import React, { createContext } from 'react'
import { ITokenService } from '../services/TokenService'

interface TokenServiceProviderProps {
  service: ITokenService
}

export const TokenServiceContext = createContext<ITokenService>({} as ITokenService)

const TokenServiceProvider: React.FC<TokenServiceProviderProps> = ({ service, children }) => {
  return <TokenServiceContext.Provider value={service}>{children}</TokenServiceContext.Provider>
}

export default TokenServiceProvider
