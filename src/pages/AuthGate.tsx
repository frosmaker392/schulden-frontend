import { IonLoading } from '@ionic/react'
import React from 'react'
import { Redirect } from 'react-router'
import useCurrentUser from '../hooks/useCurrentUser'

const AuthGate: React.FC = () => {
  const { user, pending, error } = useCurrentUser()

  return (
    <>
      <IonLoading isOpen={pending} />
      {user && <Redirect exact to='/main' />}
      {error !== '' && <Redirect exact to='/login' />}
    </>
  )
}

export default AuthGate
