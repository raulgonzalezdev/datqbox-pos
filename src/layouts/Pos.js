// chakra imports
import { Box, ChakraProvider, Portal } from '@chakra-ui/react'
import Footer from 'components/Footer/Footer'
// core components
import PosNavbar from 'components/Navbars/PosNavbar'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import routes from 'routes'
//import theme from "theme/themeAuth.js";
import theme from 'theme/themeAdmin'
import { withRouter } from 'react-router-dom'


const PosLayout = (props ) => {

  const { history, ...rest } = props
  // ref for the wrapper div
  const wrapper = React.createRef()
  React.useEffect(() => {
    document.body.style.overflow = 'unset'
    // Specify how to clean up after this effect:
    return function cleanup() {}
  })
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
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views)
      }
      if (prop.category === 'account') {
        return getRoutes(prop.views)
      }
      if (prop.layout === '/pos') {
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
  const navRef = React.useRef()
  document.documentElement.dir = 'ltr'
  return (
    <ChakraProvider theme={theme} resetCss={false} w='100%'>
      <Box ref={navRef} w='100%'>
        <Portal containerRef={navRef}>
          <PosNavbar
            secondary={getActiveNavbar(routes)}
            logoText='DATQBOX  -  POS'
            {...props}
            {...rest}
          
          />
        </Portal>
        <Box w='100%'>
          <Box ref={wrapper} w='100%'>
            <Switch>
              {getRoutes(routes)}
              <Redirect from='/pos' to='/pos/pos' />
            </Switch>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  )
}

export default withRouter(PosLayout)