import React from 'react'
import {
  Box,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Card as ChakraCard,
  CardBody as ChakraCardBody,
  Image,
  Stack,
  Heading,
  Divider,
} from '@chakra-ui/react'
import { productosRows as productsList, categories } from 'variables/products'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import GradientBorder from 'components/GradientBorder/GradientBorder'

const CategoryTabs = ({ handleProductDoubleClick }) => {
  return (
    <Tabs
      isLazy
      variant="enclosed"
      colorScheme="gray"
      width={{ base: 'auto', md: '100%' }}
    >
      <TabList width={{ base: 'auto', md: '100%' }}>
        {categories.map((category) => (
          <Tab key={category.id} color="white">
            {category.categoryName}
          </Tab>
        ))}
      </TabList>

      <Box>
        <TabPanels width={{ base: 'auto', md: '100%' }} mt={4}>
          {categories.map((category) => (
            <TabPanel key={category.id}>
              {/* <GradientBorder p="2px"> */}
              <Card marginLeft="-5" marginRight="5" w={{ base: '100%', md: '108%', '2xl': '100%' }} h="100%">
  

                <CardBody
                  overflowY="auto"
                  maxH={{ base: '150px', md: '600px' }}
                  width={{ base: 'auto', md: '100%' }}
                >
                  {/* <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 5 }} spacing={4}> */}
                  <SimpleGrid
                    columns={{ base: 1, sm: 2, md: 3, lg: 3, xl: 3, '2xl': 4 }}
                    spacing={4}
                  >
                    {productsList
                      .filter(
                        (product) => product.category === category.categoryName
                      )
                      .map((product) => (
                        <ChakraCard
                          key={product.id}
                          direction={{ base: 'column', sm: 'row' }}
                          overflow="hidden"
                          variant="outline"
                          onDoubleClick={() => {
                            handleProductDoubleClick(product)
                          }}
                          maxW="sm"
                          bg="white"
                          cursor="pointer"
                          boxShadow="lg"
                          borderRadius="8px"
                          p={2}
                          height={{ md: '100px', '2xl': '130px' }}
                          width={{ md: '150px', '2xl': '180px' }}
                          minHeight="100px"
                        >
                          <Image
                            src={product?.imageUrl}
                            fallbackSrc="https://via.placeholder.com/350"
                            alt="Product Image"
                            objectFit="cover"
                            maxW={{ base: '100%', sm: '70px' }}
                            borderRadius="8px"
                          />

                          <ChakraCardBody>
                            <Heading
                              fontSize="0.7rem"
                              ml="-4"
                              mt="-2"
                              textAlign="center"
                              noOfLines={3}
                            >
                              {product.productName}
                            </Heading>

                            <Text
                              py="2"
                              color="blue.600"
                              fontSize="md"
                              textAlign="right"
                            >
                              {product.price}
                            </Text>
                          </ChakraCardBody>
                        </ChakraCard>
                      ))}
                  </SimpleGrid>
                </CardBody>
              </Card>
              {/* </GradientBorder> */}
            </TabPanel>
          ))}
        </TabPanels>
      </Box>
    </Tabs>
  )
}

export default CategoryTabs
