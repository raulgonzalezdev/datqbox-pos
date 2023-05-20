import React, { useState, useEffect, useRef } from 'react'
import { Flex, Button, Box, useToast, HStack, Spinner, Grid } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { StyledText } from 'components/ReusableComponents/ReusableComponents'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import { useGetColor, useCreateColor, useUpdateColor } from 'graphql/color/crudColor'

import ColorInfo from './ColorInfo'

function ColorForm({ colorId, onCancel, onSuccess }) {
  const [formState, setFormState] = useState({
    name: '',
    hexCode: '#0000FF',
  })
  const toast = useToast()
  const { data, loading, error } = useGetColor(colorId, { skip: !colorId })

  const [createColor, { loading: createLoading }] = useCreateColor()
  const [updateColor, { loading: updateLoading }] = useUpdateColor()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (data && data.color) {
      setFormState({
        ...data.color,
        colorId: data.color.id,
        colorselect: data.color.hexCode || '#0000FF',
        nameColor: data.color.name || 'Azul',
      })
    } else if (!colorId) {
      setFormState({
        id: null,
        name: '',
        hexCode: '',
        colorselect: '#0000FF',
        nameColor: 'Azul',
      })
    }
  }, [data, colorId])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    let newcolorId = colorId
    setIsLoading(true)
    const input = {
      name: formState.name,
      hexCode: formState.hexCode,
    }

    try {
      if (colorId) {
        const id = colorId
        await updateColor({ variables: { id, input } })
      } else {
        const newColor = await createColor({ variables: { input } })

        newcolorId = newColor.data.createColor.id
      }
      if (colorId) {
        toast({
          title: 'Color actualizado',
          description: 'El Color ha sido actualizado exitosamente',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Color creado',
          description: 'El Color ha sido creado exitosamente',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }

      setTimeout(() => {
        onSuccess()
      }, 3000)
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    setIsLoading(false)
  }

  if (colorId && loading) return <p>Cargando...</p>

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Formik initialValues={formState} onSubmit={handleSubmit}>
            <Form>
              <Card width={{ base: 'auto', md: '50%', '2xl': '50%' }} marginLeft="10" mt={65} pt={-2} pb={-2}>
                <Box mt={4}>
                  {' '}
                  {/* adjust marginTop as needed */}
                  <HStack width="50%" justifyContent="space-between" spacing={2}>
                    {' '}
                    {/* reduce spacing as needed */}
                    <StyledText fontSize={{ base: '16px', md: '20px' }}>{colorId ? 'Editar Color' : 'Añadir Color'}</StyledText>
                    <Button onClick={onCancel} colorScheme="teal" size={{ base: 'sm', md: 'md' }}>
                      Retornar
                    </Button>
                    <Button type="submit" colorScheme="teal" size={{ base: 'sm', md: 'md' }}>
                      Submit
                    </Button>
                  </HStack>
                </Box>
              </Card>

              <Card pt={5} pb={5} marginLeft="10" width={{ base: 'auto', md: '50%' }}>
                <CardBody width={{ base: 'auto', md: '50%' }} h="100%">
                  <ColorInfo formState={formState} handleChange={handleChange} />
                </CardBody>
                <Flex direction={{ base: 'column', md: 'row' }} justifyContent="space-between" mt="5"></Flex>
              </Card>
            </Form>
          </Formik>
        </>
      )}
    </>
  )
}

export default ColorForm
