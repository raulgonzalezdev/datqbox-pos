import React, { useState } from 'react'
import { StyledInput, StyledFormLabel, StyledTextarea, StyledSelect, StyledNumberInput } from 'components/ReusableComponents/ReusableComponents'
import { Box, Button, Checkbox, Grid, Text, Flex, useDisclosure } from '@chakra-ui/react'
import { useGetCategories } from 'graphql/category/crudCategory'
import { useGetTaxes } from 'graphql/tax/crudTax'
import { useGetCurrencyTypes } from 'graphql/currencies/crudCurrencies'
import ProductComposite from 'components/productscomposite/ProductComposite'

import ProductInfoMedical from './ProductInfoMedical'
import ProductInfoCosts from './ProductInfoCosts'

function ProductInfo({
  formState,
  handleChange,
  handleNumberInputChange,
  formDispatch,
  handleCheckboxChange,
  handlecalcMethodChange,
  handleRentalTypeChange,
  onProductSelect,
  selectedCompositeProducts,
  handleCostChange,
}) {
  const { data: categoriesData } = useGetCategories()
  const { data: taxesData } = useGetTaxes()
  const { data: currencyTypesData } = useGetCurrencyTypes()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value
    const category = categoriesData.categories.find((cat) => cat.id === categoryId)
    if (category) {
      // verifica si la categoría existe antes de acceder a sus propiedades
      formDispatch({
        type: 'SET_VALUE',
        field: 'categoryId',
        value: categoryId,
      })
      formDispatch({
        type: 'SET_VALUE',
        field: 'category',
        value: {
          id: categoryId,
          name: category.name,
        },
      })
    } else {
      // Si no se encuentra la categoría, podrías configurar el estado a un valor predeterminado o mostrar un error, etc.
      formDispatch({
        type: 'SET_VALUE',
        field: 'categoryId',
        value: null,
      })
      formDispatch({
        type: 'SET_VALUE',
        field: 'category',
        value: null,
      })
    }
   
  }

  const handleTaxChange = (event) => {
    const taxRate = event.target.value === 'none' ? null : Number(event.target.value)
    const tax = taxesData.getAllTaxes.find((tax) => tax.rate === taxRate)
    if (tax) {
      formDispatch({
        type: 'SET_VALUE',
        field: 'taxRate',
        value: taxRate,
      })
    } else {
      formDispatch({
        type: 'SET_VALUE',
        field: 'taxRate',
        value: null,
      })
    }
     formDispatch({ type: 'calculate' })
  }

  const handleTaxCostChange = (event) => {
    const taxRate = event.target.value === 'none' ? null : Number(event.target.value)
    const tax = taxesData.getAllTaxes.find((tax) => tax.rate === taxRate)
    if (tax) {
      formDispatch({
        type: 'SET_VALUE',
        field: 'taxRateCosts',
        value: taxRate,
      })
    } else {
      formDispatch({
        type: 'SET_VALUE',
        field: 'taxRateCosts',
        value: null,
      })
    }
     formDispatch({ type: 'calculate' })
  }

  const handleCurrencyTypeChange = (event) => {
    const currencyTypeId = event.target.value
    const currencyType = currencyTypesData.getAllCurrencyTypes.find((type) => type.id === currencyTypeId)
    if (currencyType) {
      // verifica si el tipo de moneda existe antes de acceder a sus propiedades
      formDispatch({
        type: 'SET_VALUE',
        field: 'exchangeRateId',
        value: currencyTypeId,
      })
      formDispatch({
        type: 'SET_VALUE',
        field: 'currencyType',
        value: {
          id: currencyTypeId,
          name: currencyType.name,
        },
      })
    } else {
      // Si no se encuentra el tipo de moneda, podrías configurar el estado a un valor predeterminado o mostrar un error, etc.
      formDispatch({
        type: 'SET_VALUE',
        field: 'exchangeRateId',
        value: null,
      })
      formDispatch({
        type: 'SET_VALUE',
        field: 'currencyType',
        value: null,
      })
    }
  }


  return (
    <React.Fragment>
      <Box>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={3}>
          <Box>
            <StyledFormLabel>Codigo Sku producto</StyledFormLabel>
            <StyledInput name="sku" value={formState.sku || ''} onChange={handleChange} placeholder="Ingrese el sku del producto" />
          </Box>
          <Box>
            <StyledFormLabel>Categoría</StyledFormLabel>
            <StyledSelect value={formState.categoryId} onChange={handleCategoryChange}>
              <option value={0}>Selecciona una categoría</option>
              {categoriesData?.categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </StyledSelect>
          </Box>

          <Box>
            <StyledFormLabel>Nombre del producto</StyledFormLabel>
            <StyledInput name="name" value={formState.name || ''} onChange={handleChange} placeholder="Ingrese el nombre del producto" />
          </Box>

          <Box>
            <StyledFormLabel>Descripcion</StyledFormLabel>
            <StyledTextarea
              name="description"
              value={formState.description || ''}
              onChange={handleChange}
              placeholder="Ingrese el descripcion detallada del producto"
            />
          </Box>

          <Box>
            <StyledFormLabel>Unidad</StyledFormLabel>
            <StyledInput name="unit" value={formState.unit || ''} onChange={handleChange} placeholder="Ingrese como se vende el producto" />
          </Box>
          <Box>
            <StyledFormLabel>Proveedor</StyledFormLabel>
            <StyledInput name="vendor" value={formState.vendor || ''} onChange={handleChange} placeholder="Ingrese el proveedor del producto" />
          </Box>
        </Grid>
        <ProductInfoCosts
          formState={formState}
          handleNumberInputChange={handleNumberInputChange}
          handleChange={handleChange}
          handleCheckboxChange={handleCheckboxChange}
          taxesData={taxesData}
          handleTaxCostChange={handleTaxCostChange}
          handlecalcMethodChange={handlecalcMethodChange}
          handleCostChange={handleCostChange}
        />

        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={3}>
          <Box>
            <StyledFormLabel>Moneda</StyledFormLabel>
            <StyledSelect value={formState.exchangeRateId} onChange={handleCurrencyTypeChange}>
              <option value={0}>Selecciona un tipo de moneda</option>
              {currencyTypesData?.getAllCurrencyTypes?.map((currencyType) => (
                <option key={currencyType.id} value={currencyType.id} label={currencyType.name}>
                  {currencyType.name}
                </option>
              ))}
            </StyledSelect>
          </Box>

          <Box>
            <StyledFormLabel>Precio</StyledFormLabel>
            <StyledNumberInput
              name="price"
              type="number"
              value={formState.price || 0}
              //onChange={(value) => handleNumberInputChange('price', value)}
              onChange={(valueAsString, valueAsNumber) => handleCostChange('price', valueAsNumber)}
              placeholder="Ingrese el precio del producto"
            />
          </Box>
          <Box>
            <StyledFormLabel>Profit</StyledFormLabel>
            <StyledNumberInput
              name="profit"
              type="number"
              value={formState.profit || 0}
             // onChange={(value) => handleNumberInputChange('profit', value)}
              onChange={(valueAsString, valueAsNumber) => handleCostChange('profit', valueAsNumber)}
              placeholder="Ingrese la utilidad del producto"
              //isReadOnly 
            />
          </Box>
          <Box>
            <StyledFormLabel>Tax Rate</StyledFormLabel>
            <StyledSelect value={formState.taxRate === null ? 'none' : formState.taxRate} onChange={handleTaxChange}>
              <option value="none">Selecciona un impuesto</option>
              {taxesData?.getAllTaxes?.map((tax) => (
                <option key={tax.id} value={tax.rate} label={tax.name}>
                  {tax.name}
                </option>
              ))}
            </StyledSelect>
          </Box>

          <Box>
            <StyledFormLabel>Inventario</StyledFormLabel>
            <StyledNumberInput
              name="inventory"
              type="number"
              value={formState.inventory || 0}
              onChange={(value) => handleNumberInputChange('inventory', value)}
              placeholder="Ingrese el inventario del producto"
            />
          </Box>

          <Box>
            <StyledFormLabel>Rental Type</StyledFormLabel>
            <StyledSelect value={formState.rentalType} onChange={handleRentalTypeChange}>
              <option value="sale">Venta</option>
              <option value="rent">Alquiler</option>
            </StyledSelect>
          </Box>
        </Grid>

        <Flex direction={{ base: 'column', md: 'column' }} justifyContent="space-between">
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={3}>
            <Checkbox ml={4} name="taxInclued" isChecked={formState.taxInclued} onChange={handleCheckboxChange} colorScheme="black" size="lg">
              <Text color="white" fontSize="lg">
                Tax Inclued
              </Text>
            </Checkbox>
            <Checkbox ml={4} name="featured" isChecked={formState.featured} onChange={handleCheckboxChange} colorScheme="black" size="lg">
              <Text color="white" fontSize="lg">
                Featured
              </Text>
            </Checkbox>

            <Checkbox ml={4} name="newarrivals" isChecked={formState.newarrivals} onChange={handleCheckboxChange} colorScheme="black" size="lg">
              <Text color="white" fontSize="lg">
                New Arrivals
              </Text>
            </Checkbox>
            <Flex alignItems="center" justifyContent="space-between">
              <Checkbox ml={4} name="isComposite" isChecked={formState.isComposite} onChange={handleCheckboxChange} colorScheme="black" size="lg">
                <Text color="white" fontSize="lg">
                  is Composite
                </Text>
              </Checkbox>
              {formState.isComposite && (
                <Button colorShema="blue" onClick={onOpen} ml={3}>
                  Compuestos
                </Button>
              )}
            </Flex>

            <ProductComposite isOpen={isOpen} onClose={onClose} onProductSelect={onProductSelect} formState={formState} />
          </Grid>
        </Flex>
        <ProductInfoMedical
          formState={formState}
          handleNumberInputChange={handleNumberInputChange}
          handleChange={handleChange}
          handleCheckboxChange={handleCheckboxChange}
          taxesData={taxesData}
          handleTaxChange={handleTaxChange}
          handlecalcMethodChange={handlecalcMethodChange}
        />
      </Box>
    </React.Fragment>
  )
}

export default ProductInfo
