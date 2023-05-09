import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  Box,
  Text,
  Button,
  Flex,
  Icon,
  Link,
  Stack,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { SidebarHelp } from "components/Sidebar/SidebarHelp";
import Brand from "./Brand";
import SidebarLinks from "./SidebarLinks";

const SidebarResponsive = (props) => {
  // to check for active links and opened collapses
  let location = useLocation();
  // this is for the rest of the collapses
  const [state, setState] = React.useState({});
  const mainPanel = React.useRef();


  const { logoText, routes, sidebarVariant,iconColor, ...rest } = props;
  

 
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  // Color variables
  return (
    <Flex
      display={{ sm: "flex", xl: "none" }}
      ref={mainPanel}
      alignItems="center"
    >
      <HamburgerIcon
        color={iconColor}
        w="18px"
        h="18px"
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={document.documentElement.dir === "rtl" ? "right" : "left"}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          backdropFilter="blur(10px)"
          bg="linear-gradient(111.84deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(26, 31, 55, 0) 100%); "
          w="250px"
          maxW="250px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          borderRadius="16px"
        >
          <DrawerCloseButton
            color="white"
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW="250px" px="1rem">
            <Box maxW="100%" h="100vh">
              <Box>
                {" "}
                <Brand logoText={logoText} />
              </Box>
              <Stack direction="column" mb="40px">
                <Box>
                  <SidebarLinks
                    routes={routes}
                     sidebarVariant={sidebarVariant}
                  />
                </Box>
              </Stack>
              <SidebarHelp></SidebarHelp>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
// PROPS

SidebarResponsive.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

export default SidebarResponsive;
