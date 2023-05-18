// ReusableComponents.js
import React from "react";
import {
  Flex,
  Text,
  FormLabel as ChakraFormLabel,
  Textarea as ChakraTextarea,
  Input as ChakraInput,
  Select as ChakraSelect,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
} from "@chakra-ui/react";
import GradientBorder from "components/GradientBorder/GradientBorder";

export const StyledTextarea = ({ ...props }) => (
  <ChakraTextarea
    size="md"
    // w={{ base: "100%", md: "346px" }}
    h="46px"
    sx={{ "::placeholder": { color: "black" } }}
    focusBorderColor="black"
    borderColor="gray.300"
    bg="white"
    color="black"
    {...props}
  />
);

export const StyledNumberInput = ({ ...props }) => (
  <NumberInput
    size="md"
    // w={{ base: "100%", md: "546px" }}
    h="40px"
    sx={{ "::placeholder": { color: "black" } }}
    focusBorderColor="black"
    borderColor="gray.300"
    bg="white"
    color="black"
    borderRadius="md"
    defaultValue={0}
    precision={2}
    step={0.1}
    // format={(value) => `${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
    {...props}
  >
     <NumberInputField style={{ textAlign: 'right' }} />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>
);

export const StyledInput = ({ ...props }) => (
  <ChakraInput
    size="md"
    // w={{ base: "100%", md: "546px" }}
    h="46px"
    sx={{ "::placeholder": { color: "black" } }}
    focusBorderColor="black"
    borderColor="gray.300"
    bg="white"
    color="black"
    {...props}
  />
);

export const StyledFormLabel = ({ ...props }) => (
  <ChakraFormLabel
    ms="4px"
    fontSize="md"
    color="white"
    pt={-2} // reduce padding-top if needed
    pb={-2} // reduce padding-bottom if needed
    {...props}
    fontWeight="normal"
  />
);

export const StyledSelect = ({ ...props }) => (
  <ChakraSelect
    size="lg"
    //  w={{ base: "100%", md: "346px" }}
    h="46px"
    sx={{ "::placeholder": { color: "black" } }}
    focusBorderColor="black"
    borderColor="gray.300"
    bg="white"
    color="black"
    {...props}
  />
);

export const GradientInput = ({ children, ...props }) => (
  <GradientBorder
    mb="24px"
    h="50px"
    w={{ base: "100%", lg: "fit-content" }}
    borderRadius="15px"
    {...props}
  >
    {children}
  </GradientBorder>
);

export const BaseFlex = ({ children, ...props }) => (
  <Flex
    background="transparent"
    bg={{
      base: "rgb(19,21,56)",
    }}
    borderRadius="30px"
    direction="column"
    p="40px"
    minW={{ base: "unset", md: "430px", xl: "450px" }}
    w="100%"
    mx={{ base: "0px" }}
    
    {...props}
  >
    {children}
  </Flex>
);

export const StyledText = ({ children, ...props }) => (
  <Text
    mb="36px"
    ms="4px"
    color="gray.400"
    fontWeight="bold"
    fontSize="18px"
    {...props}
  >
    {children}
  </Text>
);
