import React, { useEffect, useReducer } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Image,
  HStack,
  SimpleGrid,
  Card,
  CardBody as ChakraCardBody,
  Flex,
  Box,
} from '@chakra-ui/react'
import { StyledFormLabel, StyledInput } from 'components/ReusableComponents/ReusableComponents'

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PAYMENT_METHOD':
      return {
        ...state,
        [action.payload.id]: action.payload.value,
      }
    case 'RESET':
      return {}
    default:
      throw new Error()
  }
}

const PaymentMethodCard = ({ method, selected, dispatch, selectedPaymentMethods, change }) => {
  const handleChange = (e) => {
    //const value = selected ? undefined : 0
    let value = parseFloat(e.target.value)
    if (value > 0) {
      value = value.toFixed(2)
    } else {
      if (isNaN(value)) {
        value = 0
      } else {
        value = value.toFixed(2)
        if (change < 0) {
          value = selected ? undefined : -change
        } else if (change > 0) {
          value = selected ? undefined : 0
        } else {
          value = selected ? undefined : 0
        }
      }
    }
    dispatch({ type: 'SET_PAYMENT_METHOD', payload: { id: method.id, value: parseFloat(value) } })
  }

  return (
    <Card borderWidth="3px" borderRadius="md" p={2} borderColor="green.500" bg="rgb(19, 21, 56)" cursor="pointer" onClick={handleChange}>
      <ChakraCardBody>
        <HStack spacing={3}>
          <Image src={method.image} alt={method.name} h={24} w={24} mr={2} />
          <StyledFormLabel fontWeight="bold">
            {method.name} {method.description}
          </StyledFormLabel>
        </HStack>
        {/* {selected && ( */}
        <StyledInput
          type="number"
          value={selectedPaymentMethods[method.id] || 0}
          onChange={(e) => dispatch({ type: 'SET_PAYMENT_METHOD', payload: { id: method.id, value: parseFloat(e.target.value) } })}
          textAlign="right"
        />
        {/* )} */}
      </ChakraCardBody>
    </Card>
  )
}

const PaymentModal = ({ isOpen, onClose, onPaymentMethodSelect, total, paymentMethodsData, paymentMethodsLoading, paymentMethodsError }) => {
  const [selectedPaymentMethods, dispatch] = useReducer(reducer, {})

  useEffect(() => {
    if (isOpen) {
      dispatch({ type: 'RESET' })
    }
  }, [isOpen])

  const handleSubmit = () => {
    const selectedMethods = Object.entries(selectedPaymentMethods).filter(([, amount]) => amount !== undefined)
    onPaymentMethodSelect(selectedMethods)
    onClose()
  }

  const totalPayment = Object.values(selectedPaymentMethods).reduce((sum, amount) => sum + (parseFloat(amount) || 0), 0)
  const change = (totalPayment - total).toFixed(2)
  const canSubmit = change >= 0

  if (paymentMethodsLoading || paymentMethodsError || !paymentMethodsData) {
    return <p>Loading...</p>
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent maxW="60rem" color="white" bg="rgb(19, 21, 56)" borderRadius="15px">
        <ModalHeader>Añadir método de pago</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justify="space-between" mb={2}>
            <StyledFormLabel fontSize="24px" fontWeight="bold">
              Change: ${change}
            </StyledFormLabel>
            <StyledFormLabel fontSize="24px" fontWeight="bold">
              Total a Pagar: ${total.toFixed(2)}
            </StyledFormLabel>
          </Flex>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 3, xl: 3, '2xl': 3 }} spacing={4}>
            {paymentMethodsData.map((method) => (
              <PaymentMethodCard
                key={method.id}
                method={method}
                selected={selectedPaymentMethods[method.id] !== undefined}
                dispatch={dispatch}
                selectedPaymentMethods={selectedPaymentMethods}
                change={change}
              />
            ))}
          </SimpleGrid>
        </ModalBody>
        <ModalFooter>
          <Flex justify="space-between" mb={2}>
            <Box>
              <Button colorScheme="blue" onClick={handleSubmit} isDisabled={!canSubmit} mr={20}>
                Submit
              </Button>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Cerrar
              </Button>
            </Box>
            <StyledFormLabel fontSize="24px" fontWeight="bold">Total Pagado: ${totalPayment.toFixed(2)}</StyledFormLabel>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PaymentModal
