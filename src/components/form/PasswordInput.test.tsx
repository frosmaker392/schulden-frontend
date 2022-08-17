import { fireEvent, render } from '@testing-library/react'
import PasswordInput from './PasswordInput'

describe('<PasswordInput />', () => {
  test('renders a password input by default', () => {
    const { getByTestId } = render(<PasswordInput />)

    expect(getByTestId('input')).toHaveAttribute('type', 'password')
  })

  test('shows password when icon is clicked, then hides password if clicked again', async () => {
    const { getByTestId } = render(<PasswordInput />)

    fireEvent.click(getByTestId('icon'))

    expect(getByTestId('input')).toHaveAttribute('type', 'text')

    fireEvent.click(getByTestId('icon'))

    expect(getByTestId('input')).toHaveAttribute('type', 'password')
  })
})
