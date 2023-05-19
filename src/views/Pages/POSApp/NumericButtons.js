import React, { useState } from 'react'
import { SimpleGrid, Button , Flex, Grid} from '@chakra-ui/react'

import { BiTag, BiSubdirectoryLeft } from 'react-icons/bi'
import { FaBackspace, FaCheck } from 'react-icons/fa'
import { BsBackspace } from 'react-icons/bs'
import { GrReturn } from 'react-icons/gr'



const NumericButtons = ({
  handleNumericButtonClick,
  handleEnterClick,
  selectedOperation,
  setSelectedOperation,
}) => {
  const selectedButtonStyle = {
    border: '2px solid',
    borderColor: 'green.500',
    backgroundColor: 'green.500',
  }
  
  const handleCantBtnClick = () => {
    setSelectedOperation(selectedOperation === 'Cant' ? null : 'Cant')
  }

  const handlePrecioBtnClick = () => {
    setSelectedOperation(selectedOperation === 'Precio' ? null : 'Precio')
  }

  const handleDescBtnClick = () => {
    setSelectedOperation(selectedOperation === '% Desc' ? null : '% Desc')
  }

  const handleDecimalButtonClick = () => {
    handleNumericButtonClick('.')
  }

  const handleBackspaceButtonClick = () => {
    handleNumericButtonClick('backspace')
  }


  return (
    <Grid
        templateColumns={{ base: '1fr', md: '1fr 1fr' }}
        my="26px"
        gap="18px"
      >
    <Flex flexDirection={{ base: 'row', md: 'row' }}> 
      <Button width={{ base: 'auto', md: '100%' }} height="100%" mb={4}>
        Enviar Payment
     </Button>
    </Flex>

     <Flex>  
                
    <SimpleGrid columns={4} spacing={1} ml={4}>
      <Button onClick={() => handleNumericButtonClick(1)}>1</Button>
      <Button onClick={() => handleNumericButtonClick(2)}>2</Button>
      <Button onClick={() => handleNumericButtonClick(3)}>3</Button>
      <Button
        style={selectedOperation === 'Cant' ? selectedButtonStyle : {}}
        onClick={handleCantBtnClick}
      >
        Cant
      </Button>
      <Button onClick={() => handleNumericButtonClick(4)}>4</Button>
      <Button onClick={() => handleNumericButtonClick(5)}>5</Button>
      <Button onClick={() => handleNumericButtonClick(6)}>6</Button>
      <Button
        style={selectedOperation === '% Desc' ? selectedButtonStyle : {}}
        onClick={handleDescBtnClick}
      >
        % Desc
      </Button>
      <Button onClick={() => handleNumericButtonClick(7)}>7</Button>
      <Button onClick={() => handleNumericButtonClick(8)}>8</Button>
      <Button onClick={() => handleNumericButtonClick(9)}>9</Button>
      <Button
        style={selectedOperation === 'Precio' ? selectedButtonStyle : {}}
        onClick={handlePrecioBtnClick}
      >
        Precio
      </Button>
      <Button onClick={() => handleNumericButtonClick(0)}>0</Button>
      <Button onClick={handleDecimalButtonClick}>,</Button>
      <Button onClick={handleBackspaceButtonClick}>
        <FaBackspace />
         Back 
      </Button>
      <Button onClick={handleEnterClick}>
        
        <GrReturn />
        Enter
      </Button>
    </SimpleGrid>
    </Flex>
    </Grid>
  )
}

export default NumericButtons
