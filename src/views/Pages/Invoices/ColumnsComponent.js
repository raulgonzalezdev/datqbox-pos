import React from 'react'
import { MdSave, MdCancel, MdDelete, MdOutlineBorderColor, MdFolderCopy } from 'react-icons/md'
import { GridRowModes, GridActionsCellItem } from '@mui/x-data-grid'
import { Tooltip, Flex, Box} from '@chakra-ui/react'
import DateFormat from 'components/DateFormat/DateFormat'



const ColumnsComponent = ({ rowModesModel, handleSaveClick, handleCancelClick, handleEditClick, setId, handleDeleteClick, handleClon , invoiceItems}) => {
  return [
    { field: 'id', headerName: 'ID', width: 60, editable: false },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 180,
      editable: true,
      renderCell: (params) => {
        
        return (
          <DateFormat valuedate={params.row.createdAt} />
        )
      }

     

    },
    
    { field: 'companyName', headerName: 'Company Name', width: 180, editable: true },
    { field: 'paymentMethodName', headerName: 'Payment Method', width: 120, editable: true },
    
    { 
      field: 'subtotal', 
      headerName: 'Subtotal', 
      width: 120, 
      editable: false, 
      valueGetter: (params) => {
          return params.row.total / ((params.row.tax / 100) + 1)
      },
  },
  { 
      field: 'IVA', 
      headerName: 'IVA', 
      width: 100, 
      editable: false, 
      valueGetter: (params) => {
          const subtotal = params.row.total / ((params.row.tax / 100) + 1)
          return params.row.total - subtotal
      },
  },
  
    { field: 'total', headerName: 'Total', width: 100, editable: true },
    { field: 'tax', headerName: 'Tax', width: 100, editable: true },
    { field: 'status', headerName: 'Status', width: 100, editable: true },

   


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
            <Tooltip label="Save" fontSize="md">
              <GridActionsCellItem icon={<MdSave size={20}/>} onClick={handleSaveClick(id)} />
            </Tooltip>,
            <Tooltip label="Cancel" fontSize="md">
              <GridActionsCellItem icon={<MdCancel size={20}/>} onClick={handleCancelClick(id)} />
            </Tooltip>,
          ]
        }
      
        return [
          <Tooltip label="Edit" fontSize="md">
            <GridActionsCellItem icon={<MdOutlineBorderColor size={20}/>} className="textPrimary" onClick={handleEditClick(id)} color="inherit" />
          </Tooltip>,
          <Tooltip label="Delete" fontSize="md">
            <GridActionsCellItem
              icon={<MdDelete size={20}/>}
              onClick={() => {
                setId(id)
                handleDeleteClick(id)()
              }}
              color="inherit"
            />
          </Tooltip>,
          <Tooltip label="Duplicar" fontSize="md">
            <GridActionsCellItem icon={<MdFolderCopy size={20}/>} onClick={handleClon(id)} color="inherit" />
          </Tooltip>,
        ]
      },
    },
  ]
}

export default ColumnsComponent
