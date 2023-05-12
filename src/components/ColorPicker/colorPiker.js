import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import { SketchPicker } from 'react-color'
import TextColorBasedOnBgColor from './color.utils'

const ColorPicker = ({ boxProps, handleColor }) => {
  const [color, setColor] = useState(boxProps.bg.toString())
  const [showColorPicker, setShowColorPicker] = useState(false)

  const handleShowColorPicker = () => {
    setShowColorPicker(!showColorPicker)
  }

  const [colors, setColors] = useState(null)
  const colorPicker = e => {
    const newColor = {
      hex: e.hex,
      rgb: '(' + e.rgb.r + ',' + e.rgb.g + ',' + e.rgb.b + ',' + e.rgb.a + ')'
    }
    setColor(e.hex)
    handleColor(e.hex)
    setColors(newColor)
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginRight={2}
        _hover={{ cursor: 'pointer', border: '1px solid #CBD5E0' }}
        onClick={handleShowColorPicker}
        {...boxProps}
      >
        <Box
          color={TextColorBasedOnBgColor(color)}
          bg={TextColorBasedOnBgColor(color)}
          fontSize={18}
        />
      </Box>
      {showColorPicker && (
        <Box
          mt={2}
          ml={-1}
          position="absolute"
          zIndex={1}
          onClick={handleShowColorPicker}
        >
          <SketchPicker
            color={colors !== null && colors.hex}
            onChange={e => colorPicker(e)}
            disableAlpha
            renderers={false}
          />
        </Box>
      )}
    </>
  )
}

export default ColorPicker
