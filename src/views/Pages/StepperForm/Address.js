// Address.js
import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,
} from "@chakra-ui/react";

import GradientBorder from "components/GradientBorder/GradientBorder";

function Address() {
  const textColor = "gray.400";
  const titleColor = "white";

  return (
    <GradientBorder p="2px">
      <Flex
        background="transparent"
        borderRadius="30px"
        direction="column"
        p="40px"
        minW={{ base: "unset", md: "430px", xl: "450px" }}
        w="100%"
        mx={{ base: "0px" }}
        bg={{
          base: "rgb(19,21,56)",
        }}
      // alignItems="center" 
      >
        <Flex alignItems="flex-start"  >
          <Text
            mb="36px"
            ms="4px"
            color={textColor}
            fontWeight="bold"
            fontSize="18px"
          >
            Address Details
          </Text>
        </Flex>
        <Flex alignItems="center"  >
          <Text
            mb="36px"
            ms="4px"
            color={textColor}
            fontWeight="bold"
            fontSize="14px"
          >
            Enter your address information
          </Text>
        </Flex>

        <Flex alignItems="flex-start"  >
          <FormControl >

            <FormLabel ms="4px" fontSize="sm" fontWeight="normal" color="white">
              City
            </FormLabel>
            <GradientBorder
              mb='24px'
              h='50px'
              w={{ base: "100%", lg: "fit-content" }}
              borderRadius='20px'>
              <Input
                color={titleColor}
                bg={{
                  base: "rgb(19,21,54)",
                }}
                border='transparent'
                borderRadius='20px'
                fontSize='sm'
                size='lg'
                w={{ base: "100%", md: "346px" }}
                maxW='100%'
                h='46px'
                type='text'
                placeholder='eg. Venezuela'
              />
            </GradientBorder>
          </FormControl>
        </Flex>

        {/* Agrega los demás campos siguiendo este formato */}
      </Flex>
    </GradientBorder>
  );
}

export default Address;
