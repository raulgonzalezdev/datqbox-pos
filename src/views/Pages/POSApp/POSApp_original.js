import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Input,
  Text,
  Button,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  IconButton,
} from "@chakra-ui/react";

import { AddIcon, MinusIcon, DeleteIcon } from "@chakra-ui/icons";

import {
  StyledInput,
  GradientInput,
  StyledFormLabel,
  BaseFlex,
  StyledText,
} from "components/ReusableComponents/ReusableComponents";

import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridRowParams,
} from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material/styles";
import taxTableTheme from "theme/themeTableMUI";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import { productosRows as products, categories } from "variables/products";

const POSApp = () => {
  const [rows, setRows] = useState([]);

  const [total, setTotal] = useState(0);
 
  const searchInputRef = useRef(null);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const handleRowClick = (params) => {
    setSelectedRowId(params.id);
  };

  const handleNumericButtonClick = (number) => {
    const selectedRow = rows.find((row) => row.id === selectedRowId);

    if (!selectedRow) {
      return;
    }

    const newRows = rows.map((row) => {
      if (row.id === selectedRow.id) {
        switch (selectedOperation) {
          case "Cant":
            row.cant = parseFloat(number);
            break;
          case "Precio":
            row.price = parseFloat(number);
            break;
          case "% Desc":
            const discount = parseFloat(number);
            row.price = row.originalPrice * (1 - discount / 100);
            break;
          default:
            break;
        }
      }
      return row;
    });
    setRows(newRows);
    updateTotal(newRows);
  };

  const handleEnterClick = () => {
    setSelectedOperation(null);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedOperation && !isNaN(event.key)) {
        handleNumericButtonClick(parseInt(event.key, 10));
      } else {
        switch (event.key) {
          case "Enter":
            handleEnterClick();
            break;
          case "Backspace":
          case "Delete":
            // Aquí puedes agregar la lógica para manejar el botón "Borrar"
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedOperation, handleNumericButtonClick, handleEnterClick]);

  useEffect(() => {
    const focusSearchInput = () => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    };

    window.addEventListener("click", focusSearchInput);
    return () => {
      window.removeEventListener("click", focusSearchInput);
    };
  }, []);

  const handleProductDoubleClick = (product) => {
    const productIndex = rows.findIndex((row) => row.id === product.id);

    if (productIndex !== -1) {
      const newRows = [...rows];
      newRows[productIndex].cant++;
      setRows(newRows);
      updateTotal(newRows); // Agrega esta línea para actualizar el total general
    } else {
      const newRow = { ...product, cant: 1 };
      setRows([...rows, newRow]);
      updateTotal([...rows, newRow]); // Agrega esta línea para actualizar el total general
    }
  };

  const incrementQuantity = (params) => {
    const newRows = rows.map((row) => {
      if (row.id === params.id) {
        row.cant += 1;
      }
      return row;
    });
    setRows(newRows);
    updateTotal(newRows);
  };

  const decrementQuantity = (params) => {
    const newRows = rows.map((row) => {
      if (row.id === params.id && row.cant > 0) {
        row.cant -= 1;
      }
      return row;
    });
    setRows(newRows);
    updateTotal(newRows);
  };

  const deleteRow = (params) => {
    const newRows = rows.filter((row) => row.id !== params.id);
    setRows(newRows);
    updateTotal(newRows);
  };

  const updateTotal = (rows) => {
    const newTotal = rows.reduce((acc, row) => {
      const cant = parseFloat(row.cant);
      const price = parseFloat(row.price);

      if (isNaN(cant) || isNaN(price)) {
        return acc;
      }

      return acc + cant * price;
    }, 0);

    setTotal(newTotal);
  };

  const handleDetailsClick = () => {
    // Implementa la lógica para mostrar los detalles del total, incluyendo impuestos, etc.
    // Puedes usar un modal o una alerta, por ejemplo
    alert(`Detalles del total: $${total}`);
  };

  const columns: GridColDef[] = [
    { field: "cant", headerName: "Cant", width: 55, editable: true },
    { field: "productName", headerName: "Producto", width: 180 },
    {
      field: "price",
      headerName: "Precio",
      width: 140,
      editable: true,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "total",
      headerName: "Total",
      headerAlign: "right",
      align: "right",
      width: 140,
      valueGetter: (params: GridValueGetterParams) =>
        (Number(params.row.cant) * Number(params.row.price)).toFixed(2),
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
        </Flex>
      ),
    },
  ];

  return (
    <Flex>
      <Flex
        direction="column"
        w="55%"
        borderRight="1px solid"
        borderColor="gray.200"
        p={4}
      >
        <Box
          mt={4}
          minHeight="340px"
          maxHeight="calc(100vh - 50px)"
          overflowY="auto"
        >
          <StyledInput
            ref={searchInputRef}
            width="100%"
            placeholder="Buscar por código de barras"
          />
          <Flex direction="column" pt={{ base: "20px", md: "20px" }}>
            <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
              <CardBody maxHeight="calc(100vh - 410px)" overflowY="auto">
                <Box sx={{ width: "100%" }}>
                  <ThemeProvider theme={taxTableTheme}>
                    <Box
                      minHeight="calc(100vh - 410px - 16px)"
                      maxHeight="calc(100vh - 410px - 16px)"
                    >
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        autoHeight
                        onRowClick={handleRowClick}
                      />
                    </Box>
                  </ThemeProvider>
                </Box>
              </CardBody>
            </Card>
            <Flex mb={4} justifyContent="space-between" mt={4}>
              <Button onClick={handleDetailsClick}>Detalles del total</Button>
              <StyledText mt={4} mb={2} alignSelf="flex-end">
                Total: ${total.toFixed(2)}
              </StyledText>
            </Flex>
          </Flex>
        </Box>

        <Flex mb={4}>
          <Button mr={2}>Cliente</Button>
          <Button mr={2}>Nota del Cliente</Button>
          <Button mr={2}>Reembolso</Button>
          <Button>Información</Button>
        </Flex>

        <Flex>
          <Button width="50%" height="100%" mb={4}>
            Enviar Payment
          </Button>
          <SimpleGrid columns={4} spacing={1} ml={4}>
            {/* Añade los botones del teclado numérico aquí */}
            <Button onClick={() => handleNumericButtonClick(1)}>1</Button>
            <Button onClick={() => handleNumericButtonClick(2)}>2</Button>
            <Button onClick={() => handleNumericButtonClick(3)}>3</Button>
            <Button
              isSelected={selectedOperation === "Cant"}
              onClick={() =>
                setSelectedOperation(
                  selectedOperation === "Cant" ? null : "Cant"
                )
              }
              // Agregue cualquier estilo adicional que desee aplicar al botón seleccionado
            >
              Cant
            </Button>
            <Button onClick={() => handleNumericButtonClick(4)}>4</Button>
            <Button onClick={() => handleNumericButtonClick(5)}>5</Button>
            <Button onClick={() => handleNumericButtonClick(6)}>6</Button>
            <Button
              isSelected={selectedOperation === "% Desc"}
              onClick={() =>
                setSelectedOperation(
                  selectedOperation === "% Desc" ? null : "% Desc"
                )
              }
              // Agregue cualquier estilo adicional que desee aplicar al botón seleccionado
            >
              % Desc
            </Button>
            <Button onClick={() => handleNumericButtonClick(7)}>7</Button>
            <Button onClick={() => handleNumericButtonClick(8)}>8</Button>
            <Button onClick={() => handleNumericButtonClick(9)}>9</Button>
            <Button
              isSelected={selectedOperation === "Precio"}
              onClick={() =>
                setSelectedOperation(
                  selectedOperation === "Precio" ? null : "Precio"
                )
              }
              // Agregue cualquier estilo adicional que desee aplicar al botón seleccionado
            >
              Precio
            </Button>
            <Button>0</Button>
            <Button>,</Button>
            <Button>Borrar</Button>
            <Button onClick={handleEnterClick}>Enter</Button>
          </SimpleGrid>
        </Flex>
      </Flex>




      <Box w="60%" p={4} marginTop="50px">
        <Tabs isLazy variant="enclosed" colorScheme="gray">
          <TabList>
            {categories.map((category) => (
              <Tab key={category.id} color="white">
                {category.categoryName}
              </Tab>
            ))}
          </TabList>
          <Box maxHeight="calc(100vh - 120px)" overflowY="auto">
            <TabPanels mt={4}>
              {categories.map((category) => (
                <TabPanel key={category.id}>
                  <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
                    {products
                      .filter(
                        (product) => product.category === category.categoryName
                      )
                      .map((product) => (
                        <Box
                          key={product.id}
                          bg="white"
                          cursor="pointer"
                          p={4}
                          borderRadius="md"
                          onDoubleClick={() =>
                            handleProductDoubleClick(product)
                          }
                        >
                          <Text>{product.productName}</Text>
                          <Text>{product.price}</Text>
                        </Box>
                      ))}
                  </SimpleGrid>
                </TabPanel>
              ))}
            </TabPanels>
          </Box>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default POSApp;
