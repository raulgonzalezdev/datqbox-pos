import React from "react";
import { Box, Image, VStack } from "@chakra-ui/react";
import { StyledText } from "components/ReusableComponents/ReusableComponents";

function ProductImage({ formState, productId }) {
  return (
    <VStack>
      <StyledText fontSize="16px" alignSelf="flex-start">
        {productId ? "Actualizar la Foto del producto" : "Ingrese Foto del producto"}
      </StyledText>
      <Box style={{ borderRadius: "8px" }}>
        <Image
          src={formState.image || "https://via.placeholder.com/450"}
          objectFit="cover"
          style={{ borderRadius: "8px" }}
        />
      </Box>
    </VStack>
  );
}

export default ProductImage;
