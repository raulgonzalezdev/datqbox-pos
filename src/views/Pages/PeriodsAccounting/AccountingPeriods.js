// AccountingPeriods.js
import React from 'react'
import {
  FormControl,
  Flex,
} from '@chakra-ui/react'
import {
  StyledInput,
  StyledSelect,
  GradientInput,
  StyledFormLabel,
  BaseFlex,
  StyledText,
} from 'components/ReusableComponents/ReusableComponents'

import GradientBorder from 'components/GradientBorder/GradientBorder'

function AccountingPeriods() {
  const textColor = 'gray.400'
  const titleColor = 'white'

  return (
    <GradientBorder p="2px">
      <BaseFlex>
        <Flex alignItems="flex-start">
          <StyledText color={textColor}  >
            Periodos Contables
          </StyledText>
        </Flex>
        <StyledText fontSize="14px">
          Ejercicio Fiscal y Devolución de Impuestos
        </StyledText>
        <Flex direction="row">
          <FormControl>
            <StyledFormLabel >
              Fecha de apertura
            </StyledFormLabel>
            <StyledInput
              w={{ base: '100%', md: '160px' }}
              type="date"
              placeholder="01/01/2023"
            />

          </FormControl>
          <FormControl ml={8}>
            <StyledFormLabel  >
              Periodicidad
            </StyledFormLabel>
            <StyledSelect placeholder="Seleccionar periodicidad">
              <option value="mensual">Mensual</option>
              <option value="anual">Anual</option>
              <option value="trimestral">Trimestral</option>
              <option value="otros">Otros</option>
            </StyledSelect>
          </FormControl>
        </Flex>
        <Flex direction="row"  mb={4}>
          <FormControl>
            <StyledFormLabel >
              Fin de Año Fiscal
            </StyledFormLabel>
            <Flex>
              <StyledInput
                w={{ base: '100%', md: '160px' }}
                type="number"
                placeholder="31"
                min="1"
                max="31"
              />

              <StyledSelect
                placeholder="Mes"
                w={{ base: '100%', md: '160px' }}
              >
                <option value="enero">Enero</option>
                <option value="febrero">Febrero</option>
                <option value="marzo">Marzo</option>
                <option value="abril">Abril</option>
                <option value="mayo">Mayo</option>
                <option value="junio">Junio</option>
                <option value="julio">Julio</option>
                <option value="agosto">Agosto</option>
                <option value="septiembre">Septiembre</option>
                <option value="octubre">Octubre</option>
                <option value="noviembre">Noviembre</option>
                <option value="diciembre">Diciembre</option>
              </StyledSelect>

            </Flex>
          </FormControl>
          <FormControl ml={8}>
            <StyledFormLabel >
              Recordatorio
            </StyledFormLabel>
            <StyledInput type="text" placeholder="7 días después período" w={{ base: '100%', md: '240px' }} />
          </FormControl>
        </Flex>
        <FormControl>
          <StyledFormLabel>
            Libro diario
          </StyledFormLabel>
          <StyledSelect
            placeholder="Seleccione una opción"
          >
            <option value="operaciones_varias">Operaciones varias</option>
            <option value="diferencia_cambio">Diferencia de cambio</option>
          </StyledSelect>
        </FormControl>
      </BaseFlex>
    </GradientBorder>
  )
}
export default AccountingPeriods


