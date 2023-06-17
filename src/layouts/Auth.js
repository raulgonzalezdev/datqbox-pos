import { Box, ChakraProvider, Portal } from '@chakra-ui/react'
import AuthNavbar from 'components/Navbars/AuthNavbar'
import React, { useEffect, useRef } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import routes from 'routes'
import theme from 'theme/themeAuth'
import SignIn from 'views/Pages/SignIn'
import SignUp from 'views/Pages/SignUp'

const AuthLayout = (props) => {
  const wrapper = useRef(null)
 

  useEffect(() => {
    document.body.style.overflow = 'unset'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

 

  const getActiveRoute = (routes) => {
    let activeRoute = 'Default Brand Text'
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views)
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].views)
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name
        }
      }
    }
    return activeRoute
  }

 
   
  var dashRoutes = [
    {
      path: '/signin',
      component: SignIn,
      layout: '/auth',
    },
    {
       path: '/signup',
      component: SignUp,
      layout: '/auth',
    },
  ]  
   
  const getRoutes = (routes) => {
    // Combine routes and dashRoutes into one array
    const allRoutes = [...routes, ...dashRoutes]
    
    return allRoutes.map((prop, key) => {
      if (prop.layout === '/auth') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        )
      } else {
        return null
      }
    })
  }
  
  
  const getActiveNavbar = (routes) => {
    let activeNavbar = false
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].views)
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          if (routes[i].secondaryNavbar) {
            return routes[i].secondaryNavbar
          }
        }
      }
    }
    return activeNavbar
  }

  document.documentElement.dir = 'ltr'
  return (
    <ChakraProvider theme={theme} resetCss={false} w="100%">
      <Box ref={wrapper} w="100%">
        <Portal containerRef={wrapper}>
          <AuthNavbar
            secondary={getActiveNavbar(routes)}
            logoText="DATQBOX - POS"
          />
        </Portal>
        <Box w="100%">
          <Box ref={wrapper} w="100%">
            <Switch>
              {getRoutes(routes)}
              <Redirect from="/pos" to="/pos" />
            </Switch>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  )
}

export default AuthLayout
