import React, { useState } from "react";
import {
  Box,
  Image,
  VStack,
  Stack,
  Input,
  useBreakpointValue,
  Flex,
  Center,
} from "@chakra-ui/react";

import GradientBorder from "components/GradientBorder/GradientBorder";
import {
  BaseFlex,
  StyledText,
  StyledInput,
} from "components/ReusableComponents/ReusableComponents";
import { useDropzone } from "react-dropzone";

function ProductImage({ formState, productId }) {
  const [selectedImages, setSelectedImages] = useState([]);

  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      accept: "image/*",
      maxSize: 5 * 1024 * 1024,
      onDrop: (acceptedFiles) => {
        setSelectedImages(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

  // Utiliza el hook useBreakpointValue para ajustar el tamaño de la imagen en diferentes breakpoints
  const imageSize = useBreakpointValue({ base: "150px", md: "350px" });

  const thumbs = selectedImages.map((file) => (
    <Box
      key={file.name}
      p={2} 
      boxShadow="lg"
      borderRadius="8px"
      width="150px"
      height="150px"
      overflow="hidden"
    >
      <img
        src={file.preview}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
    </Box>
  ));

  return (
    <VStack>
      <StyledText
        fontSize={{ base: "14px", md: "16px" }}
        alignSelf="flex-start"
      >
        {productId
          ? "Actualizar la Foto del producto"
          : "Ingrese Foto del producto"}
      </StyledText>
      <Box style={{ borderRadius: "8px" }}>
        <Image
          src={formState.image || "https://via.placeholder.com/350"}
          objectFit="cover"
          boxSize={imageSize}
          style={{ borderRadius: "8px" }}
        />
      </Box>

      <GradientBorder p={{ base: "1", md: "2" }}>
        <BaseFlex>
          <StyledText
            fontSize={{ base: "14px", md: "16px" }}
            mb={{ base: "2", md: "0" }}
          >
            Images Adicionales
          </StyledText>
          <Flex wrap="wrap" mt={4} spacing={4} align="center"> {/* Aquí usamos el componente Stack para asegurarnos de que haya un espaciado uniforme */}
      {thumbs}
    </Flex>

          <Box
            {...getRootProps()}
            w={{ base: "80%", md: "100%" }}
            h={{ base: "120px", md: "150px" }}
            border="1px dashed gray"
            borderRadius="8px"
            backgroundColor="transparent"
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Input
              placeholder="Arrastre y suelte aquí las imágenes"
              textAlign="center"
              color="white"
              border="none"
            />

            <input
              placeholder="Arrastre y suelte aquí las imágenes"
              {...getInputProps()}
              style={{ display: "none" }}
            />
          </Box>
        </BaseFlex>
      </GradientBorder>
    </VStack>
  );
}

export default ProductImage;
