import React, { useState, useEffect, useRef } from 'react'
import { Flex, Button, Box, useToast, HStack, Spinner, Grid } from '@chakra-ui/react'
import { gql } from '@apollo/client'
import { ApolloClient, InMemoryCache, useMutation } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { StyledText } from 'components/ReusableComponents/ReusableComponents'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import { useGetCategory, useCreateCategory, useUpdateCategory } from 'graphql/category/crudCategory'
import { Form, Formik } from 'formik'

import CategoryInfo from './ColorInfo'
import CategoryImage from './ColorImage'

function CategoryForm({ categoryId, onCancel, onSuccess }) {
  const [formState, setFormState] = useState({})
  const toast = useToast()
  const { data, loading, error } = useGetCategory(categoryId, { skip: !categoryId })
  const UPLOAD_FILES = gql`
    mutation ($files: [Upload!]!) {
      multipleUpload(files: $files) {
        filename
      }
    }
  `

  const [updateCategory] = useUpdateCategory()
  const [createCategory] = useCreateCategory()
  const [isLoading, setIsLoading] = useState(false)

  const token = localStorage.getItem('authToken')
  const uploadLink = createUploadLink({
    uri: 'http://localhost:4000/graphql', 
    headers: {
      'keep-alive': 'true',
      authorization: token ? `Bearer ${token}` : '',
    },
  })

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: uploadLink,
  })

  useEffect(() => {
    if (data && data.category) {
      setFormState({
        ...data.category,
        categoryId: data.category.id,
      })
    } else if (!categoryId) {
      setFormState({
        id: null,
        name: '',
        image: '',
      })
    }
  }, [data, categoryId])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    let newcategoryId = categoryId
    setIsLoading(true)
    const adjustedFormState = {
      name: formState.name,
      image: formState.image,
    }

    if (formState.image instanceof File) {
      const { data, errors } = await client.mutate({
        mutation: UPLOAD_FILES,
        variables: { files: [formState.image] },
      })

      // Comprueba si hubo errores
      if (errors) {
        console.error('Error uploading file:', errors)
        return
      }
      const filename = data.multipleUpload[0].filename
      const imageUrl = `http://localhost:4000/uploads/${filename}`

      // Actualiza el estado del formulario con la URL de la imagen
      adjustedFormState.image = imageUrl
    }

    try {
      if (categoryId) {
        await updateCategory({
          variables: { id: categoryId, input: adjustedFormState },
        })
      } else {
        const newCategory = await createCategory({
          variables: { input: adjustedFormState },
        })
        newcategoryId = newCategory.data.createCategory.id
      }
      if (categoryId) {
        toast({
          title: 'Category actualizado',
          description: 'La Categoria ha sido actualizado exitosamente',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Category creado',
          description: 'La Categoria ha sido creado exitosamente',
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

  if (categoryId && loading) return <p>Cargando...</p>

  return (
    <>
      {isLoading ? (
        <Spinner /> // Muestra el spinner si isLoading es true
      ) : (
        <>
          <Formik initialValues={formState} onSubmit={handleSubmit}>
            <Form>
              <Card
                width={{ base: 'auto', md: '93.5%', '2xl': '95%' }}
                marginLeft="10"
                mt={55}
                pt={-2} // reduce padding-top if needed
                pb={-2} // reduce padding-bottom if needed
              >
                <Box mt={2}>
                  {' '}
                  {/* adjust marginTop as needed */}
                  <HStack width="100%" justifyContent="space-between" spacing={2}>
                    {' '}
                    {/* reduce spacing as needed */}
                    <StyledText fontSize={{ base: '16px', md: '20px' }}>{categoryId ? 'Editar Categoria' : 'Añadir Categoria'}</StyledText>
                    <Button onClick={onCancel} colorScheme="teal" size={{ base: 'sm', md: 'md' }}>
                      Retornar
                    </Button>
                    <Button type="submit" colorScheme="teal" size={{ base: 'sm', md: 'md' }}>
                      Submit
                    </Button>
                  </HStack>
                </Box>
              </Card>

              <Grid templateColumns={{ sm: '1fr', md: '2fr 1fr', lg: '1fr 1fr' }} my="26px" gap="18px" marginLeft="10" marginRight="10" marginTop="2">
                <Card width={{ base: 'auto', md: '100%' }}>
                  <CardBody width={{ base: 'auto', md: '100%' }} h="100%">
                    <CategoryInfo formState={formState} handleChange={handleChange} setFormState={setFormState} />
                  </CardBody>
                  <Flex direction={{ base: 'column', md: 'row' }} justifyContent="space-between" mt="5"></Flex>
                </Card>
                <Card width={{ base: 'auto', md: '100%' }}>
                  <CardBody width={{ base: 'auto', md: '100%' }}>
                    <Flex direction={{ base: 'column', md: 'row' }} justifyContent="space-between">
                      <CategoryImage formState={formState} categoryId={categoryId} handleChange={handleChange} />
                    </Flex>
                  </CardBody>
                </Card>
              </Grid>
            </Form>
          </Formik>
        </>
      )}
    </>
  )
}

export default CategoryForm
