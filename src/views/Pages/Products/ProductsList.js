import React, { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import DataTable from 'components/Tables/DataTable'
import { useGetProducts, DELETE_PRODUCT, useCreateProduct } from 'graphql/products/crudProducts'
import DeleteAlert from 'components/DeleteAlert/DeleteAlert'

import { createColumns } from './gridColumns'
import ProductForm from './ProductForm'

const ProductsList = ({ ptValue, onProductSelect, loadedProducts }) => {
  const [createProduct, { loading: createLoading }] = useCreateProduct()
  const toast = useToast()

  const editRow = (rowData) => {
    setShowProductForm(true)
    setProductId(rowData)
  }
  const deleteRow = (rowData) => {
    setProductId(rowData)
    setShowDeleteAlert(true)
  }

  const handleProductDoubleClick = (rowData) => {
 
    if (onProductSelect) {
      onProductSelect(rowData)
    }
  }

  const handleSelect = async (rowData) => {
    let expirationDate

      if (rowData.row.expirationDate !== null) {
        const expirationDateMillis = Number(rowData.row.expirationDate)
        if (!isNaN(expirationDateMillis)) {
          expirationDate = new Date(expirationDateMillis).toISOString().split('T')[0]
        }
      }

    const newProduct = {
      name: rowData.row.name,
      vendor: rowData.row.vendor,
      sku: rowData.row.sku,
      description: rowData.row.description,
      image: rowData.row.image,
      price: parseFloat(rowData.row.price),
      inventory: parseFloat(rowData.row.inventory),
      rentalType: rowData.row.rentalType,
      featured: rowData.row.featured,
      taxInclued: rowData.row.taxInclued,
      newarrivals: rowData.row.newarrivals,
      taxRate: parseFloat(rowData.row.taxRate),
      categoryId: rowData.row.category.id,
      unit: rowData.row.unit,
      exchangeRateId: rowData.row.exchangeRate.currencyId,
      requiresPrescription: rowData.row.requiresPrescription,
      expirationDate: expirationDate,
      dosage: rowData.row.dosage,
      usageInstructions:rowData.row.usageInstructions,
      contraindications:rowData.row.contraindications,
      activeIngredient:rowData.row.activeIngredient,
    }
     //console.log({ variables: { input: newProduct } })

    try {
      const result = await createProduct({ variables: { input: newProduct } })

      // Update the UI to reflect the new product
      setRows([...rows, result.data.createProduct])

      // Show success toast
      toast({
        title: 'Success',
        description: 'New product created successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error creating new product:', error)

      // Show error toast
      toast({
        title: 'Error',
        description: 'Error creating new product: ' + error,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  const columns = createColumns(editRow, deleteRow, handleSelect)

  const [initialLoad, setInitialLoad] = useState(true)
  const { data, loading, error, refetch } = useGetProducts({
    skip: !!loadedProducts,
  })

  const [showProductForm, setShowProductForm] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [productId, setProductId] = useState(null)

  const [rows, setRows] = useState([])

  useEffect(() => {
    
    const productsData = loadedProducts || (data && data.products)
    if (productsData) {
      setRows(productsData)
      setInitialLoad(false)
    }
  }, [data, loadedProducts])



  const handleConfirmDelete = async () => {
    try {
      const result = await refetch()

      setShowProductForm(false)
    } catch (error) {
      console.error('Refetch error:', error)
    } finally {
      setShowDeleteAlert(false)
      setProductId(null)
    }
  }

  const handleAdd = () => {
    console.log('Add new record')
    setProductId(null)
    setShowProductForm(true)
  }

  const handleCancel = () => {
    setShowProductForm(false)
  }

  const handleSuccess = (newProduct) => {
    setShowProductForm(false)
    refetch()
  }

  const handleCloseDeleteAlert = () => {
    setShowDeleteAlert(false)
    setProductId(null)
  }

  const handleRowSelect = (params) => {
    handleProductDoubleClick(params.row)
  }

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <DeleteAlert
        modelName="producto"
        isOpen={showDeleteAlert}
        onClose={handleCloseDeleteAlert}
        mutation={DELETE_PRODUCT}
        id={productId}
        handleConfirm={handleConfirmDelete}
      />

      {showProductForm ? (
        <ProductForm productId={productId} onCancel={handleCancel} onSuccess={handleSuccess} />
      ) : (
        <DataTable
          title="Lista de Productos o Servicios"
          columns={columns}
          data={rows}
          onAdd={handleAdd}
          onSelect={handleSelect}
          onDelete={deleteRow}
          onRowDoubleClick={handleRowSelect}
          refetchData={() => refetch()}
          ptValue={ptValue}
        />
      )}
    </>
  )
}

export default ProductsList
