import React, { useRef, useState } from 'react'
import { InputCustomEvent, IonInput } from '@ionic/react'
import { toFormattedCurrency } from '../../utils'
import InputFieldContainer from '../atoms/InputFieldContainer'

interface CurrencyInputProps {
  label?: string
  className?: string
  onChange: (val: number) => void
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ label, className, onChange }) => {
  const inputRef = useRef<HTMLIonInputElement>(null)
  const [canInput, setCanInput] = useState(false)
  const [rawValue, setRawValue] = useState<number>()

  const handleChange = (e: InputCustomEvent) => {
    if (!canInput) return
    const parsedNum = parseFloat(e.detail.value ?? '')
    const parsedNumNotNaN = isNaN(parsedNum) ? undefined : parsedNum

    setRawValue(parsedNumNotNaN)
    parsedNumNotNaN && onChange(parsedNumNotNaN)
  }

  const handleFocus = () => {
    inputRef.current?.setAttribute('value', rawValue?.toString() ?? '')
    setCanInput(true)
  }

  const handleBlur = () => {
    inputRef.current?.setAttribute('value', rawValue ? toFormattedCurrency(rawValue) : '')
    setCanInput(false)
  }

  const input = (
    <IonInput
      inputMode='decimal'
      ref={inputRef}
      className={className}
      onIonChange={handleChange}
      onIonFocus={handleFocus}
      onIonBlur={handleBlur}
      placeholder={toFormattedCurrency(0)}
    />
  )

  return label ? <InputFieldContainer label={label}>{input}</InputFieldContainer> : input
}

export default CurrencyInput
