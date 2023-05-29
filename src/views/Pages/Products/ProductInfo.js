import React from 'react'
import { StyledInput, StyledFormLabel, StyledTextarea, StyledSelect, StyledNumberInput } from 'components/ReusableComponents/ReusableComponents'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Checkbox, Grid, Text, Flex } from '@chakra-ui/react'
import { useGetCategories } from 'graphql/category/crudCategory'
import { useGetTaxes } from 'graphql/tax/crudTax'
import { useGetCurrencyTypes } from 'graphql/currencies/crudCurrencies'
import { BaseFlex, StyledText } from 'components/ReusableComponents/ReusableComponents'

function ProductInfo({ formState, handleChange, handleNumberInputChange, setFormState, handleCheckboxChange, handleRentalTypeChange }) {
  const { data: categoriesData } = useGetCategories()
  const { data: taxesData } = useGetTaxes()
  const { data: currencyTypesData } = useGetCurrencyTypes()

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value
    const category = categoriesData.categories.find((cat) => cat.id === categoryId)
    if (category) {
      // verifica si la categoría existe antes de acceder a sus propiedades
      setFormState({
        ...formState,
        categoryId: categoryId,
        category: {
          id: categoryId,
          name: category.name,
        },
      })
    } else {
      // Si no se encuentra la categoría, podrías configurar el estado a un valor predeterminado o mostrar un error, etc.
      setFormState({
        ...formState,
        categoryId: null,
        category: null,
      })
    }
  }

  const handleTaxChange = (event) => {
    const taxRate = event.target.value === 'none' ? null : Number(event.target.value)
    const tax = taxesData.getAllTaxes.find((tax) => tax.rate === taxRate)
    if (tax) {
      setFormState({
        ...formState,
        taxRate: taxRate,
      })
    } else {
      setFormState({
        ...formState,
        taxRate: null,
      })
    }
  }

  const handleCurrencyTypeChange = (event) => {
    const currencyTypeId = event.target.value
    const currencyType = currencyTypesData.getAllCurrencyTypes.find((type) => type.id === currencyTypeId)
    if (currencyType) {
      // verifica si el tipo de moneda existe antes de acceder a sus propiedades
      setFormState({
        ...formState,
        exchangeRateId: currencyTypeId,
        currencyType: {
          id: currencyTypeId,
          name: currencyType.name,
        },
      })
    } else {
      // Si no se encuentra el tipo de moneda, podrías configurar el estado a un valor predeterminado o mostrar un error, etc.
      setFormState({
        ...formState,
        exchangeRateId: null,
        currencyType: null,
      })
    }
  }

  return (
    <React.Fragment>
      <Box>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
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
              onChange={(value) => handleNumberInputChange('price', value)}
              placeholder="Ingrese el precio del producto"
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
          <Flex direction={{ base: 'column', md: 'column' }} justifyContent="space-between">
            <Checkbox name="taxInclued" isChecked={formState.taxInclued} onChange={handleCheckboxChange} colorScheme="black" size="lg">
              <Text color="white" fontSize="lg">
                Tax Inclued
              </Text>
            </Checkbox>
            <Checkbox name="featured" isChecked={formState.featured} onChange={handleCheckboxChange} colorScheme="black" size="lg">
              <Text color="white" fontSize="lg">
                Featured
              </Text>
            </Checkbox>

            <Checkbox name="newarrivals" isChecked={formState.newarrivals} onChange={handleCheckboxChange} colorScheme="black" size="lg">
              <Text color="white" fontSize="lg">
                New Arrivals
              </Text>
            </Checkbox>
            <Checkbox name="isComposite" isChecked={formState.isComposite} onChange={handleCheckboxChange} colorScheme="black" size="lg">
              <Text color="white" fontSize="lg">
                is Composite
              </Text>
            </Checkbox>
          </Flex>
        </Grid>

        <Accordion allowToggle w="100%">
          <AccordionItem>
            <AccordionButton>
              <Box color="white" flex="1" textAlign="left">
                Detalles de Costo
              </Box>
              <AccordionIcon color="white" />
            </AccordionButton>

            <AccordionPanel pb={4}>
              <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
                <Box>
                  <StyledFormLabel>Costo de Compra</StyledFormLabel>
                  <StyledNumberInput
                    name="purchaseCost"
                    type="number"
                    value={formState.purchaseCost || 0}
                    onChange={(value) => handleNumberInputChange('purchaseCost', value)}
                    placeholder="Ingrese el costo de compra"
                  />
                </Box>

                <Box>
                  <StyledFormLabel>Otros Costos</StyledFormLabel>
                  <StyledNumberInput
                    name="otherCosts"
                    type="number"
                    value={formState.otherCosts || 0}
                    onChange={(value) => handleNumberInputChange('otherCosts', value)}
                    placeholder="Ingrese otros costos"
                  />
                </Box>

                <Box>
                  <StyledFormLabel>Costo de Envío</StyledFormLabel>
                  <StyledNumberInput
                    name="shippingCost"
                    type="number"
                    value={formState.shippingCost || 0}
                    onChange={(value) => handleNumberInputChange('shippingCost', value)}
                    placeholder="Ingrese el costo de envío"
                  />
                </Box>
              </Grid>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Accordion allowToggle w="100%">
          <AccordionItem>
            <AccordionButton>
              <Box color="white" flex="1" textAlign="left">
                Detalles Farmacéuticos
              </Box>
              <AccordionIcon color="white" />
            </AccordionButton>

            <AccordionPanel pb={4}>
              <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
                <Box>
                  <StyledFormLabel>¿Requiere Receta?</StyledFormLabel>
                  <Checkbox
                    name="requiresPrescription"
                    isChecked={formState.requiresPrescription}
                    onChange={handleCheckboxChange}
                    colorScheme="black"
                    size="lg"
                  >
                    <Text color="white" fontSize="lg">
                      Si
                    </Text>
                  </Checkbox>
                </Box>

                <Box>
                  <StyledFormLabel>Fecha de Expiración</StyledFormLabel>
                  <StyledInput
                    type="date"
                    name="expirationDate"
                    value={formState.expirationDate ? formState.expirationDate : ''}
                    onChange={handleChange}
                  />
                </Box>

                <Box>
                  <StyledFormLabel>Dosificación</StyledFormLabel>
                  <StyledInput name="dosage" value={formState.dosage || ''} onChange={handleChange} placeholder="Ingrese la dosificación" />
                </Box>

                <Box>
                  <StyledFormLabel>Instrucciones de Uso</StyledFormLabel>
                  <StyledTextarea
                    name="usageInstructions"
                    value={formState.usageInstructions || ''}
                    onChange={handleChange}
                    placeholder="Ingrese las instrucciones de uso"
                  />
                </Box>

                <Box>
                  <StyledFormLabel>Contraindicaciones</StyledFormLabel>
                  <StyledTextarea
                    name="contraindications"
                    value={formState.contraindications || ''}
                    onChange={handleChange}
                    placeholder="Ingrese las contraindicaciones"
                  />
                </Box>

                <Box>
                  <StyledFormLabel>Ingrediente Activo</StyledFormLabel>
                  <StyledInput
                    name="activeIngredient"
                    value={formState.activeIngredient || ''}
                    onChange={handleChange}
                    placeholder="Ingrese el ingrediente activo"
                  />
                </Box>
              </Grid>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </React.Fragment>
  )
}

export default ProductInfo
