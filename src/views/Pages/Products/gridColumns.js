import { GridColDef } from '@mui/x-data-grid'
import { MdSave, MdCancel, MdDelete, MdOutlineBorderColor, MdFolderCopy } from 'react-icons/md'
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
      field: 'nameDescription',
      headerName: 'Description',
      width: 200,
      sortable: true,
      renderCell: (params) => (
        <Flex align="center">
          <Box ml={2}>
            <Text>{`${params.row.name} - ${params.row.description}`}</Text>
          </Box>
        </Flex>
      ),
    },
    
    
    {
      field: 'price',
      headerName: 'price $',
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
      field: 'pricelocal',
      headerName: 'Price Local',
      width: 100,
      sortable: true,
      align: 'right',
      renderCell: (params) => (
        <Flex align="center" justifyContent="flex-end">
          <Box ml={2}>
            <Text>
              {params.row.price && params.row.exchangeRate && params.row.exchangeRate.rate
                ? (params.row.price * params.row.exchangeRate.rate).toLocaleString()
                : ''}
            </Text>
          </Box>
        </Flex>
      ),
    },
    


    {
      field: 'exchangeRate',
      headerName: 'Exchange',
      width: 100,
      sortable: true,
      align: 'right',
      renderCell: (params) => (
        <Flex align="center" justifyContent="flex-end">
          <Box ml={2}>
            <Text >
            {params.row.exchangeRate.rate.toLocaleString()}
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
            icon={<MdOutlineBorderColor size={20} />}
            onClick={() => editRow(params.row.id)}
            cursor="pointer"
            mx={2}
          />
          
          <IconButton
            aria-label="Eliminar"
            icon={<MdDelete size={20} />}
            onClick={() => deleteRow(params.row.id)}
            cursor="pointer"
            mx={2}
            
          />
          

            <IconButton
            aria-label="Editar"
            icon={<MdFolderCopy size={20} />}
            onClick={() => onSelect(params)}
            cursor="pointer"
            mx={2}
          />
        </Flex>
      ),
    },
  ]
