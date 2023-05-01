// ReusableComponents.js
import React from "react";
import { Flex, Text,FormLabel as ChakraFormLabel, Textarea as ChakraTextarea,  Input as ChakraInput, Select as ChakraSelect } from "@chakra-ui/react";
import GradientBorder from "components/GradientBorder/GradientBorder";

export const StyledTextarea = ({ ...props }) => (
  <ChakraTextarea
    size="md" 
    w={{ base: "100%", md: "346px" }} 
    h="46px" 
    placeholderTextColor="black" 
    focusBorderColor="black" 
    borderColor="gray.300"
    bg="white"
    color="black"
    {...props}
  />
);

export const StyledInput = ({ ...props }) => (
  <ChakraInput 
    size="md" 
    w={{ base: "100%", md: "546px" }} 
    h="46px" 
    placeholderTextColor="black" 
    focusBorderColor="black" 
    borderColor="gray.300"
    bg="white"
    color="black"
    {...props} 
  />
);


export const StyledFormLabel = ({ ...props }) => (
    <ChakraFormLabel ms='4px' fontSize='md' color='white' {...props} fontWeight='normal' />
  );
  

export const StyledSelect = ({ ...props }) => (
  <ChakraSelect size="lg"
   w={{ base: "100%", md: "346px" }}
   h="46px"
   placeholderTextColor="black" 
   focusBorderColor="black" 
   borderColor="gray.300"
   bg="white"
   color="black" {...props} />
);

export const GradientInput = ({ children, ...props }) => (
  <GradientBorder mb="24px" h="50px" w={{ base: "100%", lg: "fit-content" }} borderRadius="15px"  {...props}>
    {children}
  </GradientBorder>
);

export const BaseFlex = ({ children, ...props }) => (
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
    {...props}
  >
    {children}
  </Flex>
);

export const StyledText = ({ children, ...props }) => (
  <Text mb="36px" ms="4px" color="gray.400" fontWeight="bold" fontSize="18px" {...props}>
    {children}
  </Text>
);

