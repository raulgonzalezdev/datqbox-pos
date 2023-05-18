// Chakra imports
import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  CreativeTimLogo,
  DocumentIcon,
  HomeIcon,
  PersonIcon,
  RocketIcon,
  LogoutIcon,
} from "components/Icons/Icons";
import SidebarResponsive  from "components/Sidebar/SidebarResponsive";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import routes from "routes.js";

export default function PosNavbar(props) {
  const [open, setOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const { logo, logoText, secondary, ...rest } = props;
  
  const navigate = useNavigate();

  // Chakra color mode
  let navbarIcon = "white";
  let mainText = "white";
  let navbarBg =
    "linear-gradient(123.64deg, rgba(255, 255, 255, 0) -22.38%, rgba(255, 255, 255, 0.039) 70.38%)";
  let navbarBorder = "rgba(226, 232, 240, 0.3)";
  let navbarShadow = useColorModeValue(
    "0px 7px 23px rgba(0, 0, 0, 0.05)",
    "none"
  );
  let navbarFilter = useColorModeValue(
    "none",
    "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
  );
  let navbarBackdrop = "blur(42px)";
  let navbarPosition = "fixed";
  var brand = (
    <Link
      href={`${process.env.PUBLIC_URL}/#/`}
      target='_blank'
      display='flex'
      lineHeight='100%'
      fontWeight='bold'
      justifyContent='center'
      alignItems='center'
      color={mainText}>
      <Box
        bg='linear-gradient(97.89deg, #FFFFFF 70.67%, rgba(117, 122, 140, 0) 108.55%)'
        bgClip='text'>
        <Text fontSize='md' letterSpacing='3px' mt='3px' color='transparent'>
          {logoText}
        </Text>
      </Box>
    </Link>
  );
  var linksAuth = (
    <HStack display={{ sm: "none", lg: "flex" }}>
      <Button
        onClick={() => navigate('/admin/dashboard')}
        fontSize='sm'
        ms='0px'
        me='0px'
        px='0px'
        me={{ sm: "2px", md: "16px" }}
        color={navbarIcon}
        variant='transparent-with-icon'
        leftIcon={<HomeIcon color={navbarIcon} w='12px' h='12px' me='0px' />}>
        <Text>Dashboard</Text>
      </Button>

      <Button
        onClick={() => navigate('/admin/profile')}
        fontSize='sm'
        ms='0px'
        me='0px'
        px='0px'
        me={{ sm: "2px", md: "16px" }}
        color={navbarIcon}
        variant='transparent-with-icon'
        leftIcon={
          <PersonIcon color={navbarIcon} w='12px' h='12px' me='0px' />
        }>
        <Text>Profile</Text>
      </Button>

      <Button
        fontSize='sm'
        ms='0px'
        px='0px'
        me={{ sm: "2px", md: "16px" }}
        color={navbarIcon}
        variant='transparent-with-icon'
        leftIcon={
          <LogoutIcon color={navbarIcon} w='12px' h='12px' me='0px' />
        }
        onClick={props.onLogout}
        >
        <Text>Logout</Text>
      </Button>
    </HStack>
  );
  return (
    <Flex
      position={navbarPosition}
      top='16px'
      right='10' 
      background={navbarBg}
      border='2px solid'
      borderColor={navbarBorder}
      boxShadow={navbarShadow}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      borderRadius='20px'
      px='16px'
      py='22px'
      mx='auto'
      width='40%' 
      height='40px'
      maxW='90%'
      alignItems='center'>
      <Flex w='100%' justifyContent={{ sm: "start", lg: "space-between" }}>
        {brand}
        <Box
          ms={{ base: "auto", lg: "0px" }}
          display={{ base: "flex", lg: "none" }}>
          <SidebarResponsive
            iconColor='white'
            logoText={props.logoText}
            secondary={props.secondary}
            routes={routes}
            {...rest}
          />
        </Box>
        {linksAuth}
        
      </Flex>
    </Flex>
  );
}

PosNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  brandText: PropTypes.string,
};

