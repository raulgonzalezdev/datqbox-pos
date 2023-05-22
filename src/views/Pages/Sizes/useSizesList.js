import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useGetSizes, useCreateSize, useUpdateSize, DELETE_SIZE } from 'graphql/sizes/crudSizes'
import { GridRowModes } from '@mui/x-data-grid'

export default function useSizesList() {
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

  const { data, loading, error, refetch } = useGetSizes()
  const [createSize, { loading: createLoading }] = useCreateSize()
  const [updateSize, { loading: updateLoading }] = useUpdateSize()
  const DELETE = DELETE_SIZE
  const toast = useToast()

  useEffect(() => {
    if (data && data.sizes) {
      setRows(data.sizes)
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
      setRows(newData.data.sizes)
    } catch (error) {
      console.error('Error refetching data:', error)
    }
  }

  const handleClon = (id) => async () => {
    const rowToClone = rows.find((row) => row.id === id)
    const newSize = {
      name: rowToClone.name,
    }

    try {
      const result = await createSize({ variables: newSize })
      setRows([...rows, { ...result.data.createSize, isNew: false }])
      toast({
        title: 'Success',
        description: 'New Size created successfully',
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
        response = await createSize({ variables: { name: newRow.name } })
      } else {
        response = await updateSize({ variables: { id: newRow.id, name: newRow.name } })
      }

      const updatedRow = { ...newRow, isNew: false }
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
      setRowModesModel({ ...rowModesModel, [newRow.id]: { mode: GridRowModes.View } })
      toast({
        title: newRow.isNew ? 'Size creado' : 'Size ACTUALIZADO',
        description: newRow.isNew ? 'El Size ha sido creado  exitosamente' : 'El Size ha sido ACTUALIZADO exitosamente',
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
    createSize,
    createLoading,
    updateSize,
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