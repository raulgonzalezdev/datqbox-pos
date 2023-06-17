import React from 'react'
import { Flex, Box, Spinner, Text } from '@chakra-ui/react'
import { ThemeProvider } from '@mui/material/styles'
import taxTableTheme from 'theme/themeTableMUI'
import { DataGrid } from '@mui/x-data-grid'
import GradientBorder from 'components/GradientBorder/GradientBorder'


import SearchAndAddToolbar from './SearchAndAddToolbar'

export default function TableSelect({ useCustomHook, ColumnsComponent,  onCompanySelect, onClose  }) {
  const {
    rowModesModel,
    showDeleteAlert,
    Id,
    rows,
    setRows,
    searchValue,
    setSearchValue,
    initialLoad,
    data,
    loading,
    error,
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
    setId,
    DELETE,
    setRowModesModel,
    flattenInvoiceData,
    handleRowSelected,
    setSelectedInvoice,
    selectedInvoice,
    onRowSelect,
    handleRowSelect,
    
  } = useCustomHook({ onCompanySelect, onClose })

  const columns = ColumnsComponent({
    rowModesModel,
    handleSaveClick,
    handleCancelClick,
    handleEditClick,
    setId,
    setRowModesModel,
    setRows,
    handleDeleteClick,
    handleClon,
    flattenInvoiceData,
  })



  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <Box>Error: {error.message}</Box>
  }

  return (
    <GradientBorder p="2px">
      <Flex
        background="transparent"
        borderRadius="30px"
        w="100%"
        bg={{
          base: 'rgb(19,21,56)',
        }}
        direction="column"
      >
        <Flex justifyContent="space-between" alignItems="center" w="95%">
        
          <SearchAndAddToolbar
            setRows={setRows}
            rows={rows}
            setRowModesModel={setRowModesModel}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            setSearchValue={setSearchValue}
            refetchData={refetchData}
            data={data.sizes}
          />
        </Flex>
        <Box
          sx={{
            width: '97%',
            height: '65%',
            overflow: 'auto',
          }}
          mx="1em"
        >
         

          <ThemeProvider theme={taxTableTheme}>
            <DataGrid
              rows={rows}
              columns={columns}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowDoubleClick={(params) => handleRowSelect(params)}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStart={handleRowEditStart}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              onRowSelected={handleRowSelected}
              slotProps={{
                toolbar: { setRows, setRowModesModel },
              }}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[15, 25, 30, 50, 75, 100]}
              autoHeight
            />
          </ThemeProvider>
        </Box>
       
      </Flex>
    </GradientBorder>
  )
}
