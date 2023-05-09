import React from 'react';
import { 
  Accordion, 
  AccordionItem, 
  AccordionButton, 
  AccordionPanel, 
  AccordionIcon, 
  Button, 
  Flex, 
  Icon, 
  Text 
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import PropTypes from "prop-types";
import IconBox from "components/Icons/IconBox";


const SidebarLinks = (props) => {
    const { routes, sidebarVariant } = props;
    const variantChange = '0.2s linear';
    const [state, setState] = React.useState({});
    const activeRoute = (routeName) => {
      return location.pathname === routeName ? "active" : "";
    };
  
    const createLinks = (routes) => {
        const { sidebarVariant } = props;
        let activeBg = "#1A1F37";
        let inactiveBg = "#1A1F37";
        let activeColor = "white";
        let inactiveColor = "white";
        let sidebarActiveShadow = "none";
    
        return routes
          .map((prop, key) => {
            if (prop.redirect) {
              return null;
            }
            if (prop.category && prop.state === "pageArcordion") {
              return (
                <Accordion allowMultiple style={{ border: "none" }}>
                  <AccordionItem key={key}>
                    <AccordionButton color={activeColor}>
                      <Flex alignItems="center">
                        {typeof prop.icon === "string" ? (
                          <Icon h="30px" me="12px">
                            {prop.icon}
                          </Icon>
                        ) : (
                          <IconBox
                            bg="brand.200"
                            color="white"
                            h="30px"
                            w="30px"
                            me="12px"
                            transition={variantChange}
                          >
                            {prop.icon}
                          </IconBox>
                        )}
                        <Text
                          color={activeColor}
                          fontWeight="bold"
                          mb={{
                            xl: "12px",
                          }}
                          mx="auto"
                          ps={{
                            sm: "10px",
                            xl: "16px",
                          }}
                          py="12px"
                          my="auto"
                          flex="1"
                          textAlign="left"
                          h="30px" // Agregamos la misma altura que el icono
                        >
                          {prop.name}
                        </Text>
                      </Flex>
    
                      <AccordionIcon />
                    </AccordionButton>
    
                    <AccordionPanel>{createLinks(prop.views)}</AccordionPanel>
                  </AccordionItem>
                </Accordion>
              );
            }
    
            if (prop.category && prop.state === "pageCollapse") {
              return (
                <>
                  <Text
                    color={activeColor}
                    fontWeight="bold"
                    mb={{
                      xl: "12px",
                    }}
                    mx="auto"
                    ps={{
                      sm: "10px",
                      xl: "16px",
                    }}
                    py="12px"
                  >
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
                    boxSize="initial"
                    justifyContent="flex-start"
                    alignItems="center"
                    boxShadow={sidebarActiveShadow}
                    bg={activeBg}
                    transition={variantChange}
                    backdropFilter="blur(42px)"
                    mb={{
                      xl: "12px",
                    }}
                    mx={{
                      xl: "auto",
                    }}
                    ps={{
                      sm: "10px",
                      xl: "16px",
                    }}
                    py="12px"
                    borderRadius="15px"
                    _hover="none"
                    w="100%"
                    _active={{
                      bg: "inherit",
                      transform: "none",
                      borderColor: "transparent",
                    }}
                    _focus={{
                      boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    <Flex>
                      {typeof prop.icon === "string" ? (
                        <Icon>{prop.icon}</Icon>
                      ) : (
                        <IconBox
                          bg="brand.200"
                          color="white"
                          h="30px"
                          w="30px"
                          me="12px"
                          transition={variantChange}
                        >
                          {prop.icon}
                        </IconBox>
                      )}
                      <Text color={activeColor} my="auto" fontSize="sm">
                        {document.documentElement.dir === "rtl"
                          ? prop.rtlName
                          : prop.name}
                      </Text>
                    </Flex>
                  </Button>
                ) : (
                  <Button
                    boxSize="initial"
                    justifyContent="flex-start"
                    alignItems="center"
                    bg="transparent"
                    mb={{
                      xl: "12px",
                    }}
                    mx={{
                      xl: "auto",
                    }}
                    py="12px"
                    ps={{
                      sm: "10px",
                      xl: "16px",
                    }}
                    borderRadius="15px"
                    _hover="none"
                    w="100%"
                    _active={{
                      bg: "inherit",
                      transform: "none",
                      borderColor: "transparent",
                    }}
                    _focus={{
                      boxShadow: "none",
                    }}
                  >
                    <Flex>
                      {typeof prop.icon === "string" ? (
                        <Icon>{prop.icon}</Icon>
                      ) : (
                        <IconBox
                          bg={inactiveBg}
                          color="brand.200"
                          h="30px"
                          w="30px"
                          me="12px"
                          transition={variantChange}
                        >
                          {prop.icon}
                        </IconBox>
                      )}
                      <Text color={inactiveColor} my="auto" fontSize="sm">
                        {document.documentElement.dir === "rtl"
                          ? prop.rtlName
                          : prop.name}
                      </Text>
                    </Flex>
                  </Button>
                )}
              </NavLink>
            );
          })
          .flat(); // Use the flat method to flatten any nested arrays returned by createAccordionItems
      };
    
      // final create link
  
    return <>{createLinks(routes)}</>;
  };
  

  SidebarLinks.propTypes = {
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        rtlName: PropTypes.string,
        icon: PropTypes.element,
        component: PropTypes.elementType,
        layout: PropTypes.string.isRequired,
        category: PropTypes.string,
        state: PropTypes.string,
        views: PropTypes.array,
        secondaryNavbar: PropTypes.bool,
      })
    ),
    sidebarVariant: PropTypes.string,
  };
  

  export default SidebarLinks;
