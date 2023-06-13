import React from 'react'
import { Flex, Box, Spinner, Text } from '@chakra-ui/react'
import { ThemeProvider } from '@mui/material/styles'
import taxTableTheme from 'theme/themeTableMUI'
import { DataGrid } from '@mui/x-data-grid'
import GradientBorder from 'components/GradientBorder/GradientBorder'
import DeleteAlert from 'components/DeleteAlert/DeleteAlert'

import SearchAndAddToolbar from './SearchAndAddToolbar'


export default function TableCrud({ useCustomHook, ColumnsComponent }) {
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
    invoiceItems,
  } = useCustomHook()

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
    invoiceItems,
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
        h={{ base: '750px', '2xl': '850px' }}
        bg={{
          base: 'rgb(19,21,56)',
        }}
        direction="column"
        pt={{ base: '120px', md: '75px' }}
      >
        <Flex justifyContent="space-between" alignItems="center" w="95%">
          <Text ml={8} fontSize="lg" color="#fff" fontWeight="bold" flex="1">
            {/* {title} */}
          </Text>
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
            minHeight: { md: '450px', '2xl': '600px' },
            maxHeight: '450px', // altura máxima
            overflow: 'auto', // habilita el desplazamiento
          }}
          mx="1em"
        >
          <DeleteAlert
            modelName="Size"
            isOpen={showDeleteAlert}
            onClose={handleCloseDeleteAlert}
            mutation={DELETE}
            id={Id}
            handleConfirm={(id) => handleConfirmDelete(id, setRows)}
          />

          <ThemeProvider theme={taxTableTheme}>
            <DataGrid
              rows={rows}
              columns={columns}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStart={handleRowEditStart}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
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
