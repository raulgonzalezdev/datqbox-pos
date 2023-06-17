import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Input } from '@chakra-ui/react'
import { FORGOT_PASSWORD, RESET_PASSWORD } from 'graphql/users/crudUser'

export const ForgotPasswordForm = ({ isOpen, onOpen, onClose, Email }) => {
  const [email, setEmail] = useState(Email)
  const [forgotPassword, { loading, error }] = useMutation(FORGOT_PASSWORD)

  const handleSubmit = (e) => {
    e.preventDefault()
    forgotPassword({ variables: { email } })
    onClose()
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent maxW="60rem" color="white" bg="rgb(19, 21, 56)" borderRadius="15px">
          <ModalHeader>Forgot your password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Input type="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" type="submit" onClick={handleSubmit}>
              Reset Password
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export const ResetPasswordForm = ({ token }) => {
  const [password, setPassword] = useState('')
  const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSubmit = (e) => {
    e.preventDefault()
    resetPassword({ variables: { token, password } })
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <>
      <Button onClick={onOpen}>Reset Password</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reset Password</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" type="submit" onClick={handleSubmit}>
              Reset Password
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
