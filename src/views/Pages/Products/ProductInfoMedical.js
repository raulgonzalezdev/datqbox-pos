import React from 'react'
import { 
  Accordion, 
  AccordionItem, 
  AccordionButton, 
  AccordionPanel, 
  AccordionIcon, 
  Box, 
  Grid,
  Checkbox, 
  Text,
  
} from '@chakra-ui/react'
import { StyledFormLabel, StyledNumberInput, StyledInput, StyledTextarea, StyledSelect } from 'components/ReusableComponents/ReusableComponents'

function ProductInfoMedical({ formState, handleNumberInputChange, handleChange, handlecalcMethodChange, handleCheckboxChange, taxesData, handleTaxChange }) {
  return (
    <React.Fragment>
      

      <Accordion mt={5} allowToggle w="100%">
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
                  label="Si"
                />
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
                <StyledInput name="dosage" value={formState.dosage || ''}
                                onChange={handleChange}
                placeholder="Ingrese la dosificación"
              />
              </Box>

              <Box>
                <StyledFormLabel>Indicaciones</StyledFormLabel>
                <StyledTextarea
                  name="indications"
                  value={formState.indications || ''}
                  onChange={handleChange}
                  placeholder="Ingrese las indicaciones"
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
            </Grid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </React.Fragment>
  )
}

export default ProductInfoMedical

