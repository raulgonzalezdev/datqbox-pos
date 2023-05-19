// CreateBankAccount.js
import React from 'react'
import {
  FormControl,
  Flex,
} from '@chakra-ui/react'
import GradientBorder from 'components/GradientBorder/GradientBorder'
import {
  StyledInput,
  GradientInput,
  StyledFormLabel,
  BaseFlex,
} from 'components/ReusableComponents/ReusableComponents'
function CreateBankAccount() {

  return (
    <GradientBorder p="2px">
      <BaseFlex>
       {/* Número de cuenta */}
        <Flex alignItems="flex-start">
          <FormControl>
            <StyledFormLabel >
              Número de cuenta
            </StyledFormLabel>
            <GradientInput>
              
              <StyledInput
             
                type="text"
                placeholder="ej. BE15001559627230"
              />
            </GradientInput>
          </FormControl>
        </Flex>
        {/* Banco */}
        <Flex alignItems="flex-start">
          <FormControl>
            <StyledFormLabel>
              Banco
            </StyledFormLabel>
            <GradientInput>
              <StyledInput
               
                type="text"
                placeholder="ej. Banco de América"
              />
            </GradientInput>
          </FormControl>
        </Flex>
        {/* Código de identificación bancaria */}
        <Flex alignItems="flex-start">
          <FormControl>
            <StyledFormLabel>
              Código de identificación bancaria
            </StyledFormLabel>
            <GradientInput>
              <StyledInput
            
                type="text"
                placeholder="ej. GEBABEBB"
              />
            </GradientInput>
          </FormControl>
        </Flex>
      </BaseFlex>
    </GradientBorder>
  )
}
export default CreateBankAccount

