import React, { useState, useEffect } from 'react'
import { Box, Image, VStack,  useBreakpointValue } from '@chakra-ui/react'
import {  StyledText, StyledInput, StyledFormLabel } from 'components/ReusableComponents/ReusableComponents'
import { useDropzone } from 'react-dropzone'


function UserImage({ formState, userId,  handleChange }) {

  const [mainImage, setMainImage] = useState(null)
  const [image, setImage] = useState([])

  const {
    getRootProps: getMainRootProps,
    getInputProps: getMainInputProps,
    acceptedFiles: mainAcceptedFiles,
    fileRejections: mainFileRejections,
  } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/svg+xml': ['.svg'],
      'image/jpg': ['.jpg']
    }
    ,
    maxSize: 5 * 1024 * 1024,
    maxFiles: 1, // Asegúrate de aceptar solo una imagen
    onDrop: (acceptedFiles) => {
      const mainImage = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      })
      setMainImage(mainImage)
      // Construir la URL de la imagen con el nombre del archivo
      const filename = mainImage.name
      const imageUrl = `http://localhost:4000/uploads/${filename}`

      // Actualizar el campo image en tu estado de formulario con la URL de la imagen
       formState.image = mainImage
    },
  })

  useEffect(() => {
    mainFileRejections.forEach(({ file, errors }) => {
      errors.forEach((error) => {
        switch (error.code) {
          case 'file-invalid-type':
            console.error(`'${file.path}' no es un tipo de archivo válido.`)
            break
          case 'file-too-large':
            console.error(`'${file.path}' es demasiado grande.`)
            break
          default:
            console.error(`Error desconocido: ${error.code}`)
            break
        }
      })
    })
  }, [mainFileRejections])

  
  const imageSize = useBreakpointValue({ base: '150px', md: '250px' })

 

  return (
    
      <VStack>
        <StyledText fontSize={{ base: '14px', md: '16px' }} alignSelf="flex-start">
          {userId ? 'Foto Principal' : 'Foto Principal'}
        </StyledText>
        <Box mt="-0.5" style={{ borderRadius: '8px' }}>
          <Image
            src={mainImage?.preview || formState.avatar || 'https://via.placeholder.com/350'}
            objectFit="cover"
            boxSize={imageSize}
            style={{ borderRadius: '8px' }}
          />
        </Box>
        <Box>
          <Box
            {...getMainRootProps()}
            border="1px dashed gray"
            borderRadius="8px"
            backgroundColor="transparent"
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StyledFormLabel cursor="pointer">Url Imagen</StyledFormLabel>
            <input placeholder="Arrastre y suelte aquí las imágenes" {...getMainInputProps()} style={{ display: 'none' }} />
            <StyledInput
              name="image"
              value={formState.image || ''}
              // type="file"
              onChange={handleChange}
              // onChange={handleChange}
              placeholder="Ingrese el url de la imagen"
            />
          </Box>
        </Box>
      </VStack>
     
 
  )
}

export default UserImage
