import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,
} from '@chakra-ui/react'
import GradientBorder from 'components/GradientBorder/GradientBorder'
import {
  StyledInput,
  GradientInput,
  StyledFormLabel,
  BaseFlex,
  StyledText,
} from 'components/ReusableComponents/ReusableComponents'

function UserInfo() {
  const textColor = 'gray.400'
  const titleColor = 'white'

  return (
    <GradientBorder p="2px">
      <BaseFlex>
        <Flex alignItems="flex-start">
          <StyledText color={textColor}>Profile Information</StyledText>
        </Flex>
        <Flex alignItems="center">
          <StyledText fontSize="14px">
            Enter your email and password to sign up
          </StyledText>
        </Flex>
        <FormControl>
          <StyledFormLabel>Email address</StyledFormLabel>
          <GradientInput>
            <StyledInput
              color={titleColor}
              type="email"
              placeholder="eg. example@yahoo.com"
            />
          </GradientInput>
        </FormControl>
        <FormControl>
          <StyledFormLabel>Password</StyledFormLabel>
          <GradientInput>
            <StyledInput
              color={titleColor}
              type="password"
              placeholder="**********"
            />
          </GradientInput>
        </FormControl>
        <FormControl>
          <StyledFormLabel>Confirm password</StyledFormLabel>
          <GradientInput>
            <StyledInput
              color={titleColor}
              type="password"
              placeholder="**********"
            />
          </GradientInput>
        </FormControl>
      </BaseFlex>
    </GradientBorder>
  )
}

export default UserInfo
