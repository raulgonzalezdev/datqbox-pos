// BankAccountsList.js
import React from 'react'
import { Box, Text, VStack, Button } from '@chakra-ui/react'

function BankAccountsList() {
  const accounts = [
    { name: 'PayPal', code: 'PPLXLULL' },
    { name: 'Stripe', code: 'Stripe' },
    { name: 'Wise', code: 'Wise' },
    // ... Agrega el resto de las cuentas
  ]

  return (
    <VStack spacing={4} alignItems="start">
      {accounts.map((account, index) => (
        <Box key={index}>
          <Text fontWeight="bold" color="white">
            {account.name}
          </Text>
          <Text color="gray.400">{account.code}</Text>
        </Box>
      ))}
      <Button colorScheme="brand" variant="outline" onClick={() => alert('Crear cuenta bancaria')}>
        ¿Su banco no está aquí? Crearlo
      </Button>
    </VStack>
  )
}

export default BankAccountsList
