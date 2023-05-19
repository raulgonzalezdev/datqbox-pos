import React, { useState, useEffect } from 'react'

import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { VALIDATE_TOKEN } from 'graphql/users/crudUser'
import AuthLayout from 'layouts/Auth'
import AdminLayout from 'layouts/AdminLayout'
import PosLayout from 'layouts/Pos'
import { AuthContext } from './AuthContext'

const AppContent = ({ onLogout, token }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

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
  )
}

export default AppContent
