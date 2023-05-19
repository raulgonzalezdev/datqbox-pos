
import React from 'react'
import DataTable from 'components/Tables/DataTable'
import { useGetUsers } from 'graphql/users/crudUser'

import { createColumns } from './gridColumns'



// funciones generales

const incrementQuantity = (params) => {
  const newRows = rows.map((row) => {
    if (row.id === params.id) {
      row.cant += 1
    }
    return row
  })
  setRows(newRows)
  updateTotal(newRows)
}

const decrementQuantity = (params) => {
  const newRows = rows.map((row) => {
    if (row.id === params.id && row.cant > 0) {
      row.cant -= 1
    }
    return row
  })
  setRows(newRows)
  updateTotal(newRows)
}

const deleteRow = (params) => {
  const newRows = rows.filter((row) => row.id !== params.id)
  setRows(newRows)
  updateTotal(newRows)
}

const handleAdd = () => {
  console.log('Add new record')
  // Implement the logic to add a new record
}

const handleSelect = (rowData) => {
  console.log('Selected row data:', rowData)
  // Implement the logic to handle the selected row data
}

  
// inicio componenete
  
  const UsersList = () => {
    const columns = createColumns(
      incrementQuantity,
      decrementQuantity,
      deleteRow,
      handleSelect,
    )

    const { data, loading, error } = useGetUsers()

  
  
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const rows = data.users.map((row, index) => {
     return {
      id: row.id,
      logo: row.avatar,
      name: (row.firstName || '') + ' ' + (row.lastName || ''),
      email: row.email,
      role: row.role,
      status: row.is_active,
    
    }
   })




 

  return (
    <DataTable
      title="Clientes o Usuarios"
      columns={columns}
      data={rows}
      onAdd={handleAdd}
      onSelect={handleSelect}
    />
  )
}

export default UsersList
