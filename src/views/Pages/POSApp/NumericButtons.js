import React, { useState } from 'react'
import { SimpleGrid, Button, IconButton, Flex, Grid, useDisclosure } from '@chakra-ui/react'
import { FaBackspace } from 'react-icons/fa'
import { FcSalesPerformance, FcAcceptDatabase } from 'react-icons/fc'
import { GrReturn } from 'react-icons/gr'

import PaymentModal from './PaymentModal'

const NumericButtons = ({
  handleNumericButtonClick,
  handleEnterClick,
  selectedOperation,
  setSelectedOperation,
  total,
  paymentMethodsLoading,
  paymentMethods,
  paymentMethodsError,
  handleCreateInvoice,
  setSelectedPayMethods,
}) => {
  const selectedButtonStyle = {
    border: '2px solid',
    borderColor: 'green.500',
    backgroundColor: 'green.500',
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleOpenPaymentModal = () => {
    if (total > 0) {
      onOpen()
    }
  }

  const handleClosePaymentModal = () => {
    onClose()
  }

  const [selectedPayMethods, setselectedPayMethods] = useState([])

  const handlePaymentMethodSelect = (selectedMethods) => {
 
    setselectedPayMethods(selectedMethods)
  }

  const handleCantBtnClick = () => {
    setSelectedOperation(selectedOperation === 'Cant' ? null : 'Cant')
  }

  const handlePrecioBtnClick = () => {
    setSelectedOperation(selectedOperation === 'Precio' ? null : 'Precio')
  }

  const handleDescBtnClick = () => {
    setSelectedOperation(selectedOperation === '% Desc' ? null : '% Desc')
  }

  const handleDecimalButtonClick = () => {
    handleNumericButtonClick('.')
  }

  const handleBackspaceButtonClick = () => {
    handleNumericButtonClick('backspace')
  }

  const handleSubmitButtonClick = () => {
    if (selectedPayMethods.length > 0) {
      
     // setSelectedPayMethods(selectedPayMethods)
      handleCreateInvoice(selectedPayMethods, total)
    }
    
  }

 

  return (
    <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} my="26px" gap="18px">
      <Flex flexDirection={{ base: 'column', md: 'column' }}>
        <Button
          label="Metodos de Pago"
          leftIcon={<FcSalesPerformance size={40} />}
          width={{ base: 'auto', md: '75%' }}
          height="100%"
          mb={4}
          colorScheme="whiteAlpha"
          onClick={handleOpenPaymentModal}
          mr={4}
          //variant='outline'
        >
          Metodos de Pago
        </Button>

        <Button
          leftIcon={<FcAcceptDatabase size={30} />}
          width={{ base: 'auto', md: '75%' }}
          height="100%"
          mb={4}
          colorScheme="whiteAlpha"
          onClick={handleSubmitButtonClick}
        >
          Grabar Operacion
        </Button>
      </Flex>

      <Flex>
        <SimpleGrid columns={4} spacing={1} ml={4}>
          <Button colorScheme="whiteAlpha" onClick={() => handleNumericButtonClick(1)}>
            1
          </Button>
          <Button colorScheme="whiteAlpha" onClick={() => handleNumericButtonClick(2)}>
            2
          </Button>
          <Button colorScheme="whiteAlpha" onClick={() => handleNumericButtonClick(3)}>
            3
          </Button>
          <Button colorScheme="whiteAlpha" style={selectedOperation === 'Cant' ? selectedButtonStyle : {}} onClick={handleCantBtnClick}>
            Cant
          </Button>
          <Button colorScheme="whiteAlpha" onClick={() => handleNumericButtonClick(4)}>
            4
          </Button>
          <Button colorScheme="whiteAlpha" onClick={() => handleNumericButtonClick(5)}>
            5
          </Button>
          <Button colorScheme="whiteAlpha" onClick={() => handleNumericButtonClick(6)}>
            6
          </Button>
          <Button colorScheme="whiteAlpha" style={selectedOperation === '% Desc' ? selectedButtonStyle : {}} onClick={handleDescBtnClick}>
            % Desc
          </Button>
          <Button colorScheme="whiteAlpha" onClick={() => handleNumericButtonClick(7)}>
            7
          </Button>
          <Button colorScheme="whiteAlpha" onClick={() => handleNumericButtonClick(8)}>
            8
          </Button>
          <Button colorScheme="whiteAlpha" onClick={() => handleNumericButtonClick(9)}>
            9
          </Button>
          <Button colorScheme="whiteAlpha" style={selectedOperation === 'Precio' ? selectedButtonStyle : {}} onClick={handlePrecioBtnClick}>
            Precio
          </Button>
          <Button colorScheme="whiteAlpha" onClick={() => handleNumericButtonClick(0)}>
            0
          </Button>
          <Button colorScheme="whiteAlpha" onClick={handleDecimalButtonClick}>
            ,
          </Button>
          <Button colorScheme="whiteAlpha" onClick={handleBackspaceButtonClick}>
            <FaBackspace />
            Back
          </Button>
          <Button colorScheme="whiteAlpha" onClick={handleEnterClick}>
            <GrReturn />
            Enter
          </Button>
        </SimpleGrid>
      </Flex>
      <PaymentModal
        isOpen={isOpen}
        onClose={onClose}
        onPaymentMethodSelect={handlePaymentMethodSelect}
        total={total}
        paymentMethodsLoading={paymentMethodsLoading}
        paymentMethodsData={paymentMethods}
        paymentMethodsError={paymentMethodsError}
        selectedPayMethods={selectedPayMethods}
      />
    </Grid>
  )
}

export default NumericButtons
