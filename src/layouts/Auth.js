import { Box, ChakraProvider, Portal } from "@chakra-ui/react";
import Footer from "components/Footer/Footer.js";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import React, { Component } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import routes from "routes.js";
import theme from "theme/themeAuth.js";

class AuthLayout extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.navRef = React.createRef();
  }

  componentDidMount() {
    document.body.style.overflow = "unset";
  }

  componentWillUnmount() {
    document.body.style.overflow = "";
  }

  componentDidUpdate(prevProps) {
    if (prevProps.forceUpdate !== this.props.forceUpdate) {
      this.props.history.push("/auth/signin");
    }
  }


  getActiveRoute = (routes) => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = this.getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = this.getActiveRoute(routes[i].views);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };

  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.category === "account") {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].category) {
        let categoryActiveNavbar = this.getActiveNavbar(routes[i].views);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          if (routes[i].secondaryNavbar) {
            return routes[i].secondaryNavbar;
          }
        }
      }
    }
    return activeNavbar;
  };
  

  render() {
    document.documentElement.dir = "ltr";
    return (
      <ChakraProvider theme={theme} resetCss={false} w="100%">
        <Box ref={this.wrapper} w="100%">
          <Portal containerRef={this.wrapper}>
            <AuthNavbar
              secondary={this.getActiveNavbar(routes)}
              logoText="DATQBOX - POS"
            />
          </Portal>
          <Box w="100%">
            <Box ref={this.wrapper} w="100%">
              <Switch>
                {this.getRoutes(routes)}
                <Redirect from="/auth" to="/auth/signin" />
              </Switch>
            </Box>
          </Box>
        </Box>
      </ChakraProvider>
    );
  }
}

export default withRouter(AuthLayout);
