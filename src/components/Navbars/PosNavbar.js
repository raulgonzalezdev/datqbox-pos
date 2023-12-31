import { Box, Button, Flex, HStack, Link, Text, useColorModeValue, Image, Avatar, Tooltip } from '@chakra-ui/react'
import { CreativeTimLogo, DocumentIcon, HomeIcon, PersonIcon, RocketIcon, LogoutIcon } from 'components/Icons/Icons'
import { SlLogout } from 'react-icons/sl'
import SidebarResponsive from 'components/Sidebar/SidebarResponsive'
import PropTypes from 'prop-types'
import React, { useContext, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import routes from 'routes'
import logo_Brand from 'assets/img/logo.png'

import { AuthContext } from '../../AuthContext'

export default function PosNavbar(props) {
  const [open, setOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setOpen(!open)
  }
  const { logo, logoText, secondary, ...rest } = props
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return window.location.href.indexOf(routeName) > -1 ? true : false
  }
  // Chakra color mode
  const history = useHistory()

  const { isAuthenticated, setIsAuthenticated, userData, setUserData } = useContext(AuthContext)
  const userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/auth/signin')

      // } else {
      //   history.push('/auth/signin');
    }
  }, [isAuthenticated, history])

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserData(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  }

  let navbarIcon = 'white'
  let mainText = 'white'
  let navbarBg = 'linear-gradient(123.64deg, rgba(255, 255, 255, 0) -22.38%, rgba(255, 255, 255, 0.039) 70.38%)'
  let navbarBorder = 'rgba(226, 232, 240, 0.3)'
  let navbarShadow = useColorModeValue('0px 7px 23px rgba(0, 0, 0, 0.05)', 'none')
  let navbarFilter = useColorModeValue('none', 'drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))')
  let navbarBackdrop = 'blur(42px)'
  let navbarPosition = 'fixed'
  var brand = (
    <Link
      href={`${process.env.PUBLIC_URL}/#/`}
      target="_blank"
      display="flex"
      lineHeight="100%"
      fontWeight="bold"
      justifyContent="center"
      alignItems="center"
      color={mainText}
    >
      <Box bg="linear-gradient(97.89deg, #FFFFFF 70.67%, rgba(117, 122, 140, 0) 108.55%)" bgClip="text">
        {/* <Text fontSize='md' letterSpacing='3px' mt='3px' color='transparent'>
          {logoText}

        </Text> */}
        <Image src={logo_Brand} width="225px" height="55px" alt="Logo" me="10px" mt="2px" />
      </Box>
    </Link>
  )
  var linksAuth = (
    <HStack display={{ sm: 'none', lg: 'flex' }}>
      <NavLink to="/admin/dashboard">
        <Button
          fontSize="sm"
          ms="0px"
          px="0px"
          me={{ sm: '2px', md: '16px' }}
          color={navbarIcon}
          variant="transparent-with-icon"
          leftIcon={<HomeIcon color={navbarIcon} w="22px" h="22px" me="0px" />}
        >
          <Text>Dashboard</Text>
        </Button>
      </NavLink>
      <NavLink to="/admin/profile">
        <Tooltip label={userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : ''}>
          <Button
            fontSize="sm"
            ms="0px"
            px="0px"
            me={{ sm: '2px', md: '16px' }}
            color={navbarIcon}
            variant="transparent-with-icon"
            leftIcon={
              userInfo && userInfo.avatar ? (
                <Avatar src={userInfo.avatar} w="32px" h="32px" me="0px" />
              ) : (
                <PersonIcon color={navbarIcon} w="22px" h="22px" me="0px" />
              )
            }
          >
            <Text>{userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : 'Profile'}</Text>
          </Button>
        </Tooltip>
      </NavLink>

      {/* <NavLink to='/auth/signin'> */}
      <Button
        fontSize="sm"
        ms="0px"
        px="0px"
        me={{ sm: '2px', md: '16px' }}
        color={navbarIcon}
        variant="transparent-with-icon"
        leftIcon={<SlLogout color={navbarIcon} w="32px" h="32px" me="0px" />}
        onClick={handleLogout}
      >
        <Text>Logout</Text>
      </Button>
      {/* </NavLink> */}
    </HStack>
  )
  return (
    <Flex
      position={navbarPosition}
      top="16px"
      right="10" // Cambiar left por right y establecer en 0
      background={navbarBg}
      border="2px solid"
      borderColor={navbarBorder}
      boxShadow={navbarShadow}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      borderRadius="20px"
      px="16px"
      py="22px"
      mx="auto"
      width="40%" // Cambiar width al 60%
      height="65px"
      maxW="90%"
      alignItems="center"
    >
      <Flex w="100%" justifyContent={{ sm: 'start', lg: 'space-between' }}>
        {brand}
        <Box ms={{ base: 'auto', lg: '0px' }} display={{ base: 'flex', lg: 'none' }}>
          <SidebarResponsive iconColor="white" logoText={props.logoText} secondary={props.secondary} routes={routes} {...rest} />
        </Box>
        {linksAuth}
      </Flex>
    </Flex>
  )
}

PosNavbar.propTypes = {
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  brandText: PropTypes.string,
}
