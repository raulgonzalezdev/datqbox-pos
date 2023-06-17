import React from 'react'
import { StyledInput, StyledFormLabel, StyledSelect } from 'components/ReusableComponents/ReusableComponents'
import { Box, Grid, Checkbox,  FormControl, Text, FormHelperText } from '@chakra-ui/react'

function UserInfo({ formState, handleChange }) {
  return (
    <React.Fragment>
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
        <Box>
          <StyledFormLabel>Nombre</StyledFormLabel>
          <StyledInput
            name="firstName"
            value={formState.firstName || ''}
            onChange={handleChange}
            placeholder="Ingrese el nombre"
          />
        </Box>

        <Box>
          <StyledFormLabel>Apellido</StyledFormLabel>
          <StyledInput
            name="lastName"
            value={formState.lastName || ''}
            onChange={handleChange}
            placeholder="Ingrese el apellido"
          />
        </Box>

        <Box>
          <StyledFormLabel>Email</StyledFormLabel>
          <StyledInput
            name="email"
            value={formState.email || ''}
            onChange={handleChange}
            placeholder="Ingrese el email"
          />
        </Box>

        <Box>
          <StyledFormLabel>Contraseña</StyledFormLabel>
          <StyledInput
            name="password"
            value={formState.password || ''}
            onChange={handleChange}
            placeholder="Ingrese la contraseña"
          />
        </Box>

        <Box>
          <StyledFormLabel>Avatar</StyledFormLabel>
          <StyledInput
            name="avatar"
            value={formState.avatar || ''}
            onChange={handleChange}
            placeholder="Ingrese el avatar"
          />
        </Box>

        <Box>
          <FormControl>
            <StyledFormLabel>Rol</StyledFormLabel>
            <StyledSelect name="role" value={formState.role || ''} onChange={handleChange}>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Guest">Guest</option>
            </StyledSelect>
            <FormHelperText>Seleccione el rol</FormHelperText>
          </FormControl>
        </Box>

        <Box>
          <FormControl>
            <StyledFormLabel>¿Es superusuario?</StyledFormLabel>
            <Checkbox
              name="is_superuser"
              isChecked={formState.is_superuser || false}
              onChange={handleChange}
              colorScheme="black" size="lg"
            >
               <Text color="white" fontSize="lg">
               Sí
              </Text>
            </Checkbox>
          </FormControl>
        </Box>

        <Box>
          <FormControl>
            <StyledFormLabel>¿Está activo?</StyledFormLabel>
            <Checkbox colorScheme="black" size="lg" name="is_active" isChecked={formState.is_active || false} onChange={handleChange}>
            <Text color="white" fontSize="lg">
               Sí
              </Text>
            </Checkbox>
          </FormControl>
        </Box>
      </Grid>
    </React.Fragment>
  )
}

export default UserInfo
