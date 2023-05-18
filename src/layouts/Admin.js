// Chakra imports
import { ChakraProvider, Portal, useDisclosure } from "@chakra-ui/react";
import Configurator from "components/Configurator/Configurator";
import Footer from "components/Footer/Footer.js";
// Layout components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import React, { useState } from "react";
import { useRoutes, useLocation } from "react-router-dom";
import routes from "routes.js";
// Custom Chakra theme
import theme from "theme/themeAdmin.js";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin";
// Custom components
import MainPanel from "../components/Layout/MainPanel";
import PanelContainer from "../components/Layout/PanelContainer";
import PanelContent from "../components/Layout/PanelContent";
import { useNavigate } from 'react-router-dom';

export default function Dashboard(props) {
  const { ...rest } = props;
  // states and functions
  const [sidebarVariant, setSidebarVariant] = useState("transparent");
  const [fixed, setFixed] = useState(false);
  // ref for main panel div
  const mainPanel = React.createRef();
  const navigate = useNavigate();
  const location = useLocation();

  const routing = useRoutes(
    routes.map((route, index) => {
      if (route.collapse) {
        return routes.map((childRoute) => {
          if (childRoute.layout === "/admin") {
            return {
              path: childRoute.layout + childRoute.path,
              element: <childRoute.component />,
            };
          } else {
            return null;
          }
        });
      }
      if (route.category === "account") {
        return routes.map((childRoute) => {
          if (childRoute.layout === "/admin") {
            return {
              path: childRoute.layout + childRoute.path,
              element: <childRoute.component />,
            };
          } else {
            return null;
          }
        });
      }
      if (route.layout === "/admin") {
        return {
          path: route.layout + route.path,
          element: <route.component />,
        };
      } else {
        return null;
      }
    })
  );
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  document.documentElement.dir = "ltr";
  // Chakra Color Mode
  return (
    <ChakraProvider theme={theme} resetCss={false}>
      <Sidebar
        routes={routes}
        logoText={"DATQBOX"}
        display='none'
        sidebarVariant={sidebarVariant}
        {...rest}
      />
      <MainPanel
        ref={mainPanel}
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
              {routing}
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
  );
}

