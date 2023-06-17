import React from 'react'
import { MdSave, MdCancel, MdDelete, MdOutlineBorderColor, MdFolderCopy } from 'react-icons/md'
import { GridRowModes, GridActionsCellItem } from '@mui/x-data-grid'
import { Tooltip} from '@chakra-ui/react'
import DateFormat from 'components/DateFormat/DateFormat'

const ColumnsComponent = ({ rowModesModel, handleSaveClick, handleCancelClick, handleEditClick, setId, handleDeleteClick, handleClon }) => {
  return [
    { field: 'id', headerName: 'id', width: 60, editable: false },
    { field: 'currencyId', headerName: 'currencyId', width: 100, editable: false },
    { field: 'name', headerName: 'Name', width: 150, editable: false },
    { field: 'symbol', headerName: 'symbol', width: 150, editable: false},
    {
      field: 'date',
      headerName: 'Date',
      width: 180,
      editable: true,
      renderCell: (params) => {
        
        return (
          <DateFormat valuedate={params.row.date} />
        )
      }
    },
    { field: 'rate', headerName: 'Rate', width: 150, editable: true },
  

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
