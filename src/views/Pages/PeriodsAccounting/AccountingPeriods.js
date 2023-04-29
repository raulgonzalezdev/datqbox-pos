// AccountingPeriods.js
import React from "react";
import {
  FormControl,
  Flex,
} from "@chakra-ui/react";
import {
  StyledInput,
  StyledSelect,
  GradientInput,
  StyledFormLabel,
  BaseFlex,
  StyledText,
} from "components/ReusableComponents/ReusableComponents";

import GradientBorder from "components/GradientBorder/GradientBorder";

function AccountingPeriods() {
  const textColor = "gray.400";
  const titleColor = "white";

  return (
    <GradientBorder p="2px">
      <BaseFlex>
        <Flex alignItems="flex-start">
          <StyledText color={textColor}  >
            Periodos Contables
          </StyledText>
        </Flex>
        <Flex alignItems="center">
          <StyledText fontSize="14px">
            Ejercicio Fiscal y Devolución de Impuestos
          </StyledText>
        </Flex>
        <FormControl>
          <StyledFormLabel >
            Fecha de apertura
          </StyledFormLabel>
          <GradientInput>
            <StyledInput
              color={titleColor}
              type="date"
              placeholder="01/01/2023"
            />
          </GradientInput>
        </FormControl>
        <FormControl>
          <StyledFormLabel  >
            Periodicidad
          </StyledFormLabel>
          <GradientInput>
            <StyledSelect color={titleColor} placeholder="Seleccionar periodicidad">
              <option value="mensual">Mensual</option>
              <option value="anual">Anual</option>
              <option value="trimestral">Trimestral</option>
              <option value="otros">Otros</option>
            </StyledSelect>
          </GradientInput>
        </FormControl>
        <FormControl>
          <StyledFormLabel >
            Fin de Año Fiscal
          </StyledFormLabel>
          <Flex>
            <GradientInput>
              <StyledInput
                color={titleColor}
                w={{ base: "100%", md: "160px" }}
                type="number"
                placeholder="31"
                min="1"
                max="31"
              />
            </GradientInput>
            <GradientInput>
              <StyledSelect
                color={titleColor}
                placeholder="Mes"
                w={{ base: "100%", md: "160px" }}
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
            </GradientInput>
          </Flex>
        </FormControl>
        <FormControl>
          <StyledFormLabel >
            Recordatorio
          </StyledFormLabel>
          <GradientInput>
            <StyledInput type="text" placeholder="7 días después período" color={titleColor} />
          </GradientInput>
        </FormControl>
        <FormControl>
          <StyledFormLabel>
            Libro diario
          </StyledFormLabel>
          <GradientInput>
            <StyledSelect
              color={titleColor}
              placeholder="Seleccione una opción"
            >
              <option value="operaciones_varias">Operaciones varias</option>
              <option value="diferencia_cambio">Diferencia de cambio</option>
            </StyledSelect>
          </GradientInput>
        </FormControl>
      </BaseFlex>
    </GradientBorder>
  );
}
export default AccountingPeriods;


