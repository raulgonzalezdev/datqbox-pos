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
import { ThemeProvider } from '@mui/material/styles'
import taxTableTheme from 'theme/themeTableMUI'
import { DataGrid } from '@mui/x-data-grid'
import { StyledFormLabel, StyledInput } from 'components/ReusableComponents/ReusableComponents'

function TaxDetailsComponent({ taxDetails }) {
  const [rows, setRows] = React.useState([])

  const columns = [
    { field: 'taxRate', headerName: 'Tasa de impuesto', width: 200 },
    { field: 'subtotal', headerName: 'Subtotal', width: 200 },
    { field: 'tax', headerName: 'Impuesto', width: 200 },
    { field: 'total', headerName: 'Total', width: 200 },
  ]

  useEffect(() => {
    const newRows = Object.keys(taxDetails).map((taxRate, index) => ({
      id: index,
      taxRate: `${taxRate}%`,
      subtotal: taxDetails[taxRate].subtotal.toFixed(2),
      tax: taxDetails[taxRate].tax.toFixed(2),
      total: (taxDetails[taxRate].subtotal + taxDetails[taxRate].tax).toFixed(2),
    }))

    setRows(newRows)
  }, [])

  return (
    <Box>
      <ThemeProvider theme={taxTableTheme}>
        <DataGrid rows={rows} columns={columns} pageSize={5} autoHeight />
      </ThemeProvider>
      <Flex justify="space-between" direction="column"></Flex>
    </Box>
  )
}

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

const TotalModal = ({ isOpen, onClose, total, taxDetails }) => {
  const [selectedPaymentMethods, dispatch] = useReducer(reducer, {})

  useEffect(() => {
    if (isOpen) {
      dispatch({ type: 'RESET' })
    }
  }, [isOpen])

  const totalPayment = Object.values(selectedPaymentMethods).reduce((sum, amount) => sum + (parseFloat(amount) || 0), 0)

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent maxW="60rem" color="white" bg="rgb(19, 21, 56)" borderRadius="15px">
        <ModalHeader>Detalles Totales</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TaxDetailsComponent taxDetails={taxDetails} total={total} />
        </ModalBody>
        <ModalFooter>
          <Flex justify="space-between" mb={2}>
            <Box>
              <Button colorScheme="blue" mr={3} onClick={onClose} mr={6}>
                Cerrar
              </Button>
              </Box>
              <StyledFormLabel fontSize="24px" fontWeight="bold">
                Total a Pagar: ${total.toFixed(2)}
              </StyledFormLabel>
           
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default TotalModal
