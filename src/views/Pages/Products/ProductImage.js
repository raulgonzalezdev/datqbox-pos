import React, { useState, useEffect } from "react";
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
  Button,
} from "@chakra-ui/react";

import {
  BaseFlex,
  StyledText,
  StyledInput,
  StyledFormLabel,
} from "components/ReusableComponents/ReusableComponents";
import ImagesUpload from "components/ImagesUpload/ImagesUpload";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import DeleteAlert from "components/DeleteAlert/DeleteAlert";
import { useDropzone } from "react-dropzone";
import { REMOVE_PRODUCT_IMAGES, REMOVE_IMAGE } from "graphql/image/crudImage";

function ProductImage({ formState, productId, onImageSelect, handleChange }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [imageId, setImageId] = useState();
  const allImages = [...selectedImages, ...(formState.images || [])];

  const [showImagesUpload, setShowImagesUpload] = useState(true);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isDeletingAllImages, setIsDeletingAllImages] = useState(false);

  const handleRemoveImage = (imageId) => {
    setImageId(imageId);
    setIsDeletingAllImages(false);
    setIsDeleteAlertOpen(true);
  };

  const handleRemoveProductImages = (productId) => {
    setIsDeletingAllImages(true);
    setIsDeleteAlertOpen(true);
  };

  

  const handleConfirmDelete = async () => {
    try {
      setIsDeleteAlertOpen(true);
      if (isDeletingAllImages) {
        setSelectedImages([]);
        formState.images = [];
      } else {
        setSelectedImages(
          selectedImages.filter((image) => image.id !== imageId)
        );
        const newImages = [...formState.images];
        const index = newImages.findIndex((image) => image.id === imageId);

        if (index !== -1) {
          newImages.splice(index, 1);
        }
        formState.images = newImages;
      }
    } catch (error) {
      console.error("Refetch error:", error);
    } finally {
      setIsDeleteAlertOpen(false);
      setImageId(null);
    }
  };

  const onImageSelects = (image) => {
    const newImages = image.map((images) => ({ url: images, preview: images }));
    setSelectedImages([...newImages]);
    onImageSelect(newImages);
  };

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    fileRejections
  } = useDropzone({
    accept: ["image/jpeg", "image/png", "image/gif"],
    maxSize: 5 * 1024 * 1024,
    onDrop: (acceptedFiles) => {
      const images = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setSelectedImages(images);
      onImageSelect(images);
    },
  });

  const {
    getRootProps: getMainRootProps,
    getInputProps: getMainInputProps,
    acceptedFiles: mainAcceptedFiles,
    fileRejections: mainFileRejections
  } = useDropzone({
    accept: ["image/jpeg", "image/png", "image/gif"],
    maxSize: 5 * 1024 * 1024,
    maxFiles: 1, // Asegúrate de aceptar solo una imagen
    onDrop: (acceptedFiles) => {
      const mainImage = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
      setMainImage(mainImage);
      // Construir la URL de la imagen con el nombre del archivo
      const filename = mainImage.name;
      const imageUrl = `http://localhost:4000/uploads/${filename}`;
  
      // Actualizar el campo image en tu estado de formulario con la URL de la imagen
      formState.image = imageUrl;
    },
  });
  
  useEffect(() => {
    mainFileRejections.forEach(({ file, errors }) => {
      errors.forEach((error) => {
        switch (error.code) {
          case 'file-invalid-type':
            console.error(`'${file.path}' no es un tipo de archivo válido.`);
            break;
          case 'file-too-large':
            console.error(`'${file.path}' es demasiado grande.`);
            break;
          default:
            console.error(`Error desconocido: ${error.code}`);
            break;
        }
      });
    });
  }, [mainFileRejections]);
  

  useEffect(() => {
    fileRejections.forEach(({ file, errors }) => {
      errors.forEach((error) => {
        switch (error.code) {
          case 'file-invalid-type':
            console.error(`'${file.path}' no es un tipo de archivo válido.`);
            break;
          case 'file-too-large':
            console.error(`'${file.path}' es demasiado grande.`);
            break;
          default:
            console.error(`Error desconocido: ${error.code}`);
            break;
        }
      });
    });
  }, [fileRejections]);

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
        border={
          selectedImage === (file.id || file.name) ? "2px solid white" : null
        }
        onClick={() => {
          setImageId(file.id || file.name); // Selecciona la imagen
          setSelectedImage(file.id || file.name);
        }}
        onDoubleClick={() => {
          const imageUrl = isExistingImage ? file.url : file.preview;

          setMainImage({
            ...file,
            preview: imageUrl,
          });

          // Crear un evento falso para pasar a handleChange
          const fakeEvent = {
            target: {
              name: "image",
              value: imageUrl,
            },
          };

          // Actualiza el campo 'image' en el estado del formulario
          handleChange(fakeEvent);
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
            src={
              mainImage?.preview ||
              formState.image ||
              "https://via.placeholder.com/350"
            }
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
              value={formState.image || ""}
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

        <Flex direction="row" justify="space-between">
          {showImagesUpload && <ImagesUpload onImageSelect={onImageSelects} />}
          <DeleteAlert
            modelName="Image"
            isOpen={isDeleteAlertOpen}
            onClose={() => setIsDeleteAlertOpen(false)}
            mutation={
              isDeletingAllImages ? REMOVE_PRODUCT_IMAGES : REMOVE_IMAGE
            }
            id={isDeletingAllImages ? null : imageId}
            productId={isDeletingAllImages ? { productId } : null}
            handleConfirm={handleConfirmDelete}
          />
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
              placeholder="Upload Images..."
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
        </Flex>

        <Box mt={4}>
          <HStack width="100%" justifyContent="space-between">
            <Button
              colorScheme="teal"
              size={{ base: "sm", md: "md" }}
              onClick={() => handleRemoveImage(imageId)}
            >
              Remove
            </Button>

            <Button
              colorScheme="teal"
              size={{ base: "sm", md: "md" }}
              onClick={() => handleRemoveProductImages(productId)}
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
