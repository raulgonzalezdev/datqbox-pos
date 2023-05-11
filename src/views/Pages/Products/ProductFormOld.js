import React, { useState, useEffect } from "react";
import {
  FormControl,
  Flex,
  Button,
  Box,
  useToast,
  VStack,
  HStack,
  Image,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import {
  StyledInput,
  GradientInput,
  StyledFormLabel,
  StyledTextarea,
  BaseFlex,
  StyledText,
  StyledSelect,
} from "components/ReusableComponents/ReusableComponents";

import GradientBorder from "components/GradientBorder/GradientBorder";
import {
  useGetProduct,
  useCreateProduct,
  useUpdateProduct,
  useUploadProductImage,
  useDeleteProductImage,
} from "graphql/products/crudProducts";

// import { useGetColors, useCreateColor } from "graphql/color/crudColor";
import {
  useGetCategories,
  useCreateCategory,
} from "graphql/category/crudCategory";

// import { useGetSizes, useCreateSize } from "graphql/sizes/crudSizes";

function ProductForm({ productId, onSuccess }) {
  const [formState, setFormState] = useState({});

  const toast = useToast();
  const { data, loading, error } = useGetProduct(productId);
  const [createProduct, { loading: createLoading }] = useCreateProduct();
  const [updateProduct, { loading: updateLoading }] = useUpdateProduct();
  const [selectedImage, setSelectedImage] = useState(null);
//   const { data: colorsData } = useGetColors();
//   const { data: sizesData } = useGetSizes();
  const { data: categoriesData } = useGetCategories();
//   const [uploadProductImage, { loading: uploadLoading }] =
//     useUploadProductImage();
//   const [deleteProductImage, { loading: deleteLoading }] =
//     useDeleteProductImage();

  if ((productId && loading) || createLoading || updateLoading)
    return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  useEffect(() => {
    if (data && data.product) {
      setFormState({
        ...data.product,
        categoryId: data.product.category.id,
      });
    } else if (!productId) {
      setFormState({
        id: null,
        
          name: "",
          vendor: "",
          description: "",
          image: "https://via.placeholder.com/450",
          price: 0,
          categoryId: 0,
          inventory: 0,
          rentalType: "",
          featured: false,
          newarrivals: false,
          taxRate: 0,
          // images: [],
          // reviews: [],
          // orderItems: [],
          // colors: [],
          // sizes: [],
     
      });
    }
  }, [data, productId]);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adjustedFormState = {
      ...formState,
      price: parseFloat(formState.price),
      inventory: parseInt(formState.inventory),
      taxRate: parseFloat(formState.taxRate),
      categoryId: formState.categoryId,
    };
  
    try {
      if (productId) {
        await updateProduct({
          variables: { id: productId, input: adjustedFormState },
        });
        toast({
          title: "Producto actualizado",
          description: "El producto ha sido actualizado exitosamente",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        await createProduct({ variables: { input: adjustedFormState } });
        toast({
          title: "Producto creado",
          description: "El producto ha sido creado exitosamente",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      onSuccess();
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  

//   const handleChangeImage = async () => {
//     if (selectedImage) {
//       try {
//         const { data } = await uploadProductImage({
//           variables: { file: selectedImage },
//         });
//         await updateProduct({
//           variables: {
//             id: productId,
//             input: { ...formState, image: data.uploadProductImage.url },
//           },
//         });
//         toast({
//           title: "Foto principal cambiada",
//           description:
//             "La foto principal del producto ha sido cambiada exitosamente.",
//           status: "success",
//           duration: 3000,
//           isClosable: true,
//         });
//       } catch (err) {
//         toast({
//           title: "Error",
//           description: err.message,
//           status: "error",
//           duration: 3000,
//           isClosable: true,
//         });
//       }
//     }
//   };

//   const handleDeleteImage = async () => {
//     try {
//       await deleteProductImage({ variables: { id: productId } });
//       await updateProduct({
//         variables: { id: productId, input: { ...formState, image: "" } },
//       });
//       toast({
//         title: "Foto principal eliminada",
//         description:
//           "La foto principal del producto ha sido eliminada exitosamente.",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: err.message,
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    const category = categoriesData.categories.find(
      (cat) => cat.id === categoryId
    );
    setFormState({
      ...formState,
      categoryId: categoryId,
      category: {
        id: categoryId,
        name: category.name,
      },
    });
  };

  const handleRentalTypeChange = (event) => {
    const rentalType = event.target.value;
    setFormState({
      ...formState,
      rentalType: rentalType.toLowerCase(),
    });
  };

//   const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
//     useDropzone({
//       accept: "image/*",
//       maxSize: 5 * 1024 * 1024,
//       onDrop: (acceptedFiles) => {
//         if (acceptedFiles.length) {
//           setSelectedImage(acceptedFiles[0]);
//         }
//       },
//     });

  return (
    <GradientBorder p="2px">
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <BaseFlex>
          <HStack width="100%" justifyContent="space-between">
            <StyledText fontSize="20px">
              {productId ? "Editar Producto" : "Añadir Producto"}
            </StyledText>
            <Box mt={4}>
              <Button type="submit" colorScheme="teal" size="md">
                {productId ? "Actualizar Producto" : "Añadir Producto"}
              </Button>
            </Box>
          </HStack>

          <FormControl>
            <form onSubmit={handleSubmit}>
              <Flex direction={["column", "row"]} gap={4}>
                <GradientBorder p="2px">
                  <BaseFlex>
                    <VStack>
                      <StyledText fontSize="16px" alignSelf="flex-start">
                        {productId
                          ? "Actualizar la Foto del producto"
                          : "Ingrese Foto del producto"}
                      </StyledText>
                      <Box style={{ borderRadius: "8px" }}>
                        <Image
                          src={
                            formState.image || "https://via.placeholder.com/450"
                          }
                          objectFit="cover"
                          style={{ borderRadius: "8px" }}
                        />
                      </Box>
                      <HStack>
                        <Button
                          colorScheme="teal"
                          isLoading={uploadLoading}
                          onClick={handleChangeImage}
                          disabled={!selectedImage}
                        >
                          Cambiar Foto
                        </Button>
                        {productId ? (
                          <Button
                            colorScheme="red"
                            isLoading={deleteLoading}
                            onClick={handleDeleteImage}
                            disabled={!formState.image}
                          >
                            Borrar Foto
                          </Button>
                        ) : (
                          <Button
                            colorScheme="messenger"
                            isLoading={deleteLoading}
                            onClick={handleChangeImage}
                            disabled={!selectedImage}
                          >
                            Seleccionar Foto
                          </Button>
                        )}
                      </HStack>
                    </VStack>
                  </BaseFlex>
                </GradientBorder>

                <Flex
                  wrap="wrap"
                  maxW={{
                    base: "100%",
                    md: "calc(100% - 150px)",
                    xl: "calc(100% - 150px)",
                  }}
                  mr={{ base: "0", md: "8", xl: "16" }}
                >
                  <StyledText fontSize="16px" alignSelf="flex-start">
                    {productId
                      ? "Actualizar la información del producto"
                      : "Ingrese la información del nuevo producto"}
                  </StyledText>
                  <Box
                    w={{ base: "100%", md: "50%" }}
                    pr={{ base: "0", md: "4" }}
                  >
                    <StyledFormLabel>Nombre del producto</StyledFormLabel>
                    <StyledInput
                      name="name"
                      value={formState.name || ""}
                      onChange={handleChange}
                      placeholder="Ingrese el nombre del producto"
                    />
                  </Box>
                  <Box
                    w={{ base: "100%", md: "50%" }}
                    pr={{ base: "0", md: "4" }}
                  >
                    <StyledFormLabel>Proveedor</StyledFormLabel>
                    <StyledInput
                      name="vendor"
                      value={formState.vendor || ""}
                      onChange={handleChange}
                      placeholder="Ingrese el proveedor del producto"
                    />
                  </Box>
                  <Box
                    w={{ base: "100%", md: "50%" }}
                    pr={{ base: "0", md: "4" }}
                  >
                    <StyledFormLabel>Descripcion</StyledFormLabel>
                    <StyledTextarea
                      name="description"
                      value={formState.description || ""}
                      onChange={handleChange}
                      placeholder="Ingrese el descripcion detallada del producto"
                    />
                  </Box>
                  <Box
                    w={{ base: "100%", md: "50%" }}
                    pr={{ base: "0", md: "4" }}
                  >
                    <StyledFormLabel>Precio</StyledFormLabel>
                    <StyledInput
                      name="price"
                      type="number"
                      value={formState.price || ""}
                      onChange={handleChange}
                      placeholder="Ingrese el precio del producto"
                    />
                  </Box>
                  <Box
                    w={{ base: "100%", md: "50%" }}
                    pr={{ base: "0", md: "4" }}
                  >
                    <StyledFormLabel>Inventario</StyledFormLabel>
                    <StyledInput
                      name="inventory"
                      type="number"
                      value={formState.inventory || ""}
                      onChange={handleChange}
                      placeholder="Ingrese el inventario del producto"
                    />
                  </Box>
                  <Box
                    w={{ base: "100%", md: "50%" }}
                    pr={{ base: "0", md: "4" }}
                  >
                    <StyledFormLabel>Categoría</StyledFormLabel>
                    <StyledSelect
                      value={formState.categoryId}
                      onChange={handleCategoryChange}
                    >
                      <option value={0}>Selecciona una categoría</option>
                      {categoriesData?.categories?.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </StyledSelect>
                  </Box>

                  <Box
                    w={{ base: "100%", md: "50%" }}
                    pr={{ base: "0", md: "4" }}
                  >
                    <StyledFormLabel>Rental Type</StyledFormLabel>
                    <StyledSelect
                      value={formState.rentalType}
                      onChange={handleRentalTypeChange}
                    >
                      <option value="sale">Venta</option>
                      <option value="rent">Alquiler</option>
                    </StyledSelect>
                  </Box>
                  <Box
                    w={{ base: "100%", md: "50%" }}
                    pr={{ base: "0", md: "4" }}
                  >
                    <StyledFormLabel>Featured</StyledFormLabel>
                    <Checkbox
                      checked={formState.featured}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          featured: e.target.checked,
                        })
                      }
                    />
                  </Box>
                  <Box
                    w={{ base: "100%", md: "50%" }}
                    pr={{ base: "0", md: "4" }}
                  >
                    <StyledFormLabel>New Arrivals</StyledFormLabel>
                    <Checkbox
                      checked={formState.newarrivals}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          newarrivals: e.target.checked,
                        })
                      }
                    />
                  </Box>
                  <Box
                    w={{ base: "100%", md: "50%" }}
                    pr={{ base: "0", md: "4" }}
                  >
                    <StyledFormLabel>Tax Rate</StyledFormLabel>
                    <StyledInput
                      name="taxRate"
                      type="number"
                      value={formState.taxRate || ""}
                      onChange={handleChange}
                      placeholder="Ingrese la tasa de impuesto del producto"
                    />
                  </Box>
                   {/* <Box
                    w={{ base: "100%", md: "50%" }}
                    pr={{ base: "0", md: "4" }}
                  >
                    <StyledFormLabel>Colores</StyledFormLabel>
                    <CheckboxGroup>
                      {colorsData?.colors?.map((color) => (
                        <Checkbox key={color.id} value={color.id}>
                          {color.name}
                        </Checkbox>
                      ))}
                    </CheckboxGroup>
                  </Box>
                  <Box
                    w={{ base: "100%", md: "50%" }}
                    pr={{ base: "0", md: "4" }}
                  >
                    <StyledFormLabel>Tamaños</StyledFormLabel>
                    <CheckboxGroup>
                      {sizesData?.sizes?.map((size) => (
                        <Checkbox key={size.id} value={size.id}>
                          {size.name}
                        </Checkbox>
                      ))}
                    </CheckboxGroup>
                  </Box> */}
                </Flex>
              </Flex>

              {/* <GradientBorder p="2px">
                <BaseFlex>
                  <StyledText fontSize="16px" alignSelf="flex-start">
                    Images Adicionales del Producto
                  </StyledText>
                  <VStack>
                    <Box
                      {...getRootProps()}
                      style={{
                        width: "90%",
                        height: "150px",
                        border: "1px dashed gray",
                        borderRadius: "8px",
                        backgroundColor: "white",
                        cursor: "pointer",
                      }}
                    >
                      <StyledInput
                        placeholder="Arrastre y suelte aquí las imágenes relacionadas"
                        {...getInputProps()}
                        style={{
                          textAlign: "center",
                          color: "white",
                        }}
                      />
                    </Box>
                  </VStack>
                </BaseFlex>
              </GradientBorder>  */}

              <Box mt={4}>
                <Button type="submit" colorScheme="teal" size="md">
                  {productId ? "Actualizar Producto" : "Añadir Producto"}
                </Button>
              </Box>
            </form>
          </FormControl>
        </BaseFlex>
      </Flex>
    </GradientBorder>
  );
}

export default ProductForm;
