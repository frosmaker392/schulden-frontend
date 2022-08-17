import { render } from '@testing-library/react'
import React from 'react'
import FormError from './FormError'

describe('<FormError />', () => {
  test('render nothing if error is undefined', () => {
    const { container } = render(<FormError />)

    expect(container.childElementCount).toBe(0)
  })

  test('render nothing if error is empty', () => {
    const { container } = render(<FormError error='' />)

    expect(container.childElementCount).toBe(0)
  })

  test('render error message if error is specified', () => {
    const errorMsg = 'This is an error'
    const { container, getByText } = render(<FormError error={errorMsg} />)

    expect(container.childElementCount).not.toBe(0)
    expect(getByText(errorMsg)).not.toBeNull()
  })
})
