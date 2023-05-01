import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,

  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Circle,

  Text,
} from "@chakra-ui/react";
import GradientBorder from "components/GradientBorder/GradientBorder";

function StepperForm({ steps, components, onSubmit }) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

 

  return (
    <Flex position="relative" overflow={{ lg: "hidden" }}>
      <Flex
        flexDirection="column"
        h={{ sm: "initial", md: "unset" }}
        w={{ base: "90%" }}
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        pt={{ sm: "100px", md: "0px" }}
        me={{ base: "auto", lg: "50px", xl: "auto" }}
        mt="70px"
      >
        <GradientBorder>
          <Box>
            <Tabs variant="unstyled" index={activeStep} onChange={(index) => setActiveStep(index)}>
              <TabList>
                <Flex justifyContent="space-between">
                  {steps.map((step, index) => (
                    <Box key={index} position="relative">
                      <Flex
                        flexDirection="column"
                        alignItems="center"
                        onClick={() => setActiveStep(index)}
                        width="200px"
                        cursor="pointer"
                      >
                        <Circle
                          size="4"
                          bg={index <= activeStep ? "rgb(19,21,56)" : "white"}
                          borderColor={
                            index <= activeStep ? "rgb(19,21,56)" : "gray.200"
                          }
                          borderWidth="1px"
                          zIndex="1"
                        />
                        <Text
                          color={index <= activeStep ? "rgb(19,21,56)" : "white"}
                          fontWeight="bold"
                        >
                          {step.title}
                        </Text>
                      </Flex>
                      {index < steps.length - 1 && (
                        <Box
                          height="4px"
                          width="190px"
                          bg={index < activeStep ? "rgb(19,21,56)" : "white"}
                          borderRadius="full" // Añade esta propiedad para redondear las puntas de la línea
                          position="absolute"
                          left="calc(50% + 10px)" // Cambia este valor a 10px para igualar el espacio en ambos lados
                          top="calc(50% - 14px)" // Cambia este valor a 14px para ajustar el espacio entre la línea y el círculo
                          zIndex="0"
                        />
                      )}
                    </Box>
                  ))}
                </Flex>
              </TabList>
              <TabPanels>
                {components.map((Component, index) => (
                  <TabPanel key={index}>
                    <Component />
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>

            <Box mb="8">
              <Flex justifyContent="space-between" width="100%">
                {activeStep > 0 && (
                  <Button maxW='200px' fontSize='14px' variant='brand'  bg="gray.300" _hover={{ bg: "gray.400" }} onClick={handlePrev} mr="8">
                    Prev
                  </Button>
                )}
                {activeStep < steps.length - 1 ? (
                  <Button maxW='200px' fontSize='14px' variant='brand' onClick={handleNext}>Next</Button>
                ) : (
                  <Button maxW='200px' fontSize='14px' variant='brand' onClick={() => onSubmit()}>Submit</Button>
                )}
              </Flex>
            </Box>
          </Box>
        </GradientBorder>
      </Flex>
    </Flex>

  );
}

export default StepperForm;
