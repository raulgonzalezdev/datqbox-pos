import { Box, Text, Flex, Radio } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

export function CustomCheckbox({
  name,
  color = 'black',
  isChecked,
  onCheck,
  index,
  radioValue,
  setRadioValue,
}) {
  const toggleCheck = () => {
    onCheck()
  }


  return (
    <Flex
      direction="row"
      alignItems="center"
      
      cursor="pointer"
    >
      <Box
        w="20px"
        h="20px"
        border="1px solid"
        borderColor={color}
        backgroundColor={isChecked ? color : 'transparent'}
        borderRadius="3px"
        mr="10px"
        position="relative"
        onClick={toggleCheck}
      >
        {isChecked && (
          <CheckIcon
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            color={color === '#FFFFFF' ? 'black' : 'white'}
          />
        )}
      </Box>
      <Box
        w="80px"
        h="20px"
        border="1px solid"
        borderColor={color}
        backgroundColor={isChecked ? color : 'transparent'}
        borderRadius="3px"
        mr="10px"
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text color={color === '#FFFFFF' && isChecked ? 'black' : 'white'}>
          {name}
        </Text>
      </Box>
      <Radio
        value={index}
        isChecked={radioValue && radioValue.index === index}

        onChange={() => {
          setRadioValue({
            index: index,
            name: name,
            color: color,
          })
        }}
      />
    </Flex>
  )
}
