import React, { useState } from "react";
import {
  Box,
  Image,
  VStack,
  HStack,
  Stack,
  Input,
  useBreakpointValue,
  Flex,
  Grid,
  SimpleGrid,
  Center,
  Button,
} from "@chakra-ui/react";

import {
  BaseFlex,
  StyledText,
  StyledInput,
  StyledFormLabel,
} from "components/ReusableComponents/ReusableComponents";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import { useDropzone } from "react-dropzone";
import { useRemoveProductImages,  useRemoveImage } from "graphql/image/crudImage"

function ProductImage({ formState, productId, onImagesSelect, handleChange }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [removeImage] = useRemoveImage();
  const [removeProductImages] = useRemoveProductImages()
  const [imageId, setImageId] = useState();
  const allImages = [...selectedImages, ...(formState.images || [])];



  const handleRemoveImage = async (imageId) => {
    const { data } = await removeImage({ variables: { id: imageId }});
    console.log(data.removeImage); // Should be true
  };

  const handleRemoveProductImages = async (productId) => {
    const { data } = await removeProductImages({ variables: { productId }});
    console.log(data.removeProductImages); // Should be true
  };



  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      accept: "image/*",
      maxSize: 5 * 1024 * 1024,
      onDrop: (acceptedFiles) => {
        const images = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        setSelectedImages(images);
        onImagesSelect(images);
      },
    });

    const {
      getRootProps: getMainRootProps,
      getInputProps: getMainInputProps,
      acceptedFiles: mainAcceptedFiles,
    } = useDropzone({
      accept: "image/*",
      maxSize: 5 * 1024 * 1024,
      maxFiles: 1, // Asegúrate de aceptar solo una imagen
      onDrop: (acceptedFiles) => {
        setMainImage(
          Object.assign(acceptedFiles[0], {
            preview: URL.createObjectURL(acceptedFiles[0]),
          })
        );
      },
    });
    

  const imageSize = useBreakpointValue({ base: "150px", md: "250px" });

  const thumbs = allImages.map((file) => {
    const isExistingImage = Boolean(file.id); // Verifica si la imagen ya existe (es decir, si tiene un id)
  
    return (
      <Box
        key={file.id || file.name} // Usa el id de la imagen si está disponible, o el nombre del archivo si no lo está
        p={2}
        boxShadow="lg"
        borderRadius="8px"
        width="120px"
        height="120px"
        overflow="hidden"
        cursor="pointer"
        border={selectedImage === (file.id || file.name) ? '2px solid white' : null}
        onClick={() => {
          setImageId(file.id || file.name); // Selecciona la imagen
          setSelectedImage(file.id || file.name); 
        }}
        onDoubleClick={() => {
          // Muestra la imagen en tamaño grande
          // Si la imagen ya existe, usa su url. Si no, usa la vista previa del archivo
          setMainImage({ ...file, preview: isExistingImage ? file.url : file.preview });
        }}
      >
        <img
          src={isExistingImage ? file.url : file.preview} // Usa el url de la imagen si está disponible, o la vista previa del archivo si no lo está
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      </Box>
    );
  });

  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
      <VStack>
        <StyledText
          fontSize={{ base: "14px", md: "16px" }}
          alignSelf="flex-start"
        >
          {productId ? "Foto Principal" : "Foto Principal"}
        </StyledText>
        <Box mt="-0.5" style={{ borderRadius: "8px" }}>
          <Image
            src={mainImage?.preview || formState.image || "https://via.placeholder.com/350"}
            objectFit="cover"
            boxSize={imageSize}
            style={{ borderRadius: "8px" }}
          />
        </Box>
        <Box>
        <Box
          {...getMainRootProps()}
          border="1px dashed gray"
          borderRadius="8px"
          backgroundColor="transparent"
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StyledFormLabel cursor="pointer">Url Imagen</StyledFormLabel>
          <input
            placeholder="Arrastre y suelte aquí las imágenes"
            {...getMainInputProps()}
            style={{ display: "none" }}
          />
          <StyledInput
            name="image"
            value={formState.image ||  ""}
            type="url"
            onChange={handleChange}
            
            // onChange={handleChange}
            placeholder="Ingrese el url de la imagen"
          />
          </Box>
        </Box>
      </VStack>
      <Card width={{ base: "auto", md: "100%" }}>
        <CardBody width={{ base: "auto", md: "100%" }} h="100%">
          <Flex flexDirection="column">
            <StyledText
              fontSize={{ base: "14px", md: "16px" }}
              mb={{ base: "2", md: "0" }}
            >
              Images Adicionales
            </StyledText>

            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 2, lg: 2, xl: 2, "2xl": 2 }}
              spacing={4}
            >
              {thumbs}
            </SimpleGrid>
          </Flex>
        </CardBody>
        <Box
          {...getRootProps()}
          border="1px dashed gray"
          borderRadius="8px"
          backgroundColor="transparent"
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Input
            placeholder="Cargar Imagenes..."
            textAlign="center"
            color="white"
            border="none"
            cursor="pointer"
          />

          <input
            placeholder="Arrastre y suelte aquí las imágenes"
            {...getInputProps()}
            style={{ display: "none" }}
          />
        </Box>
        <Box mt={4}>
            <HStack width="100%" justifyContent="space-between">
                <Button
                  
                  colorScheme="teal"
                  size={{ base: "sm", md: "md" }}
                  // onClick={handleRemoveImage(imageId)}
                >
                  Remove
                </Button>

              
                <Button
                  type="submit"
                  colorScheme="teal"
                  size={{ base: "sm", md: "md" }}
                  // onClick={handleRemoveProductImages(productId)}
                >
                  Remove All
                </Button>
                </HStack>
             
              </Box>
      </Card>
    </Grid>
  );
}

export default ProductImage;
