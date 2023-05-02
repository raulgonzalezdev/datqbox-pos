// ImageSection.js
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import signUpImage from "assets/img/signUpImage.png";

function ImageSection() {
  return (
    <Box
      display={{ base: "none", lg: "block" }}
      overflowX="hidden"
      h="1300px"
      maxW={{ md: "50vw", lg: "48vw" }}
      w="1000px"
      position="absolute"
      left="0px"
    >
      <Box
        bgImage={signUpImage}
        w="100%"
        h="1300px"
        bgSize="cover"
        bgPosition="50%"
        position="absolute"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        position="absolute"
      >
        <Text
          textAlign="center"
          color="white"
          letterSpacing="8px"
          fontSize="20px"
          fontWeight="500"
        >
          DATQBOX  -  POS
        </Text>
        <Text
          textAlign="center"
          color="transparent"
          letterSpacing="8px"
          fontSize="36px"
          fontWeight="bold"
          bgClip="text !important"
          bg="linear-gradient(94.56deg, #FFFFFF 79.99%, #21242F 102.65%)"
        >
          Tecnología avanzada para la administración moderna
        </Text>
      </Box>
    </Box>
  );
}

export default ImageSection;
