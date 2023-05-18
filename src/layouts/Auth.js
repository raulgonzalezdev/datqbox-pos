import { Box, ChakraProvider, Portal } from "@chakra-ui/react";
import Footer from "components/Footer/Footer.js";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import { useRoutes, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import routes from "routes.js";
import theme from "theme/themeAuth.js";


const AuthLayout = ({ forceUpdate }) => {
  const wrapper = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "";
    }
  }, []);

  useEffect(() => {
    navigate('/auth/signin');
  }, [forceUpdate, navigate]);

  const getActiveRoute = (routes) => {
    // similar logic to get active route
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      // similar logic to create routes
    });
  };

  const getActiveNavbar = (routes) => {
    // similar logic to get active navbar
  };
  

  document.documentElement.dir = "ltr";
  const routing = useRoutes([
    ...getRoutes(routes),
    {
      path: "/auth/*",
      element: <Navigate to="/auth/signin" replace />,
    }
  ]);

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
            {routing}
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default AuthLayout;
