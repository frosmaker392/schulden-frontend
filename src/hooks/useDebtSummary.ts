import { useContext, useState } from 'react'
import { useAsync, useAsyncCallback } from 'react-async-hook'
import { DebtSummary } from '../graphql/generated'
import { DebtServiceContext } from '../providers/DebtServiceProvider'

const useDebtSummary = () => {
  const debtService = useContext(DebtServiceContext)

  const [summary, setSummary] = useState<DebtSummary>()

  const fetchAndSet = useAsyncCallback(async () => {
    const data = await debtService.getDebtSummary()
    if ('errorMessage' in data) throw new Error(data.errorMessage)
    setSummary(data)
  })

  useAsync(fetchAndSet.execute, [])

  return {
    summary,
    isLoading: fetchAndSet.loading,
    error: fetchAndSet.error,
    refresh: fetchAndSet.execute,
  }
}

export default useDebtSummary
