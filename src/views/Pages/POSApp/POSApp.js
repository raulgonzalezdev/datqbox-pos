import React, { useState, useEffect, useRef } from "react";
import { Box, Flex, Button, Input } from "@chakra-ui/react";
import {
  StyledInput,
  StyledText,
} from "components/ReusableComponents/ReusableComponents";
import { DataGrid } from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material/styles";
import taxTableTheme from "theme/themeTableMUI";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import NumericButtons from "./NumericButtons";
import CategoryTabs from "./CategoryTabs";
import { createColumns } from "./gridColumns";
import GradientBorder from "components/GradientBorder/GradientBorder";
import CustomInput from "components/CustomInput/CustomInput"

const POSApp = () => {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const searchInputRef = useRef(null);
  const categoryTabsRef = useRef(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [numberBuffer, setNumberBuffer] = useState("");

  const handleRowClick = (params) => {
    setSelectedRowId(params.id);
  };

  const handleNumericButtonClick = (number) => {
    const selectedRow = rows.find((row) => row.id === selectedRowId);
  
    if (!selectedRow) {
      return;
    }
  
    setNumberBuffer((prevNumberBuffer) => {
      const newNumberBuffer = `${prevNumberBuffer}${number}`;
      console.log("numberBuffer", newNumberBuffer); // Cambio realizado aquí
      return newNumberBuffer;
    });
    focusSearchInput();
  };
  

  const handleEnterClick = () => {
    const selectedRow = rows.find((row) => row.id === selectedRowId);

    if (!selectedRow || !numberBuffer) {
      return;
    }

    const parsedNumber = parseFloat(numberBuffer);

    const newRows = rows.map((row) => {
      if (row.id === selectedRow.id) {
        switch (selectedOperation) {
          case "Cant":
            row.cant = parsedNumber;
            break;
          case "Precio":
            row.price = parsedNumber;
            break;
          case "% Desc":
            const discount = parseFloat(numberBuffer);
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
    setNumberBuffer(""); // Limpia el buffer después de aplicar el cambio
    setSelectedOperation(null); // Quita la selección de la operación al presionar Enter
  };
  const focusSearchInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };
  

  useEffect(() => {
    focusSearchInput();
  }, []);

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
    focusSearchInput();
  }, [selectedOperation, handleNumericButtonClick, handleEnterClick]);



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
    focusSearchInput();
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
    alert(`Detalles del total: $${total}`);
  };

  const columns = createColumns(
    incrementQuantity,
    decrementQuantity,
    deleteRow
  );
  const searchInputStyle = {
    fontSize: "24px",
    cursor: "text",
    backgroundColor: "white",
    color: "black",
  };
  

  return (
    <GradientBorder>
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
            <CustomInput
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
            <Button>Descuento</Button>
          </Flex>
          <Flex>
            <Button width="50%" height="100%" mb={4}>
              Enviar Payment
            </Button>
            <NumericButtons
              handleNumericButtonClick={handleNumericButtonClick}
              handleEnterClick={handleEnterClick}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
              deleteRow={deleteRow}
              selectedOperation={selectedOperation}
              setSelectedOperation={setSelectedOperation}
              selectedRowId={selectedRowId} // Agrega esto
              focusSearchInput={focusSearchInput}
            />
          </Flex>
        </Flex>

        <Flex
          direction="column"
          w="60%"
          justifyContent="space-between"
          p={4}
          marginTop="55px"
          overflowY="hidden"
        >
          <CategoryTabs ref={categoryTabsRef} handleProductDoubleClick={handleProductDoubleClick}   />
        </Flex>
      </Flex>
    </GradientBorder>
  );
};

export default POSApp;
