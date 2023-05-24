import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useGetInvoices, useCreateInvoice, useUpdateInvoice, DELETE_INVOICE } from 'graphql/invoice/crudInvoice'
import { GridRowModes } from '@mui/x-data-grid'

export default function useInvoices() {
  const [rowModesModel, setRowModesModel] = useState({})
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [Id, setId] = useState(null)
  const [rows, setRows] = useState([])
  const [invoiceItems, setInvoiceItems] = useState([])
  const [selectedInvoice, setSelectedInvoice] = useState(null)

  const [searchValue, setSearchValue] = useState('')
  const [initialLoad, setInitialLoad] = useState(true)
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 15,
    page: 0,
  })

  const { data = {}, loading, error, refetch } = useGetInvoices()
  const [create, { loading: createLoading }] = useCreateInvoice()
  const [update, { loading: updateLoading }] = useUpdateInvoice()
  const DELETE = DELETE_INVOICE
  const toast = useToast()

  useEffect(() => {
    if (data && data.getAllInvoices) {
      const flattenedInvoices = flattenInvoiceData(data.getAllInvoices)
      setInitialLoad(false)
    }
  }, [data])

  const flattenInvoiceData = (invoices) => {
    const flatInvoices = invoices.map((invoice) => {
      const company = invoice.companies && invoice.companies.length > 0 ? invoice.companies[0].name : 'N/A'
      const branch = invoice.branch ? invoice.branch.name : 'N/A'
      const paymentMethod = invoice.paymentMethod ? invoice.paymentMethod.name : 'N/A'
      const invoiceItems =
        invoice.invoiceItems && invoice.invoiceItems.length > 0
          ? invoice.invoiceItems.map((item) => ({
              id: item.id,
              sku: item.product.sku,
              description: item.product.description,
              price: item.price,
              quantity: item.quantity,
              product: item.product.name,
              total: item.price * item.quantity,
            }))
          : []

      return {
        id: invoice.id,
        userId: invoice.user.id,
        userFirstName: invoice.user.firstName,
        userLastName: invoice.user.lastName,
        userEmail: invoice.user.email,
        companyName: company,
        branchName: branch,
        paymentMethodName: paymentMethod,
        invoiceItems: invoiceItems,
        total: invoice.total,
        tax: invoice.tax,
        status: invoice.status,
        createdAt: invoice.createdAt,
      }
    })

    const flatInvoiceItems = invoices.flatMap((invoice) => invoice.invoiceItems || [])
    setRows(flatInvoices)
    setInvoiceItems(flatInvoiceItems)
  }

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
      if (newData && newData.data && newData.data.getAllInvoices) {
        // setRows(newData.data.getAllInvoices)
        const flattenedInvoices = flattenInvoiceData(newData.data.getAllInvoices)
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
        address: rowToClone.address,
        phoneNumber: rowToClone.phoneNumber,
        email: rowToClone.email,
        legalId: rowToClone.legalId,
      },
    }

    try {
      const result = await create({ variables: newRow })
      const newId = result
      console.log(newId)
      setRows([...rows, { ...result.data.addCompany, isNew: true }])
      toast({
        title: 'Success',
        description: 'New Invoices created successfully',
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
            address: newRow.address,
            phoneNumber: newRow.phoneNumber,
            email: newRow.email,
            legalId: newRow.legalId,
          },
        }

        response = await create({ variables: rowNew })
      } else {
        const rowUpdate = {
          id: newRow.id,
          input: {
            name: newRow.name,
            address: newRow.address,
            phoneNumber: newRow.phoneNumber,
            email: newRow.email,
            legalId: newRow.legalId,
          },
        }

        response = await update({ variables: rowUpdate })
      }

      const updatedRow = { ...newRow, isNew: false }
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
      setRowModesModel({ ...rowModesModel, [newRow.id]: { mode: GridRowModes.View } })
      toast({
        title: newRow.isNew ? 'Invoice creado' : 'companies Actualizado',
        description: newRow.isNew ? 'El invoice ha sido creado  exitosamente' : 'El Invoice ha sido Actualiado exitosamente',
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
  const handleRowSelected = (params) => {
    console.log('parems', params)
    const selected = rows.find((row) => row.id === params.id)
    setSelectedInvoice(selected)
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
    handleRowSelected,
    setSelectedInvoice,
    selectedInvoice,
    DELETE,
    invoiceItems,
  }
}
