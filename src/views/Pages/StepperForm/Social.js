import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,
} from '@chakra-ui/react'
import {
  GradientInput,
  StyledFormLabel,
  StyledInput,
  BaseFlex,
  StyledText,
} from 'components/ReusableComponents/ReusableComponents'
import GradientBorder from 'components/GradientBorder/GradientBorder'

function Social() {
  const textColor = 'gray.400'
  const titleColor = 'white'

  return (
    <GradientBorder p="2px">
      <BaseFlex alignItems="center">
        <Flex alignItems="flex-start">
          <StyledText color={textColor}>Social Networks</StyledText>
        </Flex>
        <Flex alignItems="center">
          <StyledText fontSize="14px">
            Enter your social media information
          </StyledText>
        </Flex>
        <FormControl>
          <StyledFormLabel>Twitter Handle</StyledFormLabel>
          {/* <GradientInput> */}
            <StyledInput
              
              
              placeholder="@chakra-ui"
            />
          {/* </GradientInput> */}
        </FormControl>
        {/* Agrega los demás campos siguiendo este formato */}
      </BaseFlex>
    </GradientBorder>
  )
}

export default Social
