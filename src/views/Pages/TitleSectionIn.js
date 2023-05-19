// TitleSection.js
import React from 'react'
import { Text, Flex } from '@chakra-ui/react'

function TitleSection() {
  return (
    <Flex
      direction="column"
      textAlign="center"
      justifyContent="center"
      align="center"
      mt={{ base: '60px', md: '140px', lg: '200px' }}
      mb="50px"
    >

      <Text fontSize="4xl" lineHeight="39px" color="white" fontWeight="bold">
        Welcome!
      </Text>
      <Text
        fontSize="md"
        color="white"
        fontWeight="normal"
        mt="10px"
        w={{ base: '100%', md: '90%', lg: '90%', xl: '80%' }}
      >
        Use these awesome forms to login or create new account in your project
        for free.
      </Text>
    </Flex>
  )
}

export default TitleSection
