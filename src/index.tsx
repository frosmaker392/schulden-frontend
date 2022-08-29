import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import ApolloLinkTimeout from 'apollo-link-timeout'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { CredentialsCache, CredentialsCacheContext } from './utils/CredentialsCache'

dayjs.extend(relativeTime)

// https://medium.com/risan/set-authorization-header-with-apollo-client-e934e6517ccf
const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const credentialsCache = new CredentialsCache()
const authLink = new ApolloLink((operation, forward) => {
  const token = credentialsCache.getToken()

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  })

  return forward(operation)
})

const timeoutLink = new ApolloLinkTimeout(10000)

const client = new ApolloClient({
  link: authLink.concat(timeoutLink).concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CredentialsCacheContext.Provider value={new CredentialsCache()}>
        <App />
      </CredentialsCacheContext.Provider>
    </ApolloProvider>
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
