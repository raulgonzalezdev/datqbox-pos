import React, { useState, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  Flex,
  IconButton,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { MdSave, MdCancel, MdDelete, MdOutlineBorderColor, MdFolderCopy } from 'react-icons/md'
import { DataGrid, GridRowModes, GridActionsCellItem } from '@mui/x-data-grid'
import { ThemeProvider } from '@mui/material/styles'
import taxTableTheme from 'theme/themeTableMUI'
import ProductList from 'views/Pages/Products/ProductsList'
import { useGetCompositeProductItems } from 'graphql/compositeproductitems/crudCompositeProductItems'

const SelectedProductsList = ({ selectedProducts, setSelectedProducts }) => {
  const [rowModesModel, setRowModesModel] = useState({})
  const [rows, setRows] = useState([])

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 15,
    page: 0,
  })

  useEffect(() => {
    const products = selectedProducts.map((product) => {
      return {
        id: product.id,
        includedProductId: product.includedProduct.id,
        name: product.includedProduct.name,
        price: product.includedProduct.price,
        quantity: product.quantity,
        isNew: false,
      }
    })

    setRows(products)
  }, [selectedProducts])

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true
  }

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true
  }

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id))
  }

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    })

    const editedRow = rows.find((row) => row.id === id)
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id))
    }
  }
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel)
  }

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false }
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
    setSelectedProducts(
      selectedProducts.map((row) =>
        row.id === newRow.id
          ? { ...row, quantity: newRow.quantity }
          : row
      )
    )
    
    return updatedRow
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'includedProductId', headerName: 'includedProductId', width: 70 },
    
    { field: 'name', headerName: 'Nombre', width: 130 },
    { field: 'price', headerName: 'Precio', width: 130 },
    {
      field: 'quantity',
      headerName: 'quantity',
      width: 130,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem icon={<MdSave size={20} />} onClick={handleSaveClick(id)} />,
            <GridActionsCellItem icon={<MdCancel size={20} />} onClick={handleCancelClick(id)} />,
          ]
        }

        return [
          <GridActionsCellItem icon={<MdOutlineBorderColor size={20} />} className="textPrimary" onClick={handleEditClick(id)} color="inherit" />,
          <GridActionsCellItem
            icon={<MdDelete size={20} />}
            onClick={() => {
              handleDeleteClick(id)()
            }}
            color="inherit"
          />,
        ]
      },
    },
  ]

  return (
    <ThemeProvider theme={taxTableTheme}>
      <Box height="500px" width="100%">
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[15, 25, 30, 50, 75, 100]}
          autoHeight
        />
      </Box>
    </ThemeProvider>
  )
}

function ProductComposite({ isOpen, onClose, onProductSelect, loadedProducts, formState }) {
  const { data, loading, error } = useGetCompositeProductItems(formState.id)
 

  const [selectedProducts, setSelectedProducts] = useState([])

  useEffect(() => {
    if (data) {
      const updatedProducts = data.compositeProducts || []
      setSelectedProducts(updatedProducts)
    }
  }, [data])


const handleRowDoubleClick = (row) => {
  setSelectedProducts((prevProducts) => [
    ...prevProducts,
    {
      isNew: true,
      quantity: 1,
      includedProduct: {
        id: row.id,
        includedProductId: row.id,
        name: row.name,
        price: row.price,
      },
      
      ...row,
    },
  ])
}




  const handleSubmit = () => {

    console.log('selectedProducts antes submit', selectedProducts)
    const allProducts = selectedProducts.map((product) => {
      return {
        __typename: 'CompositeProductItems',
        id: product.includedProduct.id,
        quantity: product.quantity,
        isNew: product.isNew ,
        includedProduct: {
          __typename: 'Product',
          id: product.id,
          includedProductId: product.includedProduct.id,
          name: product.includedProduct.name,
          price: product.includedProduct.price,
          // Añade cualquier otra propiedad que necesites aquí
        },
      }
    })
    onClose()
    console.log('allProducts', allProducts)
    onProductSelect(allProducts)
  }
  

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={'inside'}>
      <ModalOverlay />
      <ModalContent maxW="90rem" color="white" bg="rgb(19,21,56)" borderRadius="15px">
        <ModalHeader>Productos Compuestos</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction={['column', 'row']}>
            <Box flexBasis={['100%', '50%']}>
           
              <SelectedProductsList selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
            </Box>
            <Box flexBasis={['100%', '50%']} pr={[0, 4]}>
              <ProductList ptValue={'0px'} onProductSelect={handleRowDoubleClick} />
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ProductComposite
