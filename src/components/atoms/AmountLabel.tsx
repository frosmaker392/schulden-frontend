import React from 'react'
import { toFormattedCurrency } from '../../utils'

import './AmountLabel.css'

interface AmountLabelProps {
  amount: number
  allowNegative?: boolean
  conditionallyColored?: boolean
}

const AmountLabel: React.FC<AmountLabelProps> = ({
  amount,
  allowNegative,
  conditionallyColored,
}) => {
  const formattedNum = toFormattedCurrency(allowNegative ? amount : Math.abs(amount))

  let className: string = 'amount-label '
  if (conditionallyColored) {
    if (amount > 0) className += 'positive'
    else if (amount < 0) className += 'negative'
  }

  return <span className={className}>{formattedNum}</span>
}

export default AmountLabel
