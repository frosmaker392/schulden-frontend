import { createContext } from 'react'
import { IDebtService } from '../services/DebtService'

interface DebtServiceProviderProps {
  service: IDebtService
}

export const DebtServiceContext = createContext<IDebtService>({} as IDebtService)

const DebtServiceProvider: React.FC<DebtServiceProviderProps> = ({ service, children }) => {
  return <DebtServiceContext.Provider value={service}>{children}</DebtServiceContext.Provider>
}

export default DebtServiceProvider
