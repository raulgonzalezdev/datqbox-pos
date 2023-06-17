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
    Checkbox,
  
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
      field: 'names',
      headerName: 'Nombre',
      width: 200,
      sortable: true,
      renderCell: (params) => (
        <Flex align="center">
          <Box ml={2}>
            <Text>{params.row.firstName + ' ' + params.row.lastName}</Text>
          </Box>
        </Flex>
      ),
    },
   
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      sortable: true,
      renderCell: (params) => (
        <Flex align="center">
          <Box ml={2}>
            <Text>{params.row.email}</Text>
          </Box>
        </Flex>
      ),
    },
  
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 150,
      sortable: true,
      renderCell: (params) => (
        <Flex align="center">
          <Box ml={2}>
            {params.row.avatar && (
              <Image src={params.row.avatar} boxSize="64px" objectFit="cover" />
            )}
          </Box>
        </Flex>
      ),
    },
    {
      field: 'role',
      headerName: 'Rol',
      width: 150,
      sortable: true,
      renderCell: (params) => (
        <Flex align="center">
          <Box ml={2}>
            <Text>{params.row.role}</Text>
          </Box>
        </Flex>
      ),
    },
    {
      field: 'is_superuser',
      headerName: '¿Es superusuario?',
      width: 100,
      sortable: true,
      renderCell: (params) => (
        <Flex align="center">
          <Box ml={2}>
            <Checkbox isChecked={params.row.is_superuser} isReadOnly />
          </Box>
        </Flex>
      ),
    },
    {
      field: 'is_active',
      headerName: '¿Está activo?',
      width: 100,
      sortable: true,
      renderCell: (params) => (
        <Flex align="center">
          <Box ml={2}>
            <Checkbox isChecked={params.row.is_active} isReadOnly />
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
