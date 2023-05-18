import { Box, ChakraProvider, Portal } from "@chakra-ui/react";
import Footer from "components/Footer/Footer.js";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import React, { useEffect, useState, useRef } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import routes from "routes.js";
//import theme from "theme/themeAuth.js";
import theme from "theme/themeAdmin.js";

function AuthLayout({ forceUpdate }) {
  const wrapper = useRef(null);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (forceUpdate) {
      location.replace("/auth/signin");
    }
  }, [forceUpdate, location]);

  const getActiveRoute = (routes) => {
    let activeRoute = "Auth";
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

  const getRoutes = (routes) => {
    return routes.flatMap((prop, key) => {
      if (prop.collapse || prop.category === "account") {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            element={React.createElement(prop.element)}
            key={key}
          />
        );
      }
      return [];
    });
  };

  

  document.documentElement.dir = "ltr";
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
            <Routes>
              {getRoutes(routes)}
              <Route path="*" element={<Navigate to="/auth/signin" />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default AuthLayout;
