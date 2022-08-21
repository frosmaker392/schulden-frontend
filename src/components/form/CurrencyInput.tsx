import React from 'react'
import NumberFormat from 'react-number-format'
import { toFormattedCurrency } from '../../utils'
import './CurrencyInput.css'

interface CurrencyInputProps {
  value?: number
  onChange: (v: number) => void
  disabled?: boolean
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ value, onChange, disabled }) => {
  return (
    <NumberFormat
      thousandSeparator='.'
      decimalSeparator=','
      decimalScale={2}
      fixedDecimalScale
      suffix=' €'
      allowNegative={false}
      placeholder={toFormattedCurrency(0)}
      className='currency-input'
      defaultValue={value}
      onValueChange={({ value }) => onChange(parseFloat(value))}
      disabled={disabled}
    />
  )
}

export default CurrencyInput
