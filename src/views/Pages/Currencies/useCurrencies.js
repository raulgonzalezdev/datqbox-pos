import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useGetCurrencyTypes, useCreateCurrencyType, useUpdateCurrencyType, DELETE_CURRENCY_TYPE } from 'graphql/currencies/crudCurrencies'
import { GridRowModes } from '@mui/x-data-grid'

export default function useCurrencyTypes() {
  const [rowModesModel, setRowModesModel] = useState({})
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [Id, setId] = useState(null)
  const [rows, setRows] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [initialLoad, setInitialLoad] = useState(true)
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 15,
    page: 0,
  })

  const { data = {}, loading, error, refetch }  = useGetCurrencyTypes()
  const [create, { loading: createLoading }] = useCreateCurrencyType()
  const [update, { loading: updateLoading }] = useUpdateCurrencyType()
  const DELETE = DELETE_CURRENCY_TYPE
  const toast = useToast()

  useEffect(() => {
    if (data && data.getAllCurrencyTypes) {
      setRows(data.getAllCurrencyTypes)
      setInitialLoad(false)
    }
  }, [data])

  useEffect(() => {
    if (Id !== null) {
      setShowDeleteAlert(true)
    }
  }, [Id])

  const handleCloseDeleteAlert = () => {
    setShowDeleteAlert(false)
    setId(null)
  }

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true
  }

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true
  }

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = (id) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const refetchData = async () => {
    try {
      const newData = await refetch()
      if (newData && newData.data && newData.data.getAllCurrencyTypes) {
        setRows(newData.data.getAllCurrencyTypes)
      }
    } catch (error) {
      console.error('Error refetching data:', error)
    }
  }
  

  const handleClon = (id) => async () => {
    const rowToClone = rows.find((row) => row.id === id)
    const newRow = {
      input: {
        name: rowToClone.name,
        rate: rowToClone.rate,
       
      },
    }

    try {
      const result = await create({ variables: newRow })
      const newId = result
      console.log(newId)
      setRows([...rows, { ...result.data.addCurrencyType, isNew: true }])
      toast({
        title: 'Success',
        description: 'New CurrencyTypees created successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error creating new product:', error)
      toast({
        title: 'Error',
        description: 'Error creating new product: ' + error,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  const handleDeleteClick = (id) => () => {
    setId(id)
  }

  const handleConfirmDelete = async (id, setRows) => {
    try {
      const result = await refetch()
      setRows(rows.filter((row) => row.id !== id))
    } catch (error) {
      console.error('Refetch error:', error)
    } finally {
      setShowDeleteAlert(false)
      setId(null)
    }
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

  const processRowUpdate = async (newRow) => {
    let response

    try {
      if (newRow.isNew) {
        const rowNew = {
          input: {
            name: newRow.name,
            rate: newRow.symbol,
          
          },
        }

        response = await create({ variables: rowNew })
      } else {
        const rowUpdate = {
          id: newRow.id,
          input: {
            name: newRow.name,
            rate: newRow.symbol,
          
          },
        }

        
        response = await update({ variables: rowUpdate })
      }

      const updatedRow = { ...newRow, isNew: false }
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
      setRowModesModel({ ...rowModesModel, [newRow.id]: { mode: GridRowModes.View } })
      toast({
        title: newRow.isNew ? 'CurrencyTypees creado' : 'CurrencyTypees Actualizado',
        description: newRow.isNew ? 'El CurrencyTypees ha sido creado  exitosamente' : 'El CurrencyTypees ha sido Actualiado exitosamente',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      return updatedRow
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel)
  }

  return {
    rowModesModel,
    setRowModesModel,
    showDeleteAlert,
    setShowDeleteAlert,
    Id,
    setId,
    rows,
    setRows,
    searchValue,
    setSearchValue,
    initialLoad,
    setInitialLoad,
    data,
    loading,
    error,
    refetch,
    create,
    createLoading,
    update,
    updateLoading,
    paginationModel,
    setPaginationModel,
    handleCloseDeleteAlert,
    handleRowEditStart,
    handleRowEditStop,
    handleEditClick,
    handleSaveClick,
    refetchData,
    handleClon,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelClick,
    processRowUpdate,
    handleRowModesModelChange,
    DELETE,
  }
}
