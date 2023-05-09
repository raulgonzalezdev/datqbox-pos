/*eslint-disable*/
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,

  Stack,
  Text,

} from "@chakra-ui/react";


import { SidebarHelp } from "components/Sidebar/SidebarHelp";
import PropTypes from "prop-types";
import React from "react";
import {  useLocation } from "react-router-dom";
import SidebarResponsive from "./SidebarResponsive";
import Brand from "./Brand";
import SidebarLinks from "./SidebarLinks";

function Sidebar(props) {
  const location = useLocation();
  const [state, setState] = React.useState({});
  const mainPanel = React.useRef();
  const variantChange = "0.2s linear";

 

  const { logoText, routes, sidebarVariant } = props;

  let sidebarBg =
    "linear-gradient(111.84deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(26, 31, 55, 0) 100%)";
  let sidebarRadius = "16px";
  let sidebarMargins = "16px 0px 16px 16px";

  // SIDEBAR
  return (
    <Box ref={mainPanel}>
      <SidebarResponsive logoText={props.logoText} routes={props.routes} />
      <Box display={{ sm: "none", xl: "block" }} position="fixed">
        <Box
          bg={sidebarBg}
          backdropFilter="blur(10px)"
          transition={variantChange}
          w="260px"
          maxW="260px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          h="calc(100vh - 32px)"
          ps="20px"
          pe="20px"
          m={sidebarMargins}
          borderRadius={sidebarRadius}
        >
          <Box>
            {" "}
            <Brand logoText={logoText} />
          </Box>
          <Stack direction="column" mb="40px">
            <Box>
              <SidebarLinks routes={routes} sidebarVariant={sidebarVariant} />
            </Box>
          </Stack>
          <SidebarHelp></SidebarHelp>
        </Box>
      </Box>
    </Box>
  );
}

// FUNCTIONS

// PROPS

Sidebar.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.string,
  sidebarVariant: PropTypes.string, // Añade esta línea
};

export default Sidebar;
