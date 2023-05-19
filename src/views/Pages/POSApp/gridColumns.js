import { GridColDef } from '@mui/x-data-grid'
import { Flex, IconButton } from '@chakra-ui/react'
import { AddIcon, MinusIcon, DeleteIcon } from '@chakra-ui/icons'

export const createColumns = (incrementQuantity, decrementQuantity, deleteRow): GridColDef[] => [
  { field: 'cant', headerName: 'Cant', width: 55, editable: true },
  { field: 'productName', headerName: 'Producto', width: 180 },
  {
    field: 'price',
    headerName: 'Precio',
    width: 140,
    editable: true,
    align: 'right',
    headerAlign: 'right',
  },
  {
    field: 'total',
    headerName: 'Total',
    headerAlign: 'right',
    align: 'right',
    width: 140,
    valueGetter: (params: GridValueGetterParams) => (Number(params.row.cant) * Number(params.row.price)).toFixed(2),
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
        <IconButton aria-label="Incrementar" icon={<AddIcon />} onClick={() => incrementQuantity(params)} cursor="pointer" mx={2} />
        <IconButton aria-label="Decrementar" icon={<MinusIcon />} onClick={() => decrementQuantity(params)} cursor="pointer" mx={2} />
        <IconButton aria-label="Eliminar" icon={<DeleteIcon />} onClick={() => deleteRow(params)} cursor="pointer" mx={2} />
      </Flex>
    ),
  },
]
