import { useAddUser } from 'graphql/users/crudUser'
import { useHistory } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'


const useFormSubmit = () => {
  const [addUser, { loading }] = useAddUser()
  const history = useHistory()
  const toast = useToast()

  const handleSubmit = async (name, email, password) => {
    try {
        const newUser = {
          firstName: name,
          lastName: '.',
          email: email,
          password: password,
          avatar: '',
          role: 'USER',
          is_superuser: false,
          is_active: true,
        }
  
        const response = await addUser({ variables: { input: newUser } })
        console.log('User created:', response.data.addUser)
  
        toast({
          title: 'Usuario creado con éxito',
          description: `El usuario ${response.data.addUser.user.firstName} fue creado exitosamente.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
  
        history.push('/auth/signin')
      } catch (err) {
        console.error('Error creating user:', err)
  
        toast({
          title: 'Error creando usuario',
          description: 'El email puede estar en uso o el password no cumple con la longitud requerida',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
  }

  return { handleSubmit, loading }
}

export default useFormSubmit
