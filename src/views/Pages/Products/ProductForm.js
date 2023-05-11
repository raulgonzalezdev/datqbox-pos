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
  StyledNumberInput,
} from "components/ReusableComponents/ReusableComponents";

import GradientBorder from "components/GradientBorder/GradientBorder";
import {
  useGetProduct,
  useCreateProduct,
  useUpdateProduct,
} from "graphql/products/crudProducts";

import { useGetCategories } from "graphql/category/crudCategory";

function ProductForm({ productId, onCancel, onSuccess }) {
  const [formState, setFormState] = useState({});

  const toast = useToast();
  const { data, loading, error } = useGetProduct(productId);
  const [createProduct, { loading: createLoading }] = useCreateProduct();
  const [updateProduct, { loading: updateLoading }] = useUpdateProduct();

  const { data: categoriesData } = useGetCategories();

  useEffect(() => {
    if (data && data.product) {
      setFormState({
        ...data.product,
        categoryId: data.product.category.id,
        featured: data.product.featured === undefined ? true : data.product.featured,
        newarrivals: data.product.newarrivals === undefined ? true : data.product.newarrivals,
          
      });
    } else if (!productId) {
      setFormState({
        id: null,
        name: "",
        vendor: "",
        description: "",
        image: "",
        price: 0,
        inventory: 0,
        rentalType: "",
        featured: true,
        newarrivals: true,
        taxRate: 0,
        categoryId: "",
      });
    }
  }, [data, productId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleNumberInputChange = (fieldName, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: Number(value),
    }));
  };
  
  

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adjustedFormState = {
      name: formState.name,
      vendor: formState.vendor,
      sku: formState.sku,
      description: formState.description,
      image: formState.image,
      price: parseFloat(formState.price),
      inventory: parseFloat(formState.inventory),
      rentalType: formState.rentalType,
      featured: formState.featured,
      newarrivals: formState.newarrivals,
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

  if ((productId && loading) || createLoading || updateLoading)
    return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <GradientBorder p="2px">
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <BaseFlex>
          <HStack width="100%" justifyContent="space-between">
            <StyledText fontSize="20px">
              {productId ? "Editar Producto" : "Añadir Producto"}
            </StyledText>
            <Box mt={4}>
              <Button onClick={onCancel} colorScheme="teal" size="md">
               Retornar
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
                    </VStack>
                  </BaseFlex>
                </GradientBorder>
                

               
                {/* <StyledText fontSize="16px" alignSelf="flex-start">
                    {productId
                      ? "Actualizar la información del producto"
                      : "Ingrese la información del nuevo producto"}
                  </StyledText> */}
                 
                <Flex
                  wrap="wrap"
                  maxW={{
                    base: "100%",
                    md: "calc(100% - 150px)",
                    xl: "calc(100% - 150px)",
                  }}
                  mr={{ base: "0", md: "8", xl: "16" }}
                >
              
              <Box
                    w={{ base: "100%", md: "50%" }}
                    pr={{ base: "0", md: "4" }}
                  >
                    <StyledFormLabel>Codigo Sku producto</StyledFormLabel>
                    <StyledInput
                      name="sku"
                      value={formState.sku || ""}
                      onChange={handleChange}
                      placeholder="Ingrese el sku del producto"
                    />
                  </Box>
                
                 
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
                    <StyledNumberInput
                      name="price"
                      type="number"
                      value={formState.price || 0}
                    
                      onChange={(value) => handleNumberInputChange('price', value)}
                      placeholder="Ingrese el precio del producto"
                    />
                  </Box>
                  <Box
                    w={{ base: "100%", md: "50%" }}
                    pr={{ base: "0", md: "4" }}
                  >
                    <StyledFormLabel>Inventario</StyledFormLabel>
                    <StyledNumberInput
                      name="inventory"
                      type="number"
                      
                      value={formState.inventory || 0}
                      onChange={(value) => handleNumberInputChange('inventory', value)}
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
                    <StyledFormLabel>Url Imagen</StyledFormLabel>
                    <StyledInput
                      name="image"
                      value={formState.image || ""}
                      type="url"
                      onChange={handleChange}
                      placeholder="Ingrese el url d la imagen"
                    />
                  </Box>
                  <Box
                    w={{ base: "100%", md: "50%" }}
                    pr={{ base: "0", md: "4" }}
                  >
                    <StyledFormLabel>Tax Rate</StyledFormLabel>
                    <StyledNumberInput
                      name="taxRate"
                      type="number"
                     
                      value={formState.taxRate || 0}
                     
                      onChange={(value) => handleNumberInputChange('taxRate', value)}
                      placeholder="Ingrese la tasa de impuesto del producto"
                    />
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
                </Flex>
              </Flex>

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
