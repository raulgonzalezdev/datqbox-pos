/*!

   

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra Imports
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  Link,
  Switch,
  Text,
  DarkMode,
  LightMode,
} from '@chakra-ui/react'
import { Separator } from 'components/Separator/Separator'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { FaTwitter, FaFacebook } from 'react-icons/fa'

export default function Configurator(props) {
  const { secondary, isOpen, onClose, fixed, ...rest } = props
  const [switched, setSwitched] = useState(props.isChecked)

  // Chakra Color Mode
  let fixedDisplay = 'flex'
  if (props.secondary) {
    fixedDisplay = 'none'
  }
  let colorButton = 'white'
  const secondaryButtonColor = 'white'
  const settingsRef = React.useRef()
  return (
    <>
      <Drawer
        isOpen={props.isOpen}
        onClose={props.onClose}
        placement={document.documentElement.dir === 'rtl' ? 'left' : 'right'}
        finalFocusRef={settingsRef}
        blockScrollOnMount={false}>
        <DrawerContent
          bg='linear-gradient(111.84deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(26, 31, 55, 0) 100%)'
          backdropFilter='blur(42px)'>
          <DrawerHeader pt='24px' px='24px'>
            <DrawerCloseButton color='white' />
            <Text color='white' fontSize='xl' fontWeight='bold' mt='16px'>
              DatqBox Configurator
            </Text>
            <Text color='white' fontSize='md' mb='16px'>
              See your dashboard options.
            </Text>
            <Separator />
          </DrawerHeader>
          <DrawerBody w='340px' ps='24px' pe='40px'>
            <Flex flexDirection='column'>
              <Box
                display={fixedDisplay}
                justifyContent='space-between '
                mb='20px'>
                <DarkMode>
                  <Text color='white' fontSize='md' fontWeight='600' mb='4px'>
                    Navbar Fixed
                  </Text>
                  <Switch
                    colorScheme='brand'
                    isChecked={switched}
                    onChange={(event) => {
                      if (switched === true) {
                        props.onSwitch(false)
                        setSwitched(false)
                      } else {
                        props.onSwitch(true)
                        setSwitched(true)
                      }
                    }}
                  />
                </DarkMode>
              </Box>
              <Box>
                <Box>
                  <Link
                    href='https://www.datqbox.com/product/vision-ui-dashboard-chakra'
                    w='100%'
                    mb='16px'>
                    <Button
                      w='100%'
                      mb='16px'
                      bg='brand.200'
                      color={colorButton}
                      fontSize='xs'
                      variant='brand'
                      px='30px'>
                      Free Download
                    </Button>
                  </Link>
                  <Link
                    href='https://demos.datqbox.com/docs-vision-ui-dashboard-chakra/'
                    w='100%'>
                    <Button
                      w='100%'
                      color={secondaryButtonColor}
                      fontSize='xs'
                      variant='outlineWhite'
                      px='20px'
                      mb='16px'>
                      <Text textDecorationColor='none'>Documentation</Text>
                    </Button>
                  </Link>
                </Box>
                
                <Box w='100%'>
                  <Text color='white' mb='6px' textAlign='center'>
                    Thank you for sharing!
                  </Text>
                  <LightMode>
                    <Flex justifyContent='center' alignContent='center'>
                      <Link
                        isExternal='true'
                        href='https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.datqbox.com%2Fproduct%2Fdatqbox-pos&text=Conoce%20el%20sistema%20Datqbox%20Pos%20desarrollado%20por%20%40DatqBox.%20Te%20invitamos%20a%20descubrir%20nuestra%20solución%20innovadora.%20%23DatqBoxPos%20%23innovación%20%23tecnología%20%23software'>
                        <Button
                          colorScheme='twitter'
                          leftIcon={<FaTwitter />}
                          me='10px'>
                          <Text>Tweet</Text>
                        </Button>
                      </Link>
                      <Link
                        isExternal='true'
                        href='https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.datqbox.com%2Fproduct%2Fdatqbox-pos
'>
                        <Button
                          colorScheme='facebook'
                          leftIcon={<FaFacebook />}>
                          <Text>Share</Text>
                        </Button>
                      </Link>
                    </Flex>
                  </LightMode>
                </Box>
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
Configurator.propTypes = {
  secondary: PropTypes.bool,
  isOpen: PropTypes.bool, // Cambiar de func a bool
  onClose: PropTypes.func,
  fixed: PropTypes.bool,
}

