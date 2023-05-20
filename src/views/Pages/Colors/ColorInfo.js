import React from 'react'
import { StyledInput, StyledFormLabel } from 'components/ReusableComponents/ReusableComponents'
import { Box, Stack } from '@chakra-ui/react'
import ColorPicker from 'components/ColorPicker/colorPiker'

function ColorInfo({ formState, handleChange }) {

  const handleColor = (color) => {
    handleChange({ target: { value: color, name: 'hexCode' } })
  }

  return (
    <React.Fragment>
    <Box p="4" border="1px solid #000" borderRadius="4px">
        <Stack spacing={4}>
          <Box>
            <ColorPicker
              handleColor={handleColor}
              boxProps={{
                bg: formState.hexCode,
                boxSize: '8.7rem',
                border: '1px solid #c4c4c4',
                marginTop: '10px',
              }}
            />
          </Box>
        </Stack>

        <Box>
          <StyledFormLabel>Nombre Color</StyledFormLabel>
          <StyledInput
            name="name"
            placeholder="Nombre del Color"
            fontSize="sm"
            type="text"
            color="black"
            value={formState.name}
            onChange={(e) => handleChange(e)}
          />
        </Box>
        <Box>
          <StyledFormLabel>Hex Code</StyledFormLabel>
          <StyledInput
            name="hexCode"
            value={formState.hexCode}
            onChange={(e) => handleChange(e)}
            placeholder="Hex Code del Color"
            type="text"
          />
        </Box>
        </Box>
     
    </React.Fragment>
  )
}

export default ColorInfo
