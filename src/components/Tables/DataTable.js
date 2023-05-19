import React, { useState, useEffect } from 'react'
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridRowSelectedParams,
} from '@mui/x-data-grid'
import {
  Flex,
  Text,
  Box,
  Avatar,
  Badge,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { ThemeProvider } from '@mui/material/styles'
import taxTableTheme from 'theme/themeTableMUI'
import { SearchIcon } from '@chakra-ui/icons'
import GradientBorder from 'components/GradientBorder/GradientBorder'


const DataTable = ({ title, columns, data, onAdd, onSelect, refetchData }) => {
  const [searchValue, setSearchValue] = useState('')
  const [rows, setRows] = useState(data)

  useEffect(() => {
    setRows(data)
  }, [data])

  const handleSearch = (event) => {
    setSearchValue(event.target.value)
    if (event.target.value === '') {
      refetchData()
    } else {
      const filteredData = data.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(event.target.value.toLowerCase())
        )
      )
      setRows(filteredData)
    }
  }

  const handleRowSelected = (params) => {
    refetchData()

    onSelect(params.data)
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
      pt={{ base: '120px', md: '75px' }}
    >
    
      <Flex justifyContent="space-between" alignItems="center" w="95%">
        <Text ml={8} fontSize="lg" color="#fff" fontWeight="bold" flex="1">
          {title}
        </Text>
        <InputGroup w="100%" flex="2">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={handleSearch}
            color="white"
            borderColor="gray.300"
            _placeholder={{ color: 'gray.300' }}
          />
        </InputGroup>
        <Button colorScheme="teal" onClick={onAdd} flex="1" ml={8}>
          Add New
        </Button>
      </Flex>
  
      <Box sx={{ width: '97%', minHeight: { md: '650px', '2xl': '800px' }}} mx="1em">


        <ThemeProvider theme={taxTableTheme}>
          <DataGrid
            
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
            pageSizeOptions={[5, 10, 15, 25, 30, 50]}
            disableSelectionOnClick
            autoHeight
            onRowDoubleClick={handleRowSelected}
            color="primary"
          />
        </ThemeProvider>
      </Box>
    
    </Flex>
    </GradientBorder>
  )
}

export default DataTable
