import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import AuthService from './services/AuthService'
import { ServiceProvider, Services } from './providers/ServiceProvider'
import TokenService from './services/TokenService'

const tokenService = new TokenService(localStorage)

// https://medium.com/risan/set-authorization-header-with-apollo-client-e934e6517ccf
const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const authLink = new ApolloLink((operation, forward) => {
  const token = tokenService.getToken()

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  })

  return forward(operation)
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const authService = new AuthService(client)

const services: Services = {
  auth: authService,
  token: tokenService,
}

ReactDOM.render(
  <React.StrictMode>
    <ServiceProvider services={services}>
      <App />
    </ServiceProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
