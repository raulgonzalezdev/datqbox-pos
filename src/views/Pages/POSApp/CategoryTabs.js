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
} from "@chakra-ui/react";
import { productosRows as productsList, categories } from "variables/products";
import GradientBorder from "components/GradientBorder/GradientBorder";

const CategoryTabs = (({ handleProductDoubleClick }) => {
  


    return (
      <Tabs isLazy variant="enclosed" colorScheme="gray" width="100%">
        <TabList>
          {categories.map((category) => (
            <Tab key={category.id} color="white">
              {category.categoryName}
            </Tab>
          ))}
        </TabList>
        <GradientBorder>
          <Box
            
            maxHeight="calc(100vh - 120px)"
            overflowY="auto"
          >
            <TabPanels mt={4}>
              {categories.map((category) => (
                <TabPanel key={category.id}>
                  <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
                    {productsList
                      .filter(
                        (product) => product.category === category.categoryName
                      )

                      .map((product) => (
                        <Box
                          key={product.id}
                          bg="white"
                          cursor="pointer"
                          p={4}
                          borderRadius="md"
                          onDoubleClick={() => {
                            handleProductDoubleClick(product);
                          
                          }}
                        >
                          <Text>{product.productName}</Text>
                          <Text>{product.price}</Text>
                        </Box>
                      ))}
                  </SimpleGrid>
                </TabPanel>
              ))}
            </TabPanels>
          </Box>
        </GradientBorder>
      </Tabs>
    );
  }
);

export default CategoryTabs;
