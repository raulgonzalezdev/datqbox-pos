import React, { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import DataTable from 'components/Tables/DataTable'
import {
  useGetColors,
  DELETE_COLOR,
  useCreateColor,
} from 'graphql/color/crudColor'
import DeleteAlert from 'components/DeleteAlert/DeleteAlert'

import { createColumns } from './gridColumns'
import ColorForm from './ColorForm'



const ColorsList = () => {
  const [createColor, { loading: createLoading }] = useCreateColor()
  const toast = useToast()

  const editRow = (rowData) => {

    setShowColorForm(true)
    setcolorId(rowData)
  }
  const deleteRow = (rowData) => {
   
    setcolorId(rowData)
    setShowDeleteAlert(true)
  }

  const handleSelect = async (rowData) => {
    
  
    const newColor = { 
      name: rowData.row.name,
      hexcode: rowData.row.hexcode,
     
  }
  
  
   
    try {
      const result = await createColor({ variables: { input: newColor } })
     
  
      // Update the UI to reflect the new product
      setRows([...rows, result.data.createColor])

      // Show success toast
      toast({
        title: 'Success',
        description: 'New Color created successfully',
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
  const { data, loading, error, refetch } = useGetColors()

  const [showColorForm, setShowColorForm] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [colorId, setcolorId] = useState(null)



  const [rows, setRows] = useState([])


  useEffect(() => {
    if (data && data.colors) {
      setRows(data.colors)
      setInitialLoad(false)
    }
  }, [data])
  
  const handleConfirmDelete = async () => {
    try {
      const result = await refetch()
     
      setShowColorForm(false)
     
    } catch (error) {
      console.error('Refetch error:', error)
    } finally {
      setShowDeleteAlert(false)
      setcolorId(null)
    }
  }
  
  

  const handleAdd = () => {
  
    setcolorId(null)
    setShowColorForm(true)
  }

  const handleCancel = () => {
    setShowColorForm(false)
  }

  const handleSuccess = (newProduct) => {
    setShowColorForm(false)
    refetch()
  }

  const handleCloseDeleteAlert = () => {
    setShowDeleteAlert(false)
    setcolorId(null)
  }

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <DeleteAlert
        modelName="Colores"
        isOpen={showDeleteAlert}
        onClose={handleCloseDeleteAlert}
        mutation={DELETE_COLOR}
        id={colorId}
        handleConfirm={handleConfirmDelete}
      />

      {showColorForm ? (
        <ColorForm colorId={colorId} onCancel={handleCancel} onSuccess={handleSuccess} />
      ) : (
        <DataTable
          title="Lista de Colores"
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

export default ColorsList
