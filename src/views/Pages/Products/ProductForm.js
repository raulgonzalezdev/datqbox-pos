import React, { useState, useEffect, useRef } from 'react'
import { Flex, Button, Box, useToast, HStack, Spinner, Grid } from '@chakra-ui/react'
import { StyledText } from 'components/ReusableComponents/ReusableComponents'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { gql } from '@apollo/client'
import { useGetProduct, useCreateProduct, useUpdateProduct } from 'graphql/products/crudProducts'
import { Form, Formik } from 'formik'
import { useRemoveProductColor, useAddMultipleProductColors } from 'graphql/productcolor/crudProductColor'
import { useRemoveProductSize, useAddMultipleProductSizes } from 'graphql/productsize/crudProductSize'
import { useAddImages } from 'graphql/image/crudImage'

import ProductInfo from './ProductInfo'
import ProductImage from './ProductImage'
import ProductColor from './ProductColor'
import ProductSize from './ProductSize'

function ProductForm({ productId, onCancel, onSuccess }) {
  const [formState, setFormState] = useState({
    sizes: [],
    colors: [],
  })

  const toast = useToast()
  const { data, loading, error } = useGetProduct(productId, {
    skip: !productId,
  })

  const [createProduct, { loading: createLoading }] = useCreateProduct()
  const [updateProduct, { loading: updateLoading }] = useUpdateProduct()
  const [addMultipleProductSizes] = useAddMultipleProductSizes()
  const [addMultipleProductColors] = useAddMultipleProductColors()

  const [addImages] = useAddImages()

  const [removeProductSize] = useRemoveProductSize()
  const [removeProductColor] = useRemoveProductColor()
  const dbSizes = formState?.productSizes?.map((sizeObj) => sizeObj.size.id) || []
  const dbColors = formState?.productColors?.map((ColorObj) => ColorObj.color.id) || []

  const [selectedSizes, setSelectedSizes] = useState(dbSizes)
  const [selectedColors, setSelectedColors] = useState(dbColors)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImages, setSelectedImages] = useState([])

  const onImageSelect = (images) => {
    setSelectedImages(images)
  }

  useEffect(() => {
    if (data && data.product) {
      let expirationDate

      if (data.product.expirationDate !== null) {
        const expirationDateMillis = Number(data.product.expirationDate)
        if (!isNaN(expirationDateMillis)) {
          expirationDate = new Date(expirationDateMillis).toISOString().split('T')[0]
        }
      }

      setFormState({
        ...data.product,
        categoryId: data.product.category.id,
        exchangeRateId: data.product.exchangeRate.currencyId,
        purchaseCost: data.product.productCosts ? data.product.productCosts.purchaseCost : 0,
        otherCosts: data.product.productCosts ? data.product.productCosts.otherCosts : 0,
        shippingCost: data.product.productCosts ? data.product.productCosts.shippingCost : 0,
        expirationDate: expirationDate,
        //taxInclued: data.product.taxInclued === undefined ? true : data.product.taxInclued,
        featured: data.product.featured === undefined ? true : data.product.featured,
        newarrivals: data.product.newarrivals === undefined ? true : data.product.newarrivals,
      })

      setSelectedSizes(data.product.productSizes.map((productSize) => productSize.size.id))
      setSelectedColors(data.product.productColors.map((productColor) => productColor.color.id))
    } else if (!productId) {
      setFormState({
        id: null,
        name: '',
        vendor: '',
        description: '',
        image: '',
        price: 0,
        inventory: 0,
        rentalType: '',
        featured: true,
        newarrivals: true,
        taxRate: 0,
        taxInclued: true,
        categoryId: '',
        exchangeRateId: '',
        requiresPrescription: true,
        expirationDate: '',
        dosage: '',
        unit: '',
        usageInstructions: '',
        contraindications: '',
        activeIngredient: '',
        otherCosts: 0,
        shippingCost: 0,
        purchaseCost: 0,
      })
      setSelectedSizes([])
      setSelectedColors([])
    }
  }, [data, productId])

  const handleNumberInputChange = (fieldName, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: Number(value),
    }))
  }

  const UPLOAD_FILES = gql`
    mutation ($files: [Upload!]!) {
      multipleUpload(files: $files) {
        filename
      }
    }
  `

  const token = localStorage.getItem('authToken')
  const uploadLink = createUploadLink({
    uri: 'http://localhost:4000/graphql', // Debes reemplazarlo por la URI de tu servidor GraphQL
    headers: {
      'keep-alive': 'true',
      authorization: token ? `Bearer ${token}` : '',
    },
  })

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: uploadLink,
  })

  const handleAddImages = async (selectedImages, productId) => {
    console.log('Origen de Imagenes:', selectedImages)

    // Verificar si selectedImages contiene objetos de archivo o URLs
    const isNewFiles = selectedImages[0].hasOwnProperty('path')

    if (isNewFiles) {
      // Trata selectedImages como un array de objetos de archivo
      try {
        // Antes de subir las imágenes, genera las URLs y asócialas con el producto
        const imagesWithProduct = selectedImages.map(({ path }) => ({
          url: `http://localhost:4000/uploads/${path}`,
          product: { id: productId },
        }))
        // Ejecuta la operación addImages
        const { data } = await addImages({
          variables: { input: { images: imagesWithProduct } },
        })

        const files = selectedImages.map(({ preview, path }) => {
          return new File([preview], path)
        })

        // Ahora sube los archivos
        const uploadPromises = selectedImages.map((file) => {
          return client.mutate({
            mutation: UPLOAD_FILES,
            variables: {
              files: [file],
            },
          })
        })

        const uploadResults = await Promise.all(uploadPromises)

        // Imprime los nombres de los archivos subidos
        uploadResults.forEach((result) => {
          console.log(result.data.multipleUpload.filename)
        })
      } catch (error) {
        console.error('Error al añadir imágenes o subir archivos: ', error)
      }
    } else {
      // Trata selectedImages como un array de URLs

      try {
        let imagesProduct = selectedImages.map(({ url }) => ({
          url,
          product: { id: productId },
        }))

        console.log('imagesProduct', imagesProduct)

        // Ejecuta la operación addImages
        const { data } = await addImages({
          variables: { input: { images: imagesProduct } },
        })

        setSelectedImages([])
      } catch (error) {
        console.error('Error al añadir imágenes: ', error)
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSelectedColors = (colorId) => {
    if (selectedColors.includes(colorId)) {
      setSelectedColors(selectedColors.filter((id) => id !== colorId))
    } else {
      setSelectedColors([...selectedColors, colorId])
    }
  }

  const handleSelectedSizes = (sizeId, isChecked) => {
    setSelectedSizes((prevSizes) => {
      if (isChecked && !prevSizes.includes(sizeId)) {
        return [...prevSizes, sizeId]
      } else if (!isChecked && prevSizes.includes(sizeId)) {
        return prevSizes.filter((id) => id !== sizeId)
      } else {
        return prevSizes
      }
    })
  }

  const handleSubmit = async (e) => {
    // e.preventDefault();
    setIsLoading(true)

    
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
      taxInclued: formState.taxInclued,
      taxRate: parseFloat(formState.taxRate),
      categoryId: formState.categoryId,
      unit: formState.unit,
      exchangeRateId: formState.exchangeRateId,
      requiresPrescription: formState.requiresPrescription,
      expirationDate: formState.expirationDate,
      dosage: formState.dosage,
      usageInstructions: formState.usageInstructions,
      contraindications: formState.contraindications,
      activeIngredient: formState.activeIngredient,
    }
    let newProductId = productId
    //console.log({ id: productId, input: adjustedFormState })
    try {
      if (productId) {
        await updateProduct({
          variables: { id: productId, input: adjustedFormState },
        })
      } else {
        const newProduct = await createProduct({
          variables: { input: adjustedFormState },
        })
        newProductId = newProduct.data.createProduct.id
      }

      const { dataC } = await removeProductColor({
        variables: {
          input: {
            ProductId: newProductId,
          },
        },
      })

      const { dataZ } = await removeProductSize({
        variables: {
          input: {
            ProductId: newProductId,
          },
        },
      })

      const productSizes = selectedSizes.map((sizeId) => ({
        ProductId: newProductId,
        SizeId: sizeId,
        stock: 10,
      }))

      const productColors = selectedColors.map((colorId) => ({
        ProductId: newProductId,
        ColorId: colorId,
      }))

      await addMultipleProductSizes({ variables: { input: productSizes } })
      await addMultipleProductColors({ variables: { input: productColors } })

      handleAddImages(selectedImages, newProductId)

      if (productId) {
        toast({
          title: 'Producto actualizado',
          description: 'El producto ha sido actualizado exitosamente',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Producto creado',
          description: 'El producto ha sido creado exitosamente',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }

      setTimeout(() => {
        onSuccess()
      }, 3000)
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    setIsLoading(false)
  }

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: checked,
    }))
  }

  const handleRentalTypeChange = (event) => {
    const rentalType = event.target.value
    setFormState({
      ...formState,
      rentalType: rentalType.toLowerCase(),
    })
  }

  if ((productId && loading) || createLoading || updateLoading) return <p>Cargando...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      {/* {isLoading ? (
        <Spinner /> // Muestra el spinner si isLoading es true
      ) : (
        <> */}
          <Formik initialValues={formState} onSubmit={handleSubmit}>
            <Form>
              <Card
                width={{ base: 'auto', md: '93.5%', '2xl': '95%' }}
                marginLeft="10"
                mt={55}
                pt={-2} // reduce padding-top if needed
                pb={-2} // reduce padding-bottom if needed
              >
                <Box mt={2}>
                  {' '}
                  {/* adjust marginTop as needed */}
                  <HStack width="100%" justifyContent="space-between" spacing={2}>
                    {' '}
                    {/* reduce spacing as needed */}
                    <StyledText fontSize={{ base: '16px', md: '20px' }}>{productId ? 'Editar Producto' : 'Añadir Producto'}</StyledText>
                    <Button onClick={onCancel} colorScheme="teal" size={{ base: 'sm', md: 'md' }}>
                      Retornar
                    </Button>
                    <Button type="submit" colorScheme="teal" size={{ base: 'sm', md: 'md' }}>
                      Submit
                    </Button>
                  </HStack>
                </Box>
              </Card>

              <Grid templateColumns={{ sm: '1fr', md: '2fr 1fr', lg: '1fr 1fr' }} my="26px" gap="18px" marginLeft="10" marginRight="10" marginTop="2">
                <Card width={{ base: 'auto', md: '100%' }}>
                  <CardBody width={{ base: 'auto', md: '100%' }} h="100%">
                    <ProductInfo
                      formState={formState}
                      handleChange={handleChange}
                      setFormState={setFormState}
                      handleNumberInputChange={handleNumberInputChange}
                      handleRentalTypeChange={handleRentalTypeChange}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                  </CardBody>
                  <Flex direction={{ base: 'column', md: 'row' }} justifyContent="space-between" mt="5">
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
                <Card width={{ base: 'auto', md: '100%' }}>
                  <CardBody width={{ base: 'auto', md: '100%' }}>
                    <Flex direction={{ base: 'column', md: 'row' }} justifyContent="space-between">
                      <ProductImage formState={formState} productId={productId} handleChange={handleChange} onImageSelect={onImageSelect} />
                    </Flex>
                  </CardBody>
                </Card>
              </Grid>
            </Form>
          </Formik>
        {/* </>
      )} */}
    </>
  )
}

export default ProductForm
