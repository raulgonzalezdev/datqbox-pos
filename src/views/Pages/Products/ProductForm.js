import React, { useState, useEffect } from "react";
import {
  FormControl,
  Flex,
  Button,
  Box,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import {
  BaseFlex,
  StyledText,
} from "components/ReusableComponents/ReusableComponents";

import GradientBorder from "components/GradientBorder/GradientBorder";
import {
  useGetProduct,
  useCreateProduct,
  useUpdateProduct,
} from "graphql/products/crudProducts";

import {
  useAddProductColor,
  useRemoveProductColor,

} from "graphql/productcolor/crudProductColor";

import {
  useAddProductSize,
  useRemoveProductSize,

} from "graphql/productsize/crudProductSize";

import ProductInfo from "./ProductInfo";
import ProductImage from "./ProductImage";
import ProductSizeColor from "./ProductSizeColor";

function ProductForm({ productId, onCancel, onSuccess }) {
  const [formState, setFormState] = useState({});

  const toast = useToast();
  const { data, loading, error } = useGetProduct(productId);
  const [createProduct, { loading: createLoading }] = useCreateProduct();
  const [updateProduct, { loading: updateLoading }] = useUpdateProduct();

  // Agrega los estados para tamaños y colores
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

   // Agrega las mutaciones
   const [addProductSize] = useAddProductSize();
   const [removeProductSize] = useRemoveProductSize();
   const [addProductColor] = useAddProductColor();
   const [removeProductColor] = useRemoveProductColor();

  useEffect(() => {
    if (data && data.product) {
      setFormState({
        ...data.product,
        categoryId: data.product.category.id,
        featured:
          data.product.featured === undefined ? true : data.product.featured,
        newarrivals:
          data.product.newarrivals === undefined
            ? true
            : data.product.newarrivals,
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

  const handleSelectedSizes = (sizeId) => {
    console.log('Tamaño seleccionado:', sizeId);
    setFormState((prevState) => ({
      ...prevState,
      sizes: [...prevState.sizes, sizeId],
    }));
  };
  
  const handleSelectedColors = (colorId) => {
    console.log('Color seleccionado:', colorId);
    setFormState((prevState) => ({
      ...prevState,
      colors: [...prevState.colors, colorId],
    }));
  };
  


  const handleSubmit = async (e) => {

  console.log('Tamaños seleccionados al enviar:', formState.sizes);
  console.log('Colores seleccionados al enviar:', formState.colors);
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
    let newProductId = productId;
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
        const newProduct=  await createProduct({ variables: { input: adjustedFormState } });
        newProductId = newProduct.data.createProduct.id;

        toast({
          title: "Producto creado",
          description: "El producto ha sido creado exitosamente",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
     
      for (let sizeId of formState.sizes ) {
        console.log(newProductId, sizeId)
        try {
          await addProductSize({ variables: { productId: newProductId, sizeId: sizeId } });
        } catch (err) {
          console.error(err);
        }
      }
      
      for (let colorId of formState.colors) {
        console.log(newProductId, colorId)
        try {
          await addProductColor({ variables: { productId: newProductId, colorId: colorId } });
        } catch (err) {
          console.error(err);
        }
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

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
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
                    <ProductImage formState={formState} productId={productId} />
                  </BaseFlex>
                </GradientBorder>

                <Flex
                  wrap="wrap"
                  direction={["column", "row"]} // Añadir la propiedad "direction" aquí
               
                  maxW={{
                    base: "100%",
                    md: "calc(100% - 150px)",
                    xl: "calc(100% - 150px)",
                  }}
                  mr={{ base: "0", md: "8", xl: "16" }}
                >
                  <ProductInfo
                    formState={formState}
                    handleChange={handleChange}
                    handleNumberInputChange={handleNumberInputChange}
                    handleRentalTypeChange={handleRentalTypeChange}
                    handleCheckboxChange={handleCheckboxChange}
                  />
                
                  <ProductSizeColor
                    formState={formState}
                    handleChange={handleChange}
                    handleCheckboxChange={handleCheckboxChange}
                    handleSelectedSizes={handleSelectedSizes}
                    handleSelectedColors={handleSelectedColors}
                  />
                 
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
