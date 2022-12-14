import React from 'react'
import './FormError.css'

interface FormErrorProps {
  error?: string
}

const FormError: React.FC<FormErrorProps> = ({ error }) => {
  if (!error) return null

  return <p className='form-error'>{error}</p>
}

export default FormError
