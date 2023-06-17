import React, { useState, useEffect } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { VALIDATE_TOKEN } from 'graphql/users/crudUser'
import AuthLayout from 'layouts/Auth'
import AdminLayout from 'layouts/AdminLayout'
import PosLayout from 'layouts/Pos'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { clientId } from 'variables/clienteId'

import { AuthContext } from './AuthContext'

const AppContent = ({ onLogout, token, login }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState(null)

  const clientGoogle = clientId
  const { loading, error, data } = useQuery(VALIDATE_TOKEN, {
    variables: { token },
    skip: !token,
    onCompleted: (data) => {
      setIsAuthenticated(data.validateToken)
    },
    onError: (error) => {
      localStorage.removeItem('authToken')
      setIsAuthenticated(false)
    },
  })

  // Actualizar userData cuando login cambie
  useEffect(() => {
    if (login) {
      setUserData(login)
    } else {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUserData(JSON.parse(storedUser))
      }
    }
  }, [login])

  if (loading) {
    return null
  }

  return (
    <GoogleOAuthProvider clientId={clientGoogle}>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userData, setUserData }}>
        <HashRouter>
          <Switch>
            <Route path={'/auth'} component={AuthLayout} />
            <Route
              path={'/admin'}
              render={(props) =>
                isAuthenticated ? <AdminLayout {...props} onLogout={onLogout} /> : <Redirect to="/auth/signin" />
              }
            />
            <Route
              path={'/pos'}
              render={(props) =>
                isAuthenticated ? <PosLayout {...props} onLogout={onLogout} /> : <Redirect to="/auth/signin" />
              }
            />
            <Redirect from={'/'} to={isAuthenticated ? '/pos' : '/auth/signin'} />
          </Switch>
        </HashRouter>
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  )
}

export default AppContent
