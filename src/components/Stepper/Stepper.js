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
    <Box
      justifyContent="space-between"
      flexDirection="column"
      mt="70px"
      sx={{ width: "100%", minHeight: { md: "650px", "2xl": "800px" } }}
      mx="1em"
    >
      <GradientBorder>
        <Box>
          <Tabs
            variant="unstyled"
            index={activeStep}
            onChange={(index) => setActiveStep(index)}
          >
            <TabList>
              <Flex justifyContent="space-between">
                {steps.map((step, index) => (
                  <Box key={index} position="relative">
                    <Flex
                      flexDirection="column"
                      alignItems="center"
                      onClick={() => setActiveStep(index)}
                      width={{ base: "240px", md: "255px", "2xl": "320px" }}
                      cursor="pointer"
                    >
                      <Circle
                        size="8"
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
                        width={{ base: "240px", md: "255px", "2xl": "320px" }}
                        bg={index < activeStep ? "rgb(19,21,56)" : "white"}
                        borderRadius="full"
                        position="absolute"
                        left="calc(50% + 10px)"
                        top="calc(50% - 14px)"
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

          <Box width= "100%" mb="8" ml={{ base: "1", md: "4", lg: "8" }}>
  <Flex justifyContent="space-between">
    {activeStep > 0 && (
      <Button maxW='200px' fontSize='14px' variant='brand'  bg="gray.300" _hover={{ bg: "gray.400" }} onClick={handlePrev} mr="8">
        Prev
      </Button>
    )}
    {activeStep < steps.length - 1 ? (
      <Button maxW='200px' fontSize='14px' variant='brand' onClick={handleNext} mr={{ base: "1", md: "10", lg: "10" ,xl: "10", "2xl": "10" }}>Next</Button>
    ) : (
      <Button maxW='200px' fontSize='14px' variant='brand' onClick={() => onSubmit()} mr={{ base: "1", md: "10", lg: "10" ,xl: "10", "2xl": "10"}}>Submit</Button>
    )}
  </Flex>
</Box>

        </Box>
      </GradientBorder>
    </Box>
  );
}

export default StepperForm;
