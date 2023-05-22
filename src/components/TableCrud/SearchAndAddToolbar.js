import React from 'react'
import { InputGroup, Input, InputLeftElement, Button, HStack } from '@chakra-ui/react'
import AddIcon from '@mui/icons-material/Add'
import { SearchIcon } from '@chakra-ui/icons'
import { randomId } from '@mui/x-data-grid-generator'
import { GridRowModes } from '@mui/x-data-grid'

export default function SearchAndAddToolbar(props) {
    const { setRows, rows, setRowModesModel, searchValue, setSearchValue, refetchData, data } = props

    const handleClick = () => {
      const id = randomId()
      setRows((oldRows) => [...oldRows, { id, name: '', isNew: true }])
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      }))
    }


    

  const handleSearch = (event) => {
    setSearchValue(event.target.value)
    if (event.target.value === '') {
      refetchData()
    } else {
      const filteredData = data.filter((row) =>
        Object.values(row).some((value) => String(value).toLowerCase().includes(event.target.value.toLowerCase()))
      )
      setRows(filteredData)
    }
  }

  return (
    <HStack width="100%" justifyContent="space-between">
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
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
      <Button colorScheme="teal" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </HStack>
  )
}
