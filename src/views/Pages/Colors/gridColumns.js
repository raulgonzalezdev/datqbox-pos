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
      field: 'sku',
      headerName: 'Sku',
      width: 150,
      sortable: true,
      renderCell: (params) => (
        <Flex align="center">
          
          <Box ml={2}>
            <Text >{params.row.sku}</Text>
          
          </Box>
        </Flex>
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      sortable: true,
      renderCell: (params) => (
        <Flex align="center">
          
          <Box ml={2}>
            <Text>{params.row.name}</Text>
          
          </Box>
        </Flex>
      ),
    },
    {
      field: 'description',
      headerName: 'description',
      width: 150,
      sortable: true,
      renderCell: (params) => (
        <Flex align="center">
          
          <Box ml={2}>
            <Text>{params.row.description}</Text>
          
          </Box>
        </Flex>
      ),
    },
    {
      field: 'vendor',
      headerName: 'Vendedor',
      width: 100,
      sortable: true,
      renderCell: (params) => (
        <Flex align="center">
          <Box ml={2}>
            <Text >
              {params.row.vendor}
            </Text>
            
          </Box>
        </Flex>
      ),
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 100,
      sortable: true,
      renderCell: (params) => (
        <Flex align="center">
          <Box ml={2}>
            <Text >
              {params.row.category.name}
            </Text>
            
          </Box>
        </Flex>
      ),
    },
    {
      field: 'price',
      headerName: 'price',
      width: 100,
      sortable: true,
      align: 'right',
      renderCell: (params) => (
        <Flex align="center" justifyContent="flex-end">
          <Box ml={2}>
            <Text >
            {params.row.price.toLocaleString()}
            </Text>
            
          </Box>
        </Flex>
      ),
    },
    {
      field: 'taxrate',
      headerName: 'TaxRate',
      width: 100,
      sortable: true,
      align: 'right',
      renderCell: (params) => (
        <Flex align="center" justifyContent="flex-end">
          <Box ml={2}>
            <Text >
            {params.row.price.toLocaleString()}
            </Text>
            
          </Box>
        </Flex>
      ),
    },
    {
      field: 'newarrivals',
      headerName: 'New Arrivals',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Badge
          bg={params.row.newarrivals  ? 'green.400' : 'transparent'}
          color={params.row.newarrivals ? 'white' : 'gray.400'}
          fontSize="sm"
          p="3px 10px"
          borderRadius="8px"
          border={params.row.newarrivals  ? 'none' : '1px solid #fff'}
          fontWeight="normal"
        >
          {params.row.newarrivals ? 'Activo' : 'Inactivo'}
        </Badge>
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
