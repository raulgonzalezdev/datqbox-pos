import React from "react";
import { StyledFormLabel } from "components/ReusableComponents/ReusableComponents";
import { Box, Checkbox, CheckboxGroup, Flex } from "@chakra-ui/react";
import { CustomCheckbox } from "components/CheckBox/CustomCheckBox";

import { useGetColors, useCreateColor } from "graphql/color/crudColor";
import { useGetSizes, useCreateSize } from "graphql/sizes/crudSizes";

function ProductSizeColor({ formState, handleChange, handleCheckboxChange }) {
  const { data: colorsData } = useGetColors();
  const { data: sizesData } = useGetSizes();

  return (
    <React.Fragment>
      <Box w={{ base: "100%", md: "50%" }} pr={{ base: "0", md: "4" }}>
        <StyledFormLabel>Colores</StyledFormLabel>
        <CheckboxGroup>
          {colorsData?.colors?.map((color) => (
            <Box
              key={color.id}
              w="100%" // establece el ancho al 100%
              mb={2}
              pr={{ base: "0", md: "4", xl: "4" }}
            >
              <CustomCheckbox
                value={color.id}
                color={color.hexCode}
                name={color.name}
                isChecked={false}
                onCheck={() => {}}
             />
             
            </Box>
          ))}
        </CheckboxGroup>
      </Box>

      <Box w={{ base: "100%", md: "50%" }} pr={{ base: "0", md: "4" }}>
        <StyledFormLabel>Tamaños</StyledFormLabel>
        <CheckboxGroup>
          {sizesData?.sizes?.map((size) => (
            <Box mb={2} key={size.id}>
              <Checkbox color="#FFFFFF" value={size.id}>
                {size.name}
              </Checkbox>
            </Box>
          ))}
        </CheckboxGroup>
      </Box>
    </React.Fragment>
  );
}

export default ProductSizeColor;
