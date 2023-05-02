import React from 'react';
import { Box } from '@chakra-ui/react';
import SidebarDesktop from './SidebarDesktop';
import SidebarResponsive from './SidebarResponsive';

const Sidebar = ({ logoText, routes, sidebarVariant }) => {
  return (
    <>
      <Box display={{ sm: "none", xl: "block" }} position='fixed'>
        <SidebarDesktop
          logoText={logoText}
          routes={routes}
          sidebarVariant={sidebarVariant}
        />
      </Box>
      <Box display={{ sm: "flex", xl: "none" }} alignItems='center'>
        <SidebarResponsive
          logoText={logoText}
          routes={routes}
          sidebarVariant={sidebarVariant}
          iconColor='white'
        />
      </Box>
    </>
  );
};

export default Sidebar;
