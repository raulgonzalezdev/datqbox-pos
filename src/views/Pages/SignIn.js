import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Flex, Button, FormControl, FormLabel, Heading, Input, Link, Switch, Text, DarkMode, useToast, HStack, Icon, useDisclosure } from '@chakra-ui/react'
import signInImage from 'assets/img/signInImage.png'
import AuthFooter from 'components/Footer/AuthFooter'
import GradientBorder from 'components/GradientBorder/GradientBorder'
import { useSignIn } from 'graphql/users/crudUser'
import GoogleSignUp from 'components/SignUp/useGoogleSignUp'
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa'
import { ForgotPasswordForm } from 'components/ForgotPasswordForm/ForgotPasswordForm'

import { AuthContext } from '../../AuthContext'

function SignIn() {
  const titleColor = 'white'
  const textColor = 'gray.400'

  const [signIn, { data, loading, error }] = useSignIn()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [rememberMe, setRememberMe] = React.useState(false)
  const history = useHistory()
  const [userDat, setUserDat] = useState(null)
  const { isAuthenticated, setIsAuthenticated, userData, setUserData } = useContext(AuthContext)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast()
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked)
  }

  

  const handleOpenModal = () => {
    onOpen()
  }

  const handleCloseModal = () => {
    onClose()
  }


  useEffect(() => {
    if (isAuthenticated) {
     console.log(userDat)
      if (userDat.role ==='ADMIN') {
        history.push('/admin/dashboard')
      } else {
      const currentLocation = history.location.pathname
      if (currentLocation !== '/pos') {
        history.push('/pos')
      }
    }
  }
  }, [isAuthenticated, history])
  

  useEffect(() => {
   // console.log('userDataaaaaaa', userDat)
    setUserData(userDat)
  }, [userDat])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await signIn({ variables: { email, password } })

      if (response && response.data && response.data.loginUser) {
        const { token, user } = response.data.loginUser
     
       
        localStorage.setItem('authToken', token)
        localStorage.setItem('user', JSON.stringify(user)) 
        setUserDat(user)
        // console.log('userData',userData)
      

        setIsAuthenticated(true)

        // Aquí agregamos un mensaje de toast para el éxito
        toast({
          title: 'Inicio de sesión exitoso.',
          description: 'Ha iniciado sesión con éxito.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Error durante el inicio de sesión.',
          description: 'No se recibieron datos. Usuario o clave invalidos',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    } catch (err) {
      toast({
        title: 'Error durante el inicio de sesión.',
        description: `Mensaje: ${err.message}. Nombre: ${err.name}. Errores GraphQL: ${err.graphQLErrors.map((e) => e.message).join(', ')}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Flex position="relative">
      <Flex
        minH="100vh"
        h={{ base: '120vh', lg: 'fit-content' }}
        w="100%"
        maxW="1044px"
        mx="auto"
        pt={{ sm: '100px', md: '0px' }}
        flexDirection="column"
        me={{ base: 'auto', lg: '50px', xl: 'auto' }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: 'none' }}
          mx={{ base: 'auto', lg: 'unset' }}
          ms={{ base: 'auto', lg: 'auto' }}
          w={{ base: '100%', md: '50%', lg: '450px' }}
          px="50px"
        >
          <Flex
            direction="column"
            w="100%"
            // background='transparent'
            mt={{ base: '50px', md: '150px', lg: '160px', xl: '245px' }}
            mb={{ base: '60px', lg: '95px' }}
          >
            <HStack spacing="15px" justify="center" mb="22px">
              <GradientBorder borderRadius="15px">
                <Flex
                  _hover={{ filter: 'brightness(120%)' }}
                  transition="all .25s ease"
                  cursor="pointer"
                  justify="center"
                  align="center"
                  bg="rgb(19,21,54)"
                  w="71px"
                  h="71px"
                  borderRadius="15px"
                >
                  <Link href="#">
                    <Icon color={titleColor} as={FaFacebook} w="30px" h="30px" _hover={{ filter: 'brightness(120%)' }} />
                  </Link>
                </Flex>
              </GradientBorder>
              <GradientBorder borderRadius="15px">
                <Flex
                  _hover={{ filter: 'brightness(120%)' }}
                  transition="all .25s ease"
                  cursor="pointer"
                  justify="center"
                  align="center"
                  bg="rgb(19,21,54)"
                  w="71px"
                  h="71px"
                  borderRadius="15px"
                >
                  <Link href="#">
                    <Icon color={titleColor} as={FaApple} w="30px" h="30px" _hover={{ filter: 'brightness(120%)' }} />
                  </Link>
                </Flex>
              </GradientBorder>
              <GradientBorder borderRadius="15px">
                <Flex
                  _hover={{ filter: 'brightness(120%)' }}
                  transition="all .25s ease"
                  cursor="pointer"
                  justify="center"
                  align="center"
                  bg="rgb(19,21,54)"
                  w="71px"
                  h="71px"
                  borderRadius="15px"
                  id="google-button"
                  // onClick={() => renderGoogleSignUpButton(name, email, password)}
                >
                  <GoogleSignUp />
                </Flex>
              </GradientBorder>
            </HStack>

            <Heading color={titleColor} fontSize="32px" mb="10px">
              Nice to see you!
            </Heading>
            <Text mb="36px" ms="4px" color={textColor} fontWeight="bold" fontSize="14px">
              Enter your email and password to sign in
            </Text>
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal" color="white">
                Email
              </FormLabel>
              <GradientBorder mb="24px" w={{ base: '100%', lg: 'fit-content' }} borderRadius="20px">
                <Input
                  color="white"
                  bg="rgb(19,21,54)"
                  border="transparent"
                  borderRadius="20px"
                  fontSize="sm"
                  size="lg"
                  w={{ base: '100%', md: '346px' }}
                  maxW="100%"
                  h="46px"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Your email adress"
                />
              </GradientBorder>
            </FormControl>
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal" color="white">
                Password
              </FormLabel>
              <GradientBorder mb="24px" w={{ base: '100%', lg: 'fit-content' }} borderRadius="20px">
                <Input
                  color="white"
                  bg="rgb(19,21,54)"
                  border="transparent"
                  borderRadius="20px"
                  fontSize="sm"
                  size="lg"
                  w={{ base: '100%', md: '346px' }}
                  maxW="100%"
                  value={password}
                  onChange={handlePasswordChange}
                  type="password"
                  placeholder="Your password"
                />
              </GradientBorder>
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <DarkMode>
                <Switch checked={rememberMe} onChange={handleRememberMeChange} id="remember-login" colorScheme="brand" me="10px" />
              </DarkMode>
              <FormLabel htmlFor="remember-login" mb="0" ms="1" fontWeight="normal" color="white">
                Remember me
              </FormLabel>
            </FormControl>
            <Button variant="brand" fontSize="10px" type="submit" w="100%" maxW="350px" h="45" mb="20px" mt="20px" onClick={handleSubmit}>
              SIGN IN
            </Button>

            <Flex flexDirection="column" justifyContent="center" alignItems="center" maxW="100%" mt="0px">
              {/* <Text color={textColor} fontWeight="medium">
                Don't have an account?
                <Link color={titleColor} as="span" ms="5px" fontWeight="bold">
                  Sign Up
                </Link>
              </Text> */}
              <Text color={textColor} fontWeight="medium">
                Fargot your Password?
                <Link color={titleColor} ms="5px" fontWeight="bold" onClick={handleOpenModal}>
                  Click Here
                </Link>
              </Text>
              {isOpen && <ForgotPasswordForm  isOpen={onOpen} onClose={() => handleCloseModal()} Email={email}  />}
            </Flex>
          </Flex>
        </Flex>
        <Box w={{ base: '335px', md: '450px' }} mx={{ base: 'auto', lg: 'unset' }} ms={{ base: 'auto', lg: 'auto' }} mb="80px">
          <AuthFooter />
        </Box>
        <Box
          display={{ base: 'none', lg: 'block' }}
          overflowX="hidden"
          h="100%"
          maxW={{ md: '50vw', lg: '50vw' }}
          minH="100vh"
          w="960px"
          position="absolute"
          left="0px"
        >
          <Box
            bgImage={signInImage}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text textAlign="center" color="white" letterSpacing="8px" fontSize="20px" fontWeight="500">
              DATQBOX - POS
            </Text>
            <Text
              textAlign="center"
              color="transparent"
              letterSpacing="8px"
              fontSize="36px"
              fontWeight="bold"
              bgClip="text !important"
              bg="linear-gradient(94.56deg, #FFFFFF 79.99%, #21242F 102.65%)"
            >
              Tecnología avanzada para la administración moderna
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  )
}

export default SignIn
