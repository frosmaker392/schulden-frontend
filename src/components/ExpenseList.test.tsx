import { render } from '@testing-library/react'
import ExpenseList, { ExpenseListElement, OutstandingLabel } from './ExpenseList'

const expenses: ExpenseListElement[] = [
  {
    id: 'expense-1',
    name: 'Expense 1',
    timestamp: new Date(2022, 7, 10, 19, 34).toISOString(),
    outstandingAmount: -50,
  },
  {
    id: 'expense-2',
    name: 'Expense 2',
    timestamp: new Date(2022, 6, 29, 10, 6).toISOString(),
    outstandingAmount: 62,
  },
  {
    id: 'expense-3',
    name: 'Expense 3',
    timestamp: new Date(2022, 0, 4, 0, 34).toISOString(),
    outstandingAmount: 0,
  },
]

describe('<OutstandingLabel />', () => {
  test('renders "--" for a zero amount', () => {
    const { getByTestId } = render(<OutstandingLabel amount={0} />)

    expect(getByTestId('amount')).toHaveTextContent('--')
  })

  test('renders "You owe {amount}" for a negative amount', () => {
    const { getByTestId } = render(<OutstandingLabel amount={-5} />)

    expect(getByTestId('decorator')).toHaveTextContent(/You owe/)
    expect(getByTestId('amount')).toHaveAttribute('class', 'negative')
  })

  test('renders "You receive {amount}" for a positive amount', () => {
    const { getByTestId } = render(<OutstandingLabel amount={5} />)

    expect(getByTestId('decorator')).toHaveTextContent(/You receive/)
    expect(getByTestId('amount')).toHaveAttribute('class', 'positive')
  })
})

describe('<ExpenseList />', () => {
  test('renders a list of expenses', () => {
    const { getAllByRole } = render(<ExpenseList expenses={expenses} />)

    const nameHeadings = getAllByRole('heading', { level: 2 })
    expect(nameHeadings).toHaveLength(3)
    for (let i = 0; i < expenses.length; i++) {
      expect(nameHeadings[i].textContent).toBe(expenses[i].name)
    }
  })
})
