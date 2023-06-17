import React, { useState, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { client } from 'graphql/client'

import AppContent from './AppContent'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('authToken'))
  const [userData, setUserData] = useState()

  //console.log('userData', userData)
  const handleLogout = () => {
    //localStorage.removeItem('authToken')
    setToken(null)
    setUserData(null)
  }

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'authToken') {
        setToken(localStorage.getItem('authToken'))
      }
      if (e.key === 'user') {
        setUserData(localStorage.getItem('user'))
      }
    }

    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  return (
    <ApolloProvider client={client}>
      <AppContent onLogout={handleLogout} token={token} login={userData}  />
    </ApolloProvider>
  )
}

const root = createRoot(document.getElementById('root')) 
root.render(<App />)
