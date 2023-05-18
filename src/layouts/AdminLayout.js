// Importa los hooks y componentes necesarios de react-router-dom v6
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { ChakraProvider, Portal, useDisclosure } from "@chakra-ui/react";
import Configurator from "components/Configurator/Configurator";
import Footer from "components/Footer/Footer.js";
// Layout components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import React, { useState } from "react";

import routes from "routes.js";
// Custom Chakra theme
import theme from "theme/themeAdmin.js";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin";
// Custom components
import MainPanel from "../components/Layout/MainPanel";
import PanelContainer from "../components/Layout/PanelContainer";
import PanelContent from "../components/Layout/PanelContent";

function AdminLayout(props) {
  const { ...rest } = props;
  const [sidebarVariant, setSidebarVariant] = useState("transparent");
  const [fixed, setFixed] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  document.documentElement.dir = "ltr";

  // Utiliza el hook useLocation para obtener la ubicación actual
  const location = useLocation();

  // Modifica getRoute para utilizar location en lugar de window.location
  const getRoute = () => {
    return location.pathname !== "/admin/full-screen-maps";
  };

  // Utiliza el hook useLocation para obtener la ubicación actual

  const getActiveRoute = (routes) => {
    let activeRoute = "Dashboard";
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
          // Reemplaza window.location.href por location.pathname
          location.pathname.includes(routes[i].layout + routes[i].path)
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
          // Reemplaza window.location.href por location.pathname
          location.pathname.includes(routes[i].layout + routes[i].path)
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
      if (prop.layout === "/admin") {
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

  return (
    <>
    <Outlet />
    <ChakraProvider theme={theme} resetCss={false}>
      <Sidebar
        routes={routes}
        logoText={"DATQBOX"}
        display='none'
        sidebarVariant={sidebarVariant}
        {...rest}
      />
      <MainPanel
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}>
        <Portal>
          <AdminNavbar
            onOpen={onOpen}
            logoText={"DATQBOX"}
            brandText={getActiveRoute(routes)}
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
            {...rest}
          />
        </Portal>
        {getRoute() ? (
          <PanelContent>
            <PanelContainer>
              <Routes>
                {getRoutes(routes)}
                <Route path="*" element={<Navigate to="/admin/dashboard" />} />
              </Routes>
            </PanelContainer>
          </PanelContent>
        ) : null}
        <Footer />
        <Configurator
          secondary={getActiveNavbar(routes)}
          isOpen={isOpen}
          onClose={onClose}
          isChecked={fixed}
          onSwitch={(value) => {
            setFixed(value);
          }}
          onOpaque={() => setSidebarVariant("opaque")}
          onTransparent={() => setSidebarVariant("transparent")}
        />
      </MainPanel>
    </ChakraProvider>
    </>
  );
}

export default AdminLayout;
