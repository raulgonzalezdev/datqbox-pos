// SignUp.js
import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import TitleSection from "./TitleSectionIn";
import FormSection from "./FormSectionIn";
import ImageSection from "./ImageSectionIn";
import AuthFooter from "components/Footer/AuthFooter";

function SignUp() {
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
      >
        <TitleSection />
        <Flex flex="1" >
          <FormSection />
        </Flex>


        <Box
          w={{ base: "335px", md: "450px" }}
          mx={{ base: "auto", lg: "unset" }}
          ms={{ base: "auto", lg: "auto" }}
          mb="90px"
        >
          <AuthFooter />
        </Box>
        <ImageSection />
      </Flex>
    </Flex>
  );
}

export default SignUp;

