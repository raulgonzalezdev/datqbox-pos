import { Box, Text, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { CheckIcon } from "@chakra-ui/icons";

export function CustomCheckbox({ name, color = "black", isChecked, onCheck }) {
  const [checked, setChecked] = useState(isChecked);

  const toggleCheck = () => {
    setChecked(!checked);
    onCheck(!checked);
  };

  return (
    <Flex
      direction="row"
      alignItems="center"
      onClick={toggleCheck}
      cursor="pointer"
    >
      <Box
        w="20px"
        h="20px"
        border="1px solid"
        borderColor={color}
        backgroundColor={checked ? color : "transparent"} // establece el backgroundColor con Chakra UI
        borderRadius="3px"
        mr="10px"
        position="relative"
      >
        {checked && (
          <CheckIcon
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            color={color === "#FFFFFF" ? "black" : "white"}
          />
        )}
      </Box>
      <Box
        w="80px"
        h="20px"
        border="1px solid"
        borderColor={color}
        backgroundColor={checked ? color : "transparent"} 
        borderRadius="3px"
        mr="10px"
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text color={(color === "#FFFFFF" && checked ) ? "black" : "white"}>{name}</Text>
      </Box>
    </Flex>
  );
}
