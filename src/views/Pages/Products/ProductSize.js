import React, { useState, useEffect } from 'react'
import { StyledFormLabel } from 'components/ReusableComponents/ReusableComponents'
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverBody,
  PopoverHeader,
  PopoverArrow,
  PopoverFooter,
  Input,
  Stack,
  useToast,
  useDisclosure,
  RadioGroup,
  Radio,
} from '@chakra-ui/react'

import { IconButton, Icon } from '@chakra-ui/react'
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'

import {
  useGetSizes,
  useCreateSize,
  useUpdateSize,
  useDeleteSize,
} from 'graphql/sizes/crudSizes'

function ProductSize({ formState, handleChange, handleSelectedSizes, selectedSizes }) {
  const toast = useToast()

  const { data: sizesData } = useGetSizes()
  const [createSize, { loading: createLoadingSize }] = useCreateSize()
  const [updateSize, { loading: updateLoadingSize }] = useUpdateSize()
  const [deleteSize, { loading: deleteLoadingSize }] = useDeleteSize()

  const [valueSize, setValueSize] = useState('')
  const [radioValueSize, setRadioValueSize] = React.useState(null)
  const [currentSize, setcurrentSize] = useState([])



  const {
    isOpen: isOpenSize,
    onOpen: onOpenSize,
    onClose: onCloseSize,
  } = useDisclosure()

  const [actionType, setActionType] = useState(null)


  const handleSubmit = async (type, actionType, id = null) => {
    try {
      if (type === 'size') {
        if (actionType === 'create') {
          await createSize({ variables: { name: valueSize } })

          // Muestra un toast de éxito
          toast({
            title: 'Tamaño creado.',
            description: `El tamaño ${valueSize} ha sido creado con éxito.`,
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        } else if (actionType === 'update') {
          await updateSize({ variables: { id, name: valueSize } })

          // Muestra un toast de éxito
          toast({
            title: 'Tamaño actualizado.',
            description: `El tamaño ${valueSize} ha sido actualizado con éxito.`,
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        } else if (actionType === 'delete') {
          await deleteSize({ variables: { id } })

          // Muestra un toast de éxito
          toast({
            title: 'Tamaño eliminado.',
            description: `El tamaño ${valueSize} ha sido eliminado con éxito.`,
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        }

        setValueSize('')
        onCloseSize()
      }
    } catch (error) {
      // Muestra un toast de error si algo va mal

      toast({
        title: 'Error al realizar la acción.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <React.Fragment>
      <Accordion
        allowToggle
        w={{ base: '100%', md: '50%' }}
        pl={{ base: '0', md: '4' }}
        style={{ border: 'none' }}
      >
        <AccordionItem>
          <AccordionButton color="white">
            <Box flex="1" textAlign="left">
              <StyledFormLabel>Tamaños</StyledFormLabel>
            </Box>
            <AccordionIcon color="white" />
          </AccordionButton>
          <AccordionPanel pb={4}>
           
               <RadioGroup onChange={setRadioValueSize} value={radioValueSize}> 
                {sizesData?.sizes?.map((size) => (
                  <Flex
                    key={size.id}
                    align="center"
                    justify="space-between"
                    mb={2}
                  >
                    <Checkbox
                      color="#FFFFFF"
                      value={size.id}
                      isChecked={selectedSizes.includes(size.id)}
                      onChange={event => handleSelectedSizes(size.id, event.target.checked)}
                    >
                      {size.name}
                    </Checkbox>
                    <Radio
                      value={size.id}
                      colorScheme="blue"
                      ml={2}
                      onChange={(e) => {
                        setcurrentSize(size)
                        setRadioValueSize(e.target.value)
                      }}
                    /> 
                  </Flex>
                ))}
               </RadioGroup> 

              <Popover
                placement="bottom"
                closeOnBlur={false}
                isOpen={isOpenSize}
                onOpen={onOpenSize}
                onClose={onCloseSize}
                isLazy
              >
                <Stack direction="row" spacing={2}>
                  <PopoverTrigger>
                    <IconButton
                      aria-label="Add new size"
                      icon={<AddIcon />}
                      onClick={() => {
                        setActionType('create')
                        onOpenSize()
                      }}
                    />
                  </PopoverTrigger>

                  <IconButton
                    aria-label="Edit Size"
                    icon={<EditIcon />}
                    onClick={() => {
                      if (selectedSize) {
                        setValueSize(selectedSize.name)
                        setActionType('update')
                        onOpenSize()
                      }
                    }}
                  />
                  <IconButton
                    aria-label="Delete Size"
                    icon={<DeleteIcon />}
                    onClick={() => {
                      setActionType('delete')
                      handleSubmit('size', 'delete', radioValueSize)
                    }}
                  />
                </Stack>
                <PopoverContent
                  color="white"
                  bg="blue.800"
                  borderColor="blue.800"
                >
                  <PopoverHeader pt={4} fontWeight="bold" border="0">
                    Añadir Talla o Tamaño
                  </PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Stack spacing={4}>
                      <Input
                        name="name"
                        placeholder="Nombre del Size"
                        fontSize="sm"
                        type="text"
                        color="white"
                        value={valueSize}
                        onChange={(e) => setValueSize(e.target.value)}
                      />
                    </Stack>
                  </PopoverBody>

                  <PopoverFooter display="flex" justifyContent="flex-end">
                    <Button
                      colorScheme="blue"
                      onClick={() =>
                        handleSubmit('size', actionType, radioValueSize)
                      }
                      mr={2}
                      size="sm"
                    >
                      {actionType === 'create' ? 'Add' : 'Update'}
                    </Button>
                    <Button size="sm" colorScheme="red" onClick={onCloseSize}>
                      Regresar
                    </Button>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
          
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </React.Fragment>
  )
}

export default ProductSize
