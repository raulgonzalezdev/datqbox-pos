import { Box, ChakraProvider, Portal } from "@chakra-ui/react";
import { useNavigate, useRoutes, Navigate } from 'react-router-dom';
import { useRef, useEffect } from "react";
import PosNavbar from "components/Navbars/PosNavbar.js";
import routes from "routes.js";
import theme from "theme/themeAdmin.js";
import { Outlet } from 'react-router-dom';

const PosLayout = (props) => {
  const { ...rest } = props;
  const wrapper = useRef(null);
  useEffect(() => {
    document.body.style.overflow = "unset";
    return function cleanup() {};
  });

  const getActiveRoute = (routes) => {
    let activeRoute = "Pos";
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
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.category === "account") {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/pos") {
        return {
          path: prop.layout + prop.path,
          element: <prop.element />,
          key: key
        };
      } else {
        return null;
      }
    }).filter(Boolean);
  };

  const navRef = useRef();
  document.documentElement.dir = "ltr";

  const routing = useRoutes([
    ...getRoutes(routes),
    {
      path: "/pos/*",
      element: <Navigate to="/pos/pos" replace />,
    }
  ]);

  return (
    <>
       <Outlet />
    
    <ChakraProvider theme={theme} resetCss={false} w='100%'>
      <Box ref={navRef} w='100%'>
        <Portal containerRef={navRef}>
          <PosNavbar
            secondary={getActiveNavbar(routes)}
            logoText='DATQBOX  -  POS'
            {...props}
          />
        </Portal>
        <Box w='100%'>
          <Box ref={wrapper} w='100%'>
            {routing}
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
    </>
  );
}

export default PosLayout;
