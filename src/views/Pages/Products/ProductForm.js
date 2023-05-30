import React from 'react'
import { Flex, Button, Box,  HStack,  Grid } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { StyledText } from 'components/ReusableComponents/ReusableComponents'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'


import ProductInfo from './ProductInfo'
import ProductImage from './ProductImage'
import ProductColor from './ProductColor'
import ProductSize from './ProductSize'
import useProductForm from './useProductForm'

function ProductForm({ productId, onCancel, onSuccess }) {
 
  const {
    formState,
    setFormState,
    handleCostChange,
    handleNumberInputChange,
    handleAddImages,
    handleChange,
    handleSelectedColors,
    handleSelectedSizes,
    handleAddUpdateCosts,
    onImageSelect,
    handlecalcMethodChange,
    handleRentalTypeChange,
    handleCheckboxChange,
    handleProductSelect,
    handleSubmit,
    selectedSizes,
    selectedColors,
    isLoading,
    selectedImages,
    selectedCompositeProducts,
    handleCompositeProductItems,
    data,
    loading,
    error,
    createProduct,
    updateProduct,
    addMultipleProductSizes,
    addMultipleProductColors,
    createProductComposite,
    updateProductComposite,
    createProductCosts,
    updateProductCosts,
    addImages,
    removeProductSize,
    removeProductColor,
    dbColors,
    dbSizes,
    createLoading,
    updateLoading,
} = useProductForm(productId, onSuccess, onCancel)

if ((productId && loading) || createLoading || updateLoading) return <p>Cargando...</p>
if (error) return <p>Error: {error.message}</p>

  return (
    <>
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
                  onProductSelect={handleProductSelect}
                  handlecalcMethodChange={handlecalcMethodChange}
                  handleCostChange={handleCostChange}
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
    </>
  )
}

export default ProductForm
