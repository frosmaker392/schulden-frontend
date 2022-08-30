import React from 'react'
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { home, cash, list } from 'ionicons/icons'
import Home from './Home'
import { Redirect, Route } from 'react-router'
import Expenses from './Expenses'

import './Main.css'
import Debts from './Debts'

const Main: React.FC = () => {
  return (
    <IonTabs className='main'>
      <IonRouterOutlet>
        <Redirect exact path='/main' to='/main/home' />
        <Route exact path='/main/home'>
          <Home />
        </Route>
        <Route exact path='/main/expenses'>
          <Expenses />
        </Route>
        <Route exact path='/main/debts'>
          <Debts />
        </Route>
        <Route exact path='/main'>
          <Redirect to='/main/home' />
        </Route>
      </IonRouterOutlet>

      <IonTabBar class='tab-bar' slot='bottom'>
        <IonTabButton tab='home' href='/main/home'>
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab='expenses' href='/main/expenses'>
          <IonIcon icon={cash} />
          <IonLabel>Expenses</IonLabel>
        </IonTabButton>
        <IonTabButton tab='debts' href='/main/debts'>
          <IonIcon icon={list} />
          <IonLabel>Debts</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default Main
