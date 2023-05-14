import React, { useState, useEffect, useRef } from "react";
import {
  FormControl,
  Flex,
  Button,
  Box,
  useToast,
  HStack,
  Spinner,
  Grid,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import {
  BaseFlex,
  StyledText,
} from "components/ReusableComponents/ReusableComponents";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import { startUpload } from "redux/actions";

import GradientBorder from "components/GradientBorder/GradientBorder";
import {
  useGetProduct,
  useCreateProduct,
  useUpdateProduct,
} from "graphql/products/crudProducts";
import { Form, Formik } from "formik";
import { InputControl, SelectControl, SubmitButton } from "formik-chakra-ui";
import {
  useRemoveProductColor,
  useAddMultipleProductColors,
} from "graphql/productcolor/crudProductColor";

import {
  useRemoveProductSize,
  useAddMultipleProductSizes,
} from "graphql/productsize/crudProductSize";

import { useAddImages } from "graphql/image/crudImage"

import ProductInfo from "./ProductInfo";
import ProductImage from "./ProductImage";
import ProductColor from "./ProductColor";
import ProductSize from "./ProductSize";

function ProductForm({ productId, onCancel, onSuccess }) {
  const [formState, setFormState] = useState({
    sizes: [],
    colors: [],
  });

  const toast = useToast();
  const { data, loading, error } = useGetProduct(productId, {
    skip: !productId,
  });

  const [createProduct, { loading: createLoading }] = useCreateProduct();
  const [updateProduct, { loading: updateLoading }] = useUpdateProduct();
  const [addMultipleProductSizes] = useAddMultipleProductSizes();
  const [addMultipleProductColors] = useAddMultipleProductColors();

  const [addImages] = useAddImages();

  const [removeProductSize] = useRemoveProductSize();
  const [removeProductColor] = useRemoveProductColor();
  const dbSizes =
    formState?.productSizes?.map((sizeObj) => sizeObj.size.id) || [];
  const dbColors =
    formState?.productColors?.map((ColorObj) => ColorObj.color.id) || [];

  const [selectedSizes, setSelectedSizes] = useState(dbSizes);
  const [selectedColors, setSelectedColors] = useState(dbColors);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImagesSelect = (images) => {
    setSelectedImages(images);
  };

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

      setSelectedSizes(
        data.product.productSizes.map((productSize) => productSize.size.id)
      );
      setSelectedColors(
        data.product.productColors.map((productColor) => productColor.color.id)
      );
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
      setSelectedSizes([]);
      setSelectedColors([]);
    }
  }, [data, productId]);

  const handleNumberInputChange = (fieldName, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: Number(value),
    }));
  };

  const handleSelectedSizes = (sizeId, isChecked) => {
    setSelectedSizes((prevSizes) => {
      if (isChecked && !prevSizes.includes(sizeId)) {
        return [...prevSizes, sizeId];
      } else if (!isChecked && prevSizes.includes(sizeId)) {
        return prevSizes.filter((id) => id !== sizeId);
      } else {
        return prevSizes;
      }
    });
  };

  const handleAddImages = async (imagesInput, productId) => {
    const imagesWithProduct = imagesInput.map(image => ({
      ...image,
      product: { id: productId },
    }));
  
    const { data } = await addImages({ variables: { input: { images: imagesWithProduct }}});
    console.log(data.addImages); // Array of newly added images
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectedColors = (colorId) => {
    if (selectedColors.includes(colorId)) {
      setSelectedColors(selectedColors.filter((id) => id !== colorId));
    } else {
      setSelectedColors([...selectedColors, colorId]);
    }
  };

 

  const handleSubmit = async (e) => {
    // e.preventDefault();
    setIsLoading(true);

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
      } else {
        const newProduct = await createProduct({
          variables: { input: adjustedFormState },
        });
        newProductId = newProduct.data.createProduct.id;
      }

      const { dataC } = await removeProductColor({
        variables: {
          input: {
            ProductId: newProductId,
          },
        },
      });

      const { dataZ } = await removeProductSize({
        variables: {
          input: {
            ProductId: newProductId,
          },
        },
      });

      const productSizes = selectedSizes.map((sizeId) => ({
        ProductId: newProductId,
        SizeId: sizeId,
        stock: 10,
      }));

      const productColors = selectedColors.map((colorId) => ({
        ProductId: newProductId,
        ColorId: colorId,
      }));

      await addMultipleProductSizes({ variables: { input: productSizes } });
      await addMultipleProductColors({ variables: { input: productColors } });
  
      console.log('selectImages', selectedImages, newProductId)
      
      handleAddImages(selectedImages, newProductId)
      const files = selectedImages.map(({ preview, path }) => {
        return new File([preview], path);
      });
      
      dispatch(startUpload(files));

      if (productId) {
        toast({
          title: "Producto actualizado",
          description: "El producto ha sido actualizado exitosamente",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Producto creado",
          description: "El producto ha sido creado exitosamente",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }

      setTimeout(() => {
        onSuccess();
      }, 3000);
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsLoading(false);
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
    <>
      {isLoading ? (
        <Spinner /> // Muestra el spinner si isLoading es true
      ) : (
        <>
          

          <Formik initialValues={formState} onSubmit={handleSubmit}>
           
            <Form>
              <Grid
                templateColumns={{ sm: "1fr", md: "2fr 1fr", lg: "1fr 1fr" }}
                my="26px"
                gap="18px"
                marginLeft="10"
                marginRight="10"
                marginTop="55"
              >
              <Box>
            
              <StyledText fontSize={{ base: "16px", md: "20px" }}>
                {productId ? "Editar Producto" : "Añadir Producto"}
              </StyledText>
           
            </Box>
            <Box mt={4}>
            <HStack width="100%" justifyContent="space-between">
                <Button
                  onClick={onCancel}
                  colorScheme="teal"
                  size={{ base: "sm", md: "md" }}
                >
                  Retornar
                </Button>

              
                <Button
                  type="submit"
                  colorScheme="teal"
                  size={{ base: "sm", md: "md" }}
                >
                  Submit
                </Button>
                </HStack>
             
              </Box>

         
                <Card width={{ base: "auto", md: "100%" }}>
                  <CardBody width={{ base: "auto", md: "100%" }} h="100%">
                    <ProductInfo
                      formState={formState}
                      handleChange={handleChange}
                      setFormState={setFormState}
                      handleNumberInputChange={handleNumberInputChange}
                      handleRentalTypeChange={handleRentalTypeChange}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                  </CardBody>
                  <Flex
                    direction={{ base: "column", md: "row" }}
                    justifyContent="space-between"
                    mt="5"
                  >
                    <ProductColor
                      formState={formState}
                      handleChange={handleChange}
                      handleCheckboxChange={handleCheckboxChange}
                      selectedColors={selectedColors}
                      handleSelectedColors={handleSelectedColors}
                    />
                    <ProductSize
                      formState={formState}
                      handleChange={handleChange}
                      selectedSizes={selectedSizes}
                      handleSelectedSizes={handleSelectedSizes}
                    />
                  </Flex>
                </Card>
                <Card width={{ base: "auto", md: "100%" }}>
                  <CardBody width={{ base: "auto", md: "100%" }}>
                    <Flex
                      direction={{ base: "column", md: "row" }}
                      justifyContent="space-between"
                    >
                      <ProductImage
                        formState={formState}
                        productId={productId}
                        handleChange={handleChange}
                        onImagesSelect={handleImagesSelect} 

                      />
                    </Flex>
                  </CardBody>
                </Card>
              </Grid>

             
            </Form>
          </Formik>
        </>
      )}
    </>
  );
}

export default ProductForm;
