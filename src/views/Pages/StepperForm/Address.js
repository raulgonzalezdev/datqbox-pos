import React from 'react'
import {
  FormControl,
} from '@chakra-ui/react'
import {
  StyledInput,
  GradientInput,
  StyledFormLabel,
  BaseFlex,
  StyledText,
} from 'components/ReusableComponents/ReusableComponents'
import GradientBorder from 'components/GradientBorder/GradientBorder'

function Address() {
  const textColor = 'gray.400'
  const titleColor = 'white'

  return (
    <GradientBorder p="2px">
      <BaseFlex>
        <StyledText color={textColor}>
          Address Details
        </StyledText>
        <StyledText fontSize="14px">
          Enter your address information
        </StyledText>

        <FormControl>
          <StyledFormLabel>
            City
          </StyledFormLabel>
          
            <StyledInput
                           
              type='text'
              placeholder='eg. Venezuela'
            />
      
        </FormControl>
      </BaseFlex>
    </GradientBorder>
  )
}

export default Address
