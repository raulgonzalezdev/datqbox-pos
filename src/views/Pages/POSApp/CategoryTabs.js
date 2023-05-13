import React from "react";
import {
  Box,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  // Card,
  // CardBody,
  Image,
  Stack,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { productosRows as productsList, categories } from "variables/products";
import GradientBorder from "components/GradientBorder/GradientBorder";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

const CategoryTabs = ({ handleProductDoubleClick }) => {
  return (
    <Tabs isLazy variant="enclosed" colorScheme="gray" width="100%" overflowY="auto">
      <TabList>
        {categories.map((category) => (
          <Tab key={category.id} color="white">
            {category.categoryName}
          </Tab>
        ))}
      </TabList>
  
      <Box overflowY="auto">
        <TabPanels mt={4} overflowY="auto">
          {categories.map((category) => (
            <TabPanel key={category.id} overflowY="auto">
            <Card gridArea={{ md: '2 / 2 / 3 / 3', '2xl': 'auto' }} overflowY="auto">
            <CardBody w='100%' h='100%' overflowY="auto"  maxH={{base: "300px", md: "600px"}}>
              <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
                {productsList
                  .filter(
                    (product) => product.category === category.categoryName
                  )
                  .map((product) => (
                    <Card
                      onDoubleClick={() => {
                        handleProductDoubleClick(product);
                      }}
                      maxW="sm"
                      bg="white"
                      cursor="pointer"
                      boxShadow="lg"
                      borderRadius="8px"
                      p={2}
                      height="150px"
                      minHeight="100px"
                      overflowY="auto"
                    >
                      <CardBody overflowY="auto">
                      <Heading size="xs">{product.productName}</Heading>
                        <Image
                          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                          alt="Green double couch with wooden legs"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                          <Text color="blue.600" fontSize="md">
                            {product.price}
                          </Text>
                      </CardBody>
                    </Card>
                  ))}
              </SimpleGrid>
              </CardBody>
              </Card>
            </TabPanel>
          ))}
        </TabPanels>
      </Box>
    </Tabs>
);

};

export default CategoryTabs;
