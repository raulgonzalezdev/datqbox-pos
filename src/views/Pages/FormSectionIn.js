// FormSection.js
import React from 'react'
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Link,
    Text,
    Icon,
    Flex
} from '@chakra-ui/react'
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa'
import GradientBorder from 'components/GradientBorder/GradientBorder'

function FormSection() {
    const titleColor = 'white'
    const textColor = 'gray.400'

    return (
        <GradientBorder p="2px" me={{ base: 'none', lg: '30px', xl: 'none' }}>
            <Flex
           
                background="transparent"
                borderRadius="30px"
                direction="column"
                p="40px"
                minW={{ base: 'unset', md: '430px', xl: '450px' }}
                w="100%"
                mx={{ base: '0px' }}
                bg={{
                    base: 'rgb(19,21,56)',
                }}
                alignItems="center"
         
            >
                <Text
                    mb="36px"
                    ms="4px"
                    color={textColor}
                    fontWeight="bold"
                    fontSize="14px"
                >
                    Enter your email and password to sign up
                </Text>
                <FormControl>
                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal" color="white">
                        Email
                    </FormLabel>
                    <GradientBorder
                        mb="24px"
                        w={{ base: '100%', lg: 'fit-content' }}
                        borderRadius="20px"
                    >
                        <Input
                            color="white"
                            bg="rgb(19,21,54)"
                            border="transparent"
                            borderRadius="20px"
                            fontSize="sm"
                            size="lg"
                            w={{ base: '100%', md: '346px' }}
                            maxW="100%"
                            h="46px"
                            placeholder="Your email address"
                        />
                    </GradientBorder>
                </FormControl>
                <FormControl>
                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal" color="white">
                        Password
                    </FormLabel>
                    <GradientBorder
                        mb="24px"
                        w={{ base: '100%', lg: 'fit-content' }}
                        borderRadius="20px"
                    >
                        <Input
                            color="white"
                            bg="rgb(19,21,54)"
                            border="transparent"
                            borderRadius="20px"
                            fontSize="sm"
                            size="lg"
                            w={{ base: '100%', md: '346px' }}
                            maxW="100%"
                            type="password"
                            h="46px"
                            placeholder="Your password"
                        />
                    </GradientBorder>
                </FormControl>
                <Button
                    variant="brand"
                    fontSize="10px"
                    type="submit"
                    w="100%"
                    maxW="350px"
                    h="45"
                    mb="20px"
                    mt="20px"
                >
                    SIGN UP
                </Button>

                <Text color={textColor} fontWeight="medium">
                    Already have an account?
                    <Link color={titleColor} as="span" ms="5px" fontWeight="bold">
                        Sign In
                    </Link>
                </Text>

                <HStack
                    mt="24px"
                    mb="12px"
                    justifyContent="center"
                    spacing="20px"
                    fontWeight="bold"
                    color="white"
                >
                    <Icon as={FaFacebook} w={6} h={6} />
                    <Icon as={FaGoogle} w={6} h={6} />
                    <Icon as={FaApple} w={6} h={6} />
                </HStack>
                <Text
                    textAlign="center"
                    color={textColor}
                    fontSize="14px"
                    mt="12px"
                >
                    Or sign up with
                </Text>
            </Flex>
        </GradientBorder>
    )
}

export default FormSection

