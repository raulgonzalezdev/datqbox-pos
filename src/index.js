import React, { useState, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { client } from 'graphql/client'

import AppContent from './AppContent'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('authToken'))

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    setToken(null)
  }

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'authToken') {
        setToken(localStorage.getItem('authToken'))
      }
    }

    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  return (
    <ApolloProvider client={client}>
      <AppContent onLogout={handleLogout} token={token} />
    </ApolloProvider>
  )
}

const root = createRoot(document.getElementById('root')) 
root.render(<App />)
