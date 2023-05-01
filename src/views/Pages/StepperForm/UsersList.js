import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Flex, Text, Box, Avatar, Badge } from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { ThemeProvider } from "@mui/material/styles";
import taxTableTheme from "theme/themeTableMUI";
import { tablesTableData } from "variables/general";


const columns: GridColDef[] = [
  {
    field: "userData",
    headerName: "AUTHOR",
    width: 300,
    sortable: false,
    renderCell: (params) => (
      <Flex align="center">
        <Avatar sizes={{ base: "md" }} src={params.row.logo} />
        <Box ml={2}>
          <Text fontWeight="bold">{params.row.name}</Text>
          <Text fontSize="sm">{params.row.email}</Text>
        </Box>
      </Flex>
    ),
  },
  {
    field: "subdomain",
    headerName: "FUNCTION",
    width: 200,
    sortable: false,
    renderCell: (params) => (
      <Flex align="center">
        <Box ml={2}>
          <Text fontSize="md" color="#fff" fontWeight="bold">
            {params.row.domain}
          </Text>
          <Text fontSize="sm" color="#fff" fontWeight="normal">
            {params.row.subdomain}
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
        bg={params.row.status === "Online" ? "green.400" : "transparent"}
        color={params.row.status === "Online" ? "white" : "gray.400"}
        fontSize="sm"
        p="3px 10px"
        borderRadius="8px"
        border={params.row.status === "Online" ? "none" : "1px solid #fff"}
        fontWeight="normal"
      >
        {params.row.status}
      </Badge>
    ),
  },
  { field: "date", headerName: "Date", width: 150 },
];

const rows = tablesTableData.map((row, index) => {
  return {
    id: index + 1,
    logo: row.logo,
    name: row.name,
    email: row.email,
    subdomain: row.subdomain,
    domain: row.domain,
    status: row.status,
    date: row.date,
  };
});

const UsersList = () => {
  return (
    
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
    
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb='0px'>
      <CardHeader p="6px 0px 22px 0px">
        <Text fontSize="lg" color="#fff" fontWeight="bold">
          Definición de impuestos
        </Text>
      </CardHeader>
      <CardBody>
        <Box sx={{ width: "100%" }}>
          <ThemeProvider theme={taxTableTheme}>
            <DataGrid
              rows={rows}
              columns={columns}
              rowHeight={100}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              autoHeight
              color="primary" // o color="secondary"
            />
          </ThemeProvider>
        </Box>
      </CardBody>
    </Card>
  </Flex>
  
  );
};

export default UsersList;
