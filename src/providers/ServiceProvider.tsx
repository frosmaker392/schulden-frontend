import React, { createContext } from 'react'
import AuthService from '../services/AuthService'

export interface Services {
  auth: AuthService
}

interface ServiceProviderProps {
  services: Services
}

export const ServiceContext = createContext<Services>({} as Services)

export const ServiceProvider: React.FC<ServiceProviderProps> = ({ services, children }) => {
  return <ServiceContext.Provider value={services}>{children}</ServiceContext.Provider>
}
