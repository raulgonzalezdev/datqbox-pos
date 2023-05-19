import { extendTheme } from '@chakra-ui/react'

import { globalStyles } from './styles'
import { bgAuth } from './bgAuth'
// import { breakpoints } from "./foundations/breakpoints";
import { buttonStyles } from './components/button'
import { badgeStyles } from './components/badge'
import { linkStyles } from './components/link'
import { drawerStyles } from './components/drawer'
import { switchStyles } from './components/switch'
import { CardComponent } from './additions/card/Card'
import { CardBodyComponent } from './additions/card/CardBody'
import { CardHeaderComponent } from './additions/card/CardHeader'
import { MainPanelComponent } from './additions/layout/MainPanel'
import { PanelContentComponent } from './additions/layout/PanelContent'
import { PanelContainerComponent } from './additions/layout/PanelContainer'

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '1024px',
  xl: '1200px',
  '2xl': '1700px',
}

export default extendTheme(
  { breakpoints }, // Breakpoints
  bgAuth, // Global styles
  globalStyles, // Global styles
  buttonStyles, // Button styles
  badgeStyles, // Badge styles
  linkStyles, // Link styles
  drawerStyles, // Sidebar variant for Chakra's drawer
  switchStyles, // Switch styles
  CardComponent, // Card component
  CardBodyComponent, // Card Body component
  CardHeaderComponent, // Card Header component
  MainPanelComponent, // Main Panel component
  PanelContentComponent, // Panel Content component
  PanelContainerComponent // Panel Container component
)
