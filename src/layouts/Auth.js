import { Box, ChakraProvider, Portal } from "@chakra-ui/react";
import Footer from "components/Footer/Footer.js";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import React, { useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import routes from "routes.js";
import theme from "theme/themeAuth.js";

function AuthLayout(props) {
  const wrapper = React.createRef();
  const navRef = React.createRef();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "unset";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (props.forceUpdate) {
      navigate("/auth/signin");
    }
  }, [props.forceUpdate, navigate]);

  const getActiveRoute = (routes) => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].views);
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

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.category === "account") {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.path}
            element={<prop.component />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].views);
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
              <Routes>
                {this.getRoutes(routes)}
                <Route path="/" element={<Navigate to="/auth/signin" />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </ChakraProvider>
  );
}

export default AuthLayout;
