import React from 'react'
import { Person } from '../../typeDefs'

interface PersonLabelProps {
  person: Person
}

const PersonLabel: React.FC<PersonLabelProps> = ({ person }) => {
  const prefix = 'email' in person ? '@' : ''
  return <span className='person-label'>{prefix + person.name}</span>
}

export default PersonLabel
