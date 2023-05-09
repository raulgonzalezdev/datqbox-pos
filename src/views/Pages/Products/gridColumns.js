import { GridColDef } from "@mui/x-data-grid";
import { AddIcon, MinusIcon, DeleteIcon } from "@chakra-ui/icons";
import {
    Flex,
    Text,
    Box,
    Avatar,
    Badge,
    IconButton,
    Button,
  
  } from "@chakra-ui/react";


  export const createColumns = (
    incrementQuantity,
    decrementQuantity,
    deleteRow,
    onSelect
    
  ): GridColDef[] => [
    {
      field: "userData",
      headerName: "AUTHOR",
      width: 300,
      sortable: false,
      renderCell: (params) => (
        <Flex align="center">
          <Avatar
          bg='teal.500'
          size='lg'
          src={params.row.logo || ""}
          name={params.row.name}
        />
          <Box ml={2}>
            <Text fontWeight="bold">{params.row.name}</Text>
            <Text fontSize="sm">{params.row.email}</Text>
          </Box>
        </Flex>
      ),
    },
    {
      field: "role",
      headerName: "FUNCTION",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Flex align="center">
          <Box ml={2}>
            <Text fontSize="md" color="#fff" fontWeight="bold">
              {params.row.role}
            </Text>
            
          </Box>
        </Flex>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Badge
          bg={params.row.status  ? "green.400" : "transparent"}
          color={params.row.status ? "white" : "gray.400"}
          fontSize="sm"
          p="3px 10px"
          borderRadius="8px"
          border={params.row.status  ? "none" : "1px solid #fff"}
          fontWeight="normal"
        >
          {params.row.status ? "Activo" : "Inactivo"}
        </Badge>
      ),
    },
    {
      field: "actions",
      headerName: "Acciones",
      headerAlign: "right",
      align: "right",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Flex justifyContent="space-around">
          <IconButton
            aria-label="Incrementar"
            icon={<AddIcon />}
            onClick={() => incrementQuantity(params)}
            cursor="pointer"
            mx={2}
          />
          <IconButton
            aria-label="Decrementar"
            icon={<MinusIcon />}
            onClick={() => decrementQuantity(params)}
            cursor="pointer"
            mx={2}
          />
          <IconButton
            aria-label="Eliminar"
            icon={<DeleteIcon />}
            onClick={() => deleteRow(params)}
            cursor="pointer"
            mx={2}
          />
          <Button colorScheme="yellow" onClick={() => onSelect(params)}>
              Select
            </Button>
        </Flex>
      ),
    },
  ];
