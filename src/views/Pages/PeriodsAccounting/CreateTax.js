import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Flex, Text, Box  } from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { ThemeProvider } from "@mui/material/styles"; 
import taxTableTheme from "theme/themeTableMUI";
  

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "taxName",
    headerName: "Nombre del impuesto",
    width: 200,
    editable: true,
  },
  {
    field: "description",
    headerName: "Descripción",
    width: 200,
    editable: true,
  },
  {
    field: "percentage",
    headerName: "Porcentaje del precio",
    type: "number",
    width: 200,
    editable: true,
  },
  {
    field: "isActive",
    headerName: "Activo?",
    width: 150,
    editable: true,
  },
  {
    field: "taxType",
    headerName: "Tipo de Impuesto?",
    width: 150,
    editable: true,
  },
];

const rows = [
  {
    id: 1,
    taxName: "IVA (22.0%) ventas",
    description: "Impuesto al Valor Agregado",
    percentage: 22,
    isActive: "Sí",
    taxType: "Ventas",
  },
  {
    id: 2,
    taxName: "IVA reducido (10.0%) ventas",
    description: "Impuesto al Valor Agregado reducido",
    percentage: 10,
    isActive: "Sí",
    taxType: "Ventas",
  },
  {
    id: 3,
    taxName: "Impuesto al lujo (25.0%) ventas",
    description: "Impuesto aplicado a productos de lujo",
    percentage: 25,
    isActive: "No",
    taxType: "Ventas",
  },
];

function CreateTax() {
  return (
  
    <Flex direction="column" pt={{ base: "100px", md: "50px" }}>
   
  <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
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
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              color="secondary" // o color="secondary"
               autoHeight
            />
             </ThemeProvider>
          </Box>
        </CardBody>
      </Card>
    </Flex>
   
  );
}

export default CreateTax;
