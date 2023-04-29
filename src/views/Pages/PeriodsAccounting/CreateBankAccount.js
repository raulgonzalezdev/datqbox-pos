// CreateBankAccount.js
import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,

} from '@chakra-ui/react';
import GradientBorder from "components/GradientBorder/GradientBorder";
function CreateBankAccount() {
  const textColor = 'gray.400';
  const titleColor = 'white';

  return (
    <GradientBorder p="2px">
      <Flex
        background="transparent"
        borderRadius="30px"
        direction="column"
        p="40px"
        minW={{ base: 'unset', md: '430px', xl: '450px' }}
        w="100%"
        mx={{ base: '0px' }}
        bg={{
          base: 'rgb(19,21,56)',
        }}
      >
        {/* Número de cuenta */}
        <Flex alignItems="flex-start">
          <FormControl>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal" color="white">
              Número de cuenta
            </FormLabel>
            <GradientBorder
              mb="24px"
              h="50px"
              w={{ base: '100%', lg: 'fit-content' }}
              borderRadius="20px"
            >
              <Input
                color={titleColor}
                bg={{
                  base: 'rgb(19,21,54)',
                }}
                border="transparent"
                borderRadius="20px"
                fontSize="sm"
                size="lg"
                w={{ base: '100%', md: '346px' }}
                maxW="100%"
                h="46px"
                type="text"
                placeholder="ej. BE15001559627230"
              />
            </GradientBorder>
          </FormControl>
        </Flex>

        {/* Banco */}
        <Flex alignItems="flex-start">
          <FormControl>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal" color="white">
              Banco
            </FormLabel>
            <GradientBorder
              mb="24px"
              h="50px"
              w={{ base: "100%", lg: "fit-content" }}
              borderRadius="20px"
            >
              <Input
                color={titleColor}
                bg={{
                  base: 'rgb(19,21,54)',
                }}
                border="transparent"
                borderRadius="20px"
                fontSize="sm"
                size="lg"
                w={{ base: '100%', md: '346px' }}
                maxW="100%"
                h="46px"
                type="text"
                placeholder="ej. Banco de América"
              />
            </GradientBorder>
          </FormControl>
        </Flex>

        {/* Código de identificación bancaria */}
        <Flex alignItems="flex-start">
          <FormControl>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal" color="white">
              Código de identificación bancaria
            </FormLabel>
            <GradientBorder
              mb="24px"
              h="50px"
              w={{ base: '100%', lg: 'fit-content' }}
              borderRadius="20px"
            >
              <Input
                color={titleColor}
                bg={{
                  base: 'rgb(19,21,54)',
                }}
                border="transparent"
                borderRadius="20px"
                fontSize="sm"
                size="lg"
                w={{ base: '100%', md: '346px' }}
                maxW="100%"
                h="46px"
                type="text"
                placeholder="ej. GEBABEBB"
              />
            </GradientBorder>
          </FormControl>
        </Flex>
      </Flex>
    </GradientBorder>
  );
}

export default CreateBankAccount;

