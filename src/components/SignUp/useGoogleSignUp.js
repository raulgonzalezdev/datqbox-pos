import React, { useEffect, useState, useContext } from 'react'
import { CredentialResponse, useGoogleLogin, GoogleLogin } from '@react-oauth/google'
import { useAddUser, useSignIn } from 'graphql/users/crudUser'
import { useHistory } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import decodeJwt from 'components/decodeJwt/decodeJwt'

import { AuthContext } from '../../AuthContext'


const GoogleSignUp = () => {
  const [addUser, { loading }] = useAddUser()
  const [signIn, { data,  error }] = useSignIn()
  const history = useHistory()
  const toast = useToast()
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
 
  
  function handleError() {
    console.log('Login failed')
  }


  useEffect(() => {
    if (isAuthenticated) {
      history.push('/pos') 
  
      
   
    }
  }, [isAuthenticated, history])

  async function handleSuccess(credentialResponse: CredentialResponse) {
    if (credentialResponse.credential) {
      const { payload } = decodeJwt(credentialResponse.credential)
      //console.log('payload credential', payload)
  
      const response = await signIn({ variables: { email: payload.email, password: payload.sub } })
  
      if (response && response.data && response.data.loginUser && response.data.loginUser.user) {
        // El usuario ya existe, realizar el inicio de sesión
        const { token, user } = response.data.loginUser
        localStorage.setItem('authToken', token)
        localStorage.setItem('user', JSON.stringify(user))

        setIsAuthenticated(true)
  
        toast({
          title: 'Inicio de sesión exitoso',
          description: `¡Bienvenido de nuevo, ${response.data.loginUser.user.firstName}!`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        
        if (user.role==='ADMIN')  {
          history.push('/admin/dashboard')
        } else {
          history.push('/pos')
        }


      } else {
        // El usuario no existe, crear un nuevo usuario
        const newUser = {
          firstName: payload.given_name,
          lastName: payload.family_name,
          email: payload.email,
          password: payload.sub,
          avatar: payload.picture,
          role: 'USER',
          is_superuser: false,
          is_active: true,
        }
  
        const addUserResponse = await addUser({ variables: { input: newUser } })
  
        if (addUserResponse && addUserResponse.data && addUserResponse.data.addUser && addUserResponse.data.addUser.user) {
          const { token, user } = addUserResponse.data.addUser
          localStorage.setItem('authToken', token)
          localStorage.setItem('user', JSON.stringify(user))
          setIsAuthenticated(true)
          

  
          toast({
            title: 'Usuario creado con éxito',
            description: `El usuario ${addUserResponse.data.addUser.user.firstName} fue creado exitosamente.`,
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
  
          history.push('/pos')
        } else {
          toast({
            title: 'Error al crear el usuario',
            description: 'Ocurrió un error al crear el usuario.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
      }
    }
  }
  
  



  return (
   
    

    <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          shape='rectangular'
          logo_alignment='center'
          width='120px'
          type='icon'
          theme='filled_blue'
          useOneTap
        />
   
  )
}

export default GoogleSignUp
