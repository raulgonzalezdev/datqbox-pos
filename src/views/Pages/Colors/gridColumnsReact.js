import { AddIcon, MinusIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Flex,
  Text,
  Box,
  Avatar,
  Badge,
  IconButton,
  Button,
} from '@chakra-ui/react'

export const createColumns = (editRow, deleteRow, onSelect) => [
  {
    Header: 'Id',
    accessor: 'id',
    Cell: ({ row }) => (
      <Flex align="center">
        <Box ml={2}>
          <Text color="#fff" fontWeight="bold">{row.original.id}</Text>
        </Box>
      </Flex>
    ),
  },
  {
    Header: 'Name',
    accessor: 'name',
    Cell: ({ row }) => (
      <Flex align="center">
        <Box ml={2}>
          <Text color="#fff" fontWeight="bold">{row.original.name}</Text>
        </Box>
      </Flex>
    ),
  },
  {
    Header: 'Vendedor',
    accessor: 'vendor',
    Cell: ({ row }) => (
      <Flex align="center">
        <Box ml={2}>
          <Text fontSize="md" color="#fff" fontWeight="bold">
            {row.original.vendor}
          </Text>
        </Box>
      </Flex>
    ),
  },
  {
    Header: 'Category',
    accessor: 'category',
    Cell: ({ row }) => (
      <Flex align="center">
        <Box ml={2}>
          <Text fontSize="md" color="#fff" fontWeight="bold">
            {row.original.category}
          </Text>
        </Box>
      </Flex>
    ),
  },
  {
    Header: 'Price',
    accessor: 'price',
    Cell: ({ row }) => (
      <Flex align="center">
        <Box ml={2}>
          <Text fontSize="md" color="#fff" fontWeight="bold">
            {row.original.price}
          </Text>
        </Box>
      </Flex>
    ),
  },
  {
    Header: 'TaxRate',
    accessor: 'taxRate',
    Cell: ({ row }) => (
      <Flex align="center">
        <Box ml={2}>
          <Text fontSize="md" color="#fff" fontWeight="bold">
            {row.original.taxRate}
          </Text>
        </Box>
      </Flex>
    ),
  },
  {
    Header: 'New Arrivals',
    accessor: 'newarrivals',
    Cell: ({ row }) => (
      <Badge
        bg={row.original.newarrivals ? 'green.400' : 'transparent'}
        color={row.original.newarrivals ? 'white' : 'gray.400'}
        fontSize="sm"
        p="3px 10px"
        borderRadius="8px"
        border={row.original.newarrivals ? 'none' : '1px solid #fff'}
        fontWeight="normal"
      >
        {row.original.newarrivals ? 'Activo' : 'Inactivo'}
      </Badge>
    ),
  },
  {
    Header: 'Acciones',
    accessor: 'actions',
    Cell: ({ row }) => (
      <Flex justifyContent="space-around">
        <IconButton
          aria-label="Editar"
          icon={<EditIcon />}
          onClick={() => editRow(row.original.id)}
          cursor="pointer"
          mx={2}
        />
        <IconButton
          aria-label="Eliminar"
          icon={<DeleteIcon />}
          onClick={() => deleteRow(row.original.id)}
          cursor="pointer"
          mx={2}
        />
           {/* <Button colorScheme="yellow" onClick={() => onSelect(row.original.id)}>
      Select
    </Button> */}
  </Flex>
),
},
]

