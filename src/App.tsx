import React from 'react'
import { Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'

import Main from './pages/main/Main'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthGate from './pages/AuthGate'
import CreateExpense from './pages/expense/CreateExpense'
import ExpenseDetail from './pages/expense/ExpenseDetail'
import RelatedExpenses from './pages/expense/RelatedExpenses'

setupIonicReact()

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path='/main'>
          <Main />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
        <Route exact path='/expense/create'>
          <CreateExpense />
        </Route>
        <Route exact path='/expense/details/:id'>
          <ExpenseDetail />
        </Route>
        <Route exact path='/expense/related/:personId'>
          <RelatedExpenses />
        </Route>
        <Route exact path='/'>
          <AuthGate />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
)

export default App
