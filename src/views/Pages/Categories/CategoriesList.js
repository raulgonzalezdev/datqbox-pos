import React, { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import DataTable from 'components/Tables/DataTable'
import {
  useGetCategories,
  DELETE_CATEGORY,
  useCreateCategory,
} from 'graphql/category/crudCategory'
import DeleteAlert from 'components/DeleteAlert/DeleteAlert'

import { createColumns } from './gridColumns'
import CategoryForm from './CategoryForm'



const CategoriesList = () => {
  const [createCategory, { loading: createLoading }] = useCreateCategory()
  const toast = useToast()

  const editRow = (rowData) => {

    setShowCategoryForm(true)
    setcategoryId(rowData)
  }
  const deleteRow = (rowData) => {
   
    setcategoryId(rowData)
    setShowDeleteAlert(true)
  }

  const handleSelect = async (rowData) => {
    
  
    const newCategory = { 
      name: rowData.row.name,
      image: rowData.row.image,
     
  }
  
  
   
    try {
      const result = await createCategory({ variables: { input: newCategory } })
     
  
      // Update the UI to reflect the new product
      setRows([...rows, result.data.createCategory])

      // Show success toast
      toast({
        title: 'Success',
        description: 'New Category created successfully',
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
  const { data, loading, error, refetch } = useGetCategories({
    skip: !initialLoad,
  })

  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [categoryId, setcategoryId] = useState(null)



  const [rows, setRows] = useState([])


  useEffect(() => {
    if (data && data.categories) {
      setRows(data.categories)
      setInitialLoad(false)
    }
  }, [data])
  
  const handleConfirmDelete = async () => {
    try {
      const result = await refetch()
     
      setShowCategoryForm(false)
     
    } catch (error) {
      console.error('Refetch error:', error)
    } finally {
      setShowDeleteAlert(false)
      setcategoryId(null)
    }
  }
  
  

  const handleAdd = () => {
    console.log('Add new record')
    setcategoryId(null)
    setShowCategoryForm(true)
  }

  const handleCancel = () => {
    setShowCategoryForm(false)
  }

  const handleSuccess = (newProduct) => {
    setShowCategoryForm(false)
    refetch()
  }

  const handleCloseDeleteAlert = () => {
    setShowDeleteAlert(false)
    setcategoryId(null)
  }

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <DeleteAlert
        modelName="Categorias"
        isOpen={showDeleteAlert}
        onClose={handleCloseDeleteAlert}
        mutation={DELETE_CATEGORY}
        id={categoryId}
        handleConfirm={handleConfirmDelete}
      />

      {showCategoryForm ? (
        <CategoryForm categoryId={categoryId} onCancel={handleCancel} onSuccess={handleSuccess} />
      ) : (
        <DataTable
          title="Lista de Categorias"
          columns={columns}
          data={rows}
          onAdd={handleAdd}
          onSelect={handleSelect}
          onDelete={deleteRow}
          refetchData={() => refetch()}
        />
      )}
    </>
  )
}

export default CategoriesList
