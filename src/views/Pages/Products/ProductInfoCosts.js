import React from 'react'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Grid, Checkbox, Text } from '@chakra-ui/react'
import { StyledFormLabel, StyledNumberInput, StyledInput, StyledTextarea, StyledSelect } from 'components/ReusableComponents/ReusableComponents'

function ProductInfoCosts({
  formState,
  handleNumberInputChange,
  handleCostChange,
  handleChange,
  handleTaxCostChange,
  handlecalcMethodChange,
  handleCheckboxChange,
  taxesData,
  handleTaxChange,
}) {
  return (
    <React.Fragment>
      <Accordion mt={5} allowToggle w="100%">
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
                <StyledFormLabel>% Profit</StyledFormLabel>
                <StyledNumberInput
                  name="profit"
                  type="number"
                  value={formState.profit || 0}
                  // onChange={(value) => handleNumberInputChange('profit', value)}
                  onChange={(valueAsString, valueAsNumber) => handleCostChange('profit', valueAsNumber)}
                  placeholder="Ingrese % utilidad "
                  //isReadOnly
                />
              </Box>
              <Box>
                <StyledFormLabel>Costo de Compra</StyledFormLabel>
                <StyledNumberInput
                  name="purchaseCost"
                  type="number"
                  value={formState.purchaseCost || 0}
                  onChange={(valueAsString, valueAsNumber) => handleCostChange('purchaseCost', valueAsNumber)}
                  placeholder="Ingrese el costo de compra"
                />
              </Box>
              <Box>
                <StyledFormLabel>Tax Rate Cost</StyledFormLabel>
                <StyledSelect value={formState.taxRateCosts === null ? 'none' : formState.taxRateCosts} onChange={handleTaxCostChange}>
                  <option value="none">Selecciona un impuesto</option>
                  {taxesData?.getAllTaxes?.map((tax) => (
                    <option key={tax.id} value={tax.rate} label={tax.name}>
                      {tax.name}
                    </option>
                  ))}
                </StyledSelect>
              </Box>

              <Box>
                <StyledFormLabel>Otros Costos</StyledFormLabel>
                <StyledNumberInput
                  name="otherCosts"
                  type="number"
                  value={formState.otherCosts || 0}
                  onChange={(valueAsString, valueAsNumber) => handleCostChange('otherCosts', valueAsNumber)}
                  placeholder="Ingrese otros costos"
                />
              </Box>

              <Box>
                <StyledFormLabel>Costo de Envío</StyledFormLabel>
                <StyledNumberInput
                  name="shippingCost"
                  type="number"
                  value={formState.shippingCost || 0}
                  onChange={(valueAsString, valueAsNumber) => handleCostChange('shippingCost', valueAsNumber)}
                  placeholder="Ingrese el costo de envío"
                />
              </Box>
              <Box>
                <StyledFormLabel>Metodo Calculo</StyledFormLabel>
                <StyledSelect value={formState.calcMethod} onChange={handlecalcMethodChange}>
                  <option value="sale">Venta</option>
                  <option value="cost">Costo</option>
                </StyledSelect>
              </Box>
              <Checkbox
                name="isTaxedCost"
                isChecked={formState.isTaxedCost}
                onChange={(event) => {
                  handleCheckboxChange(event)
                  handleCostChange('isTaxedCost', event.target.checked)
                }}
                colorScheme="black"
                size="lg"
              >
                <Text color="white" fontSize="lg">
                  Incluir Iva al Costo
                </Text>
              </Checkbox>
            </Grid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </React.Fragment>
  )
}

export default ProductInfoCosts
