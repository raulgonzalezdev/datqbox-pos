import React from 'react'
import {
  StyledInput,
  StyledFormLabel,

} from 'components/ReusableComponents/ReusableComponents'
import { Box,  Grid, Text,  } from '@chakra-ui/react'


function ProductInfo({
  formState,
  handleChange,

}) {
  
  
  // const [formState, setFormState] = useState({});

  
  return (
    <React.Fragment>
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
        <Box>
          <StyledFormLabel>Nombre Categoria</StyledFormLabel>
          <StyledInput
            name="name"
            value={formState.name || ''}
            onChange={handleChange}
            placeholder="Ingrese el Nombre Categoria"
          />
        </Box>

        <Box>
          <StyledFormLabel>Url Imagen</StyledFormLabel>
          <StyledInput
            name="image"
            value={formState.image || ''}
            onChange={handleChange}
            placeholder="Ingrese el nombre del producto"
          />
        </Box>

        
        
      </Grid>
    </React.Fragment>
  )
}

export default ProductInfo
