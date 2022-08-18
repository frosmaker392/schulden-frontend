import { fireEvent, render } from '@testing-library/react'
import PasswordInput from './PasswordInput'

describe('<PasswordInput />', () => {
  test('renders a password input by default', () => {
    const { getByTestId } = render(<PasswordInput label='Password' name='pass' />)

    const input = getByTestId('input')
    expect(input).toHaveAttribute('type', 'password')
    expect(input).toHaveAttribute('name', 'pass')
  })

  test('defaults name to "password"', () => {
    const { getByTestId } = render(<PasswordInput label='Password' />)

    const input = getByTestId('input')
    expect(input).toHaveAttribute('type', 'password')
    expect(input).toHaveAttribute('name', 'password')
  })

  test('shows password when icon is clicked, then hides password if clicked again', async () => {
    const { getByTestId } = render(<PasswordInput label='Password' name='pass' />)

    fireEvent.click(getByTestId('icon'))

    expect(getByTestId('input')).toHaveAttribute('type', 'text')

    fireEvent.click(getByTestId('icon'))

    expect(getByTestId('input')).toHaveAttribute('type', 'password')
  })
})
