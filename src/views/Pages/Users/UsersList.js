import React, { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import DataTable from 'components/Tables/DataTable'
import {
  useGetUsers,
  DELETE_USER,
  useAddUser,
} from 'graphql/users/crudUser'
import DeleteAlert from 'components/DeleteAlert/DeleteAlert'

import { createColumns } from './gridColumns'
import UsersForm from './UserForm'



const CategoriesList = () => {
  const [createUsers, { loading: createLoading }] = useAddUser()
  const toast = useToast()

  const editRow = (rowData) => {

    setShowUsersForm(true)
    setuserId(rowData)
  }
  const deleteRow = (rowData) => {
   
    setuserId(rowData)
    setShowDeleteAlert(true)
  }

  const handleSelect = async (rowData) => {
    
  
    const newUsers = {
      
      firstName: rowData.row.firstName,
      lastName: rowData.row.lastName,
      email: rowData.row.email,
      password: rowData.row.password,
      avatar: rowData.row.avatar,
      role: rowData.row.role,
      is_superuser: rowData.row.is_superuser,
      is_active: rowData.row.is_active,
    }
    
  
  
   
    try {
      const result = await createUsers({ variables: { input: newUsers } })
     
  
      // Update the UI to reflect the new product
      setRows([...rows, result.data.createUsers])

      // Show success toast
      toast({
        title: 'Success',
        description: 'New Users created successfully',
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
  const { data, loading, error, refetch } = useGetUsers({
    skip: !initialLoad,
  })

  const [showUsersForm, setShowUsersForm] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [userId, setuserId] = useState(null)



  const [rows, setRows] = useState([])


  useEffect(() => {
    if (data && data.users) {
      setRows(data.users)
      setInitialLoad(false)
    }
  }, [data])
  
  const handleConfirmDelete = async () => {
    try {
      const result = await refetch()
     
      setShowUsersForm(false)
     
    } catch (error) {
      console.error('Refetch error:', error)
    } finally {
      setShowDeleteAlert(false)
      setuserId(null)
    }
  }
  
  

  const handleAdd = () => {
    console.log('Add new record')
    setuserId(null)
    setShowUsersForm(true)
  }

  const handleCancel = () => {
    setShowUsersForm(false)
  }

  const handleSuccess = (newUsers) => {
    setShowUsersForm(false)
    refetch()
  }

  const handleCloseDeleteAlert = () => {
    setShowDeleteAlert(false)
    setuserId(null)
  }

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <DeleteAlert
        modelName="Usuarios"
        isOpen={showDeleteAlert}
        onClose={handleCloseDeleteAlert}
        mutation={DELETE_USER}
        id={userId}
        handleConfirm={handleConfirmDelete}
      />

      {showUsersForm ? (
        <UsersForm userId={userId} onCancel={handleCancel} onSuccess={handleSuccess} />
      ) : (
        <DataTable
          title="Lista de Usuarios"
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
