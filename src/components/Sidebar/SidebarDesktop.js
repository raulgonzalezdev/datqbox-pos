import {
    Box,
    Button,
    Flex,
    Icon,
    Stack,
    Text,
    useDisclosure,
  } from "@chakra-ui/react";
  import PropTypes from "prop-types";
  import { NavLink, useLocation } from "react-router-dom";
  import IconBox from "components/Icons/IconBox";
  import { SimmmpleLogoWhite } from "components/Icons/Icons";
  import { Separator } from "components/Separator/Separator";
  import { SidebarHelp } from "components/Sidebar/SidebarHelp";
  
  function SidebarDesktop(props) {
    let location = useLocation();
    const mainPanel = React.useRef();
    let variantChange = "0.2s linear";
    const { logoText, routes, sidebarVariant } = props;
  
    const activeRoute = (routeName) => {
      return location.pathname === routeName ? "active" : "";
    };
  
    const createLinks = (routes) => {
      let activeBg = "#1A1F37";
      let inactiveBg = "#1A1F37";
      let activeColor = "white";
      let inactiveColor = "white";
      let sidebarActiveShadow = "none";
  
      return routes.map((prop, key) => {
        if (prop.redirect) {
          return null;
        }
        if (prop.category) {
          var st = {};
          st[prop["state"]] = !state[prop.state];
          return (
            <>
              <Text
                color={activeColor}
                fontWeight='bold'
                mb={{
                  xl: "12px",
                }}
                mx='auto'
                ps={{
                  sm: "10px",
                  xl: "16px",
                }}
                py='12px'>
                {document.documentElement.dir === "rtl"
                  ? prop.rtlName
                  : prop.name}
              </Text>
              {createLinks(prop.views)}
            </>
          );
        }
        return (
          <NavLink to={prop.layout + prop.path}>
            {activeRoute(prop.layout + prop.path) === "active" ? (
              <Button
                boxSize='initial'
                justifyContent='flex-start'
                alignItems='center'
                boxShadow={sidebarActiveShadow}
                bg={activeBg}
                transition={variantChange}
                backdropFilter='blur(42px)'
                <Box>{links}</Box>
</Stack>
<SidebarHelp></SidebarHelp>
</Box>
</DrawerBody>
</DrawerContent>
</Drawer>
</Flex>
);
}

// TYPES

Sidebar.propTypes = {
// this is used to make the prop
// change the color of the sidebar for the links and the logo if this is true
// we need this to make some of the components look good on dark background
sidebarVariant: PropTypes.oneOf(["red", "blue", "green", "orange", "purple"]),
logoText: PropTypes.string,
routes: PropTypes.arrayOf(PropTypes.object),
};

// Deafult Navbar color
Sidebar.defaultProps = {
sidebarVariant: "blue",
logoText: "DATQBOX",
};

export default SidebarDesktop;
  