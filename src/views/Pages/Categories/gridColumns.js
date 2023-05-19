import { GridColDef } from '@mui/x-data-grid'
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import {
    Flex,
    Text,
    Box,
    Avatar,
    Badge,
    IconButton,
    Button,
    Image,
  
  } from '@chakra-ui/react'


   export const createColumns = (
    editRow,
    deleteRow,
    onSelect
    
  ): GridColDef[] => [
    {
      field: 'id',
      headerName: 'Id',
      width: 50,
      sortable: true,
      renderCell: (params) => (
        <Flex align="center">
          
          <Box ml={2}>
            <Text >{params.row.id}</Text>
          
          </Box>
        </Flex>
      ),
    },
    {
      field: 'Name',
      headerName: 'Name',
      width: 150,
      sortable: true,
      renderCell: (params) => (
        <Flex align="center">
          
          <Box ml={2}>
            <Text >{params.row.name}</Text>
          
          </Box>
        </Flex>
      ),
    },
    {
      field: 'url',
      headerName: 'Url',
      width: 450,
      sortable: true,
      renderCell: (params) => (
        <Flex align="center">
          
          <Box ml={2}>
            <Text>{params.row.image}</Text>
          
          </Box>
        </Flex>
      ),
    },
    {
      field: 'image',
      headerName: 'image',
      width: 150,
      height: 150,
      sortable: true,
      renderCell: (params) => (
        <Flex align="center">
          <Box ml={2}>
            <Image src={params.row.image} boxSize="64px" objectFit="cover" />
          </Box>
        </Flex>
      ),
    },
    
   
    {
      field: 'actions',
      headerName: 'Acciones',
      headerAlign: 'right',
      align: 'right',
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Flex justifyContent="space-around">
          <IconButton
            aria-label="Editar"
            icon={<EditIcon />}
            onClick={() => editRow(params.row.id)}
            cursor="pointer"
            mx={2}
          />
          
          <IconButton
            aria-label="Eliminar"
            icon={<DeleteIcon />}
            onClick={() => deleteRow(params.row.id)}
            cursor="pointer"
            mx={2}
          />
           <Button colorScheme="yellow" onClick={() => onSelect(params)}>
              Clonar
            </Button> 
        </Flex>
      ),
    },
  ]
