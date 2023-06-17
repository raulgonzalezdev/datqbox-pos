import React from 'react'
import {
  FormControl,
  Flex,
} from '@chakra-ui/react'
import {
  StyledInput,
  GradientInput,
  StyledFormLabel,
  StyledTextarea,
  BaseFlex,
  StyledText,
} from 'components/ReusableComponents/ReusableComponents'
import GradientBorder from 'components/GradientBorder/GradientBorder'

function Profile() {

  return (
    <GradientBorder p="2px">
      <BaseFlex>
        <StyledText fontSize="20px">
          Mandatory Informations
        </StyledText>
        <StyledText fontSize="16px">
          Enter your profile information
        </StyledText>      
        <FormControl>
          <StyledFormLabel>
            Public Email
          </StyledFormLabel>
              <StyledInput      
              placeholder="Use an address you don't use frequently"
            />    
        </FormControl>
        <Flex  direction="row">
        <FormControl w="50%" mr={2}>
          <StyledFormLabel>
            First Name
          </StyledFormLabel>
              <StyledInput
              placeholder='Enter your first name'
            />
        </FormControl>
        <FormControl w="50%">
          <StyledFormLabel>
            Last Name
          </StyledFormLabel> 
            <StyledInput
              placeholder='Enter your last name'
            />
        </FormControl>
        </Flex>
        <FormControl>
          <StyledFormLabel>
            Bio
          </StyledFormLabel>       
            <StyledTextarea                      
              placeholder='Tell us about yourself'
            />
   
        </FormControl>
        {/* Agrega los demás campos siguiendo este formato */}
      </BaseFlex>
    </GradientBorder>
  )
}

export default Profile
