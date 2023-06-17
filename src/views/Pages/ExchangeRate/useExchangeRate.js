import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useGetExchangeRateByCurrencyId,useUpdateExchangeRate, useCreateExchangeRate, DELETE_EXCHANGE_RATE } from 'graphql/exchangerate/crudExchangerate'
import { GridRowModes } from '@mui/x-data-grid'


export default function useExchangeRateFactory(selectedCurrency) {


const useExchangeRate = ()  => {

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


  const { data = {}, loading, error, refetch }  = useGetExchangeRateByCurrencyId(selectedCurrency)
  const [create, { loading: createLoading }] = useCreateExchangeRate()
  const [update, { loading: updateLoading }] = useUpdateExchangeRate()
  const DELETE = DELETE_EXCHANGE_RATE
  const toast = useToast()

  useEffect(() => {
    if (data && data.getExchangeRateByCurrencyId) {
      // Desestructurar los valores necesarios
      const rows = data.getExchangeRateByCurrencyId.map(item => {
        const { id, date, rate, currencyId, currencyType: { name, symbol } } = item
        
        return {
          id,
          date,
          rate,
          currencyId,
          name,
          symbol
        }
      })
  
      setRows(rows)
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
      if (newData && newData.data && newData.data.getExchangeRate) {
        setRows(newData.data.getExchangeRate)
      }
    } catch (error) {
      console.error('Error refetching data:', error)
    }
  }

  const handleClon = (id) => async () => {
    const rowToClone = rows.find((row) => row.id === id)
    const newRow = {
      input: {
        currencyId: rowToClone.currencyId,
        rate: rowToClone.rate,
        date: rowToClone.date,
      },
    }

    try {
      const result = await create({ variables: newRow })
      setRows([...rows, { ...result.data.getExchangeRateByCurrencyId, isNew: true }])
      toast({
        title: 'Success',
        description: 'New ExchangeRates created successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error creating new ExchangeRates:', error)
      toast({
        title: 'Error',
        description: 'Error creating new ExchangeRates: ' + error,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  const handleDeleteClick = (id) => () => {
    setId(id)
  }

  const handleConfirmDelete = async (id) => {
    try {
      const result = await refetch()
      if (result && result.data && result.data.getExchangeRateByCurrencyId) {
        setRows(result.data.getExchangeRateByCurrencyId.filter((row) => row.id !== id))
      }
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
            currencyId: newRow.currencyId,
            rate: newRow.rate,
            date: newRow.date,
          },
        }

        response = await create({ variables: rowNew })
      } else {
        const rowUpdate = {
          id: newRow.id,
          input: {
            currencyId: newRow.currencyId,
            rate: newRow.rate,
            date: newRow.date,
          },
        }

        response = await update({ variables: rowUpdate })
      }

      const updatedRow = { ...newRow, isNew: false }
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
      setRowModesModel({ ...rowModesModel, [newRow.id]: { mode: GridRowModes.View } })
      toast({
        title: newRow.isNew ? 'ExchangeRates creado' : 'ExchangeRates Actualizado',
        description: newRow.isNew ? 'El ExchangeRates ha sido creado  exitosamente' : 'El ExchangeRates ha sido Actualiado exitosamente',
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

return useExchangeRate
}
