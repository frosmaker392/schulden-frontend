import { render } from '@testing-library/react'
import TextInput from './TextInput'

describe('<TextInput />', () => {
  test('renders element containing input element with correct label, type and name', () => {
    const { getByTestId } = render(<TextInput label='TestLabel' type='text' name='input-name' />)

    const label = getByTestId('label')
    expect(label).toHaveTextContent('TestLabel')

    const input = getByTestId('input')
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('name', 'input-name')
  })

  test('defaults name to type name', () => {
    const { getByTestId } = render(<TextInput label='TestLabel' type='url' />)

    const label = getByTestId('label')
    expect(label).toHaveTextContent('TestLabel')

    const input = getByTestId('input')
    expect(input).toHaveAttribute('type', 'url')
    expect(input).toHaveAttribute('name', 'url')
  })
})
