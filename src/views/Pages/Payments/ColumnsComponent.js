import React from 'react'
import { MdSave, MdCancel, MdDelete, MdOutlineBorderColor, MdFolderCopy } from 'react-icons/md'
import { GridRowModes, GridActionsCellItem } from '@mui/x-data-grid'
import { Tooltip} from '@chakra-ui/react'

const ColumnsComponent = ({ rowModesModel, handleSaveClick, handleCancelClick, handleEditClick, setSizeId, handleDeleteClick, handleClon }) => {
  return [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    { field: 'description', headerName: 'Description', width: 180, editable: true },

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
            <GridActionsCellItem icon={<MdSave size={20}/>} label="Save" onClick={handleSaveClick(id)} />,
            <GridActionsCellItem icon={<MdCancel size={20}/>} label="Cancel" onClick={handleCancelClick(id)} />,
          ]
        }

        return [
          <GridActionsCellItem icon={<MdOutlineBorderColor size={20}/>} label="Edit" className="textPrimary" onClick={handleEditClick(id)} color="inherit" />,
          <GridActionsCellItem
            icon={<MdDelete size={20}/>}
            label="Delete"
            onClick={() => {
              setSizeId(id)
              handleDeleteClick(id)()
            }}
            color="inherit"
          />,

          <GridActionsCellItem icon={<MdFolderCopy size={20}/>} label="Duplicar" onClick={handleClon(id)} color="inherit" />,
        ]
      },
    },
  ]
}

export default ColumnsComponent
