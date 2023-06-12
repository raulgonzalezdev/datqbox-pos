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

const AppContent = ({ onLogout, token }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
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

  if (loading) {
    return null
  }

  return (
    <GoogleOAuthProvider clientId={clientGoogle}>
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
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
