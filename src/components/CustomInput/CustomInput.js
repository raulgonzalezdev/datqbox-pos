import React, { useRef, useEffect } from 'react'
import { Input } from '@chakra-ui/react'

const CustomInput = ({ value, onChange, ...props }) => {
  const inputRef = useRef()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleBlur = (event) => {
    if (value.startsWith('*/')) {
      return
    }
  
    setTimeout(() => {
     
     if (event.relatedTarget && event.relatedTarget.placeholder === 'Buscar productos...') {
        return
      }
  
      // Si no, enfoca de nuevo el campo de entrada original
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 100)
  }
  
  const searchInputStyle = {
    fontSize: '24px',
    cursor: 'text',
    backgroundColor: 'white',
    color: 'black',
    
  }

  return (
    <Input
      ref={inputRef}
      onBlur={handleBlur}
      {...props}
      placeholder="Escanee el código de barras"
      focusBorderColor="brand.500"
      _placeholder={{ color: 'gray.400' }}
      borderWidth="2px"
      style={searchInputStyle}
      value={value}
      onChange={(e) => onChange(e)}

    />
  )
}

export default CustomInput
