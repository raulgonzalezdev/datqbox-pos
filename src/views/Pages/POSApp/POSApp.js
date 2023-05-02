import React, { useState, useEffect, useCallback, useRef } from "react";

import { Box, Flex, Button, Input } from "@chakra-ui/react";
import { DataGrid } from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material/styles";
import taxTableTheme from "theme/themeTableMUI";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import NumericButtons from "./NumericButtons";
import CategoryTabs from "./CategoryTabs";
import { createColumns } from "./gridColumns";
import GradientBorder from "components/GradientBorder/GradientBorder";
import CustomInput from "components/CustomInput/CustomInput";
import { StyledText } from "components/ReusableComponents/ReusableComponents";
//import backgroundImage from "assets/img/background-body-admin.png";

const POSApp = () => {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedRows, setSelectedRows] = useState([]); 
 
  

  
  
  

  const handleCellClick = (params) => {
    if (selectedRows.includes(params.id)) {
      // Si el ID ya está en la lista de filas seleccionadas, elimínalo
      setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((id) => id !== params.id));
    } else {
      // Si el ID no está en la lista de filas seleccionadas, agrégalo
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, params.id]);
    }
  };

  const handleNumericButtonClick = (number) => {
    if (number === 'backspace') {
      // Si el botón es de "Borrar", elimina el último dígito del input
      setInputValue((prevValue) => prevValue.slice(0, -1));
    } else if (number === '.') {
      // Si el botón es un punto decimal, verifica que no haya uno ya en el input y lo agrega
      if (!inputValue.includes('.')) {
        setInputValue((prevValue) => `${prevValue}${number}`);
      }
    } else {
      // Si no es un botón especial, procesa la entrada de número
      if (!selectedRowId) {
        // Si no hay fila seleccionada, simplemente agrega el número al input
        setInputValue((prevValue) => `${prevValue}${number}`);
      } else {
        // Si hay una fila seleccionada, actualiza la cantidad o el precio de la fila según la operación seleccionada
        const selectedRow = rows.find((row) => row.id === selectedRowId);
    
        if (!selectedRow) {
          return;
        }
    
        const newRows = rows.map((row) => {
          if (row.id === selectedRow.id) {
            if (selectedOperation === "Cant") {
              // Si se está actualizando la cantidad, convierte el valor anterior en número y agrega el nuevo dígito
              row.cant = parseFloat(`${row.cant}${number}`);
            } else if (selectedOperation === "Precio") {
              // Si se está actualizando el precio, convierte el valor anterior en número y agrega el nuevo dígito
              row.price = parseFloat(`${row.price}${number}`);
            }
          }
          return row;
        });
    
        setRows(newRows);
        updateTotal(newRows);
        setInputValue((prevValue) => `${prevValue}${number}`);
      }
    }
  };
  
  
  

  const handleEnterClick = useCallback(() => {
    if (!inputValue) {
      if (!selectedOperation) {
        fetchProductByCode(inputValue).then((product) => {
          if (product) {
            handleProductDoubleClick(product);
          }
          setInputValue("");
        });
      }
      return;
    }
  
    const parsedNumber = parseFloat(inputValue);
  
    const newRows = rows.map((row) => {
      if (selectedRows.includes(row.id)) {
        // Aplica los cambios solo a las filas seleccionadas
        switch (selectedOperation) {
          case "Cant":
            row.cant = parsedNumber;
            break;
          case "Precio":
            row.price = parsedNumber;
            break;
          case "% Desc":
            const discount = parseFloat(inputValue);
if (!isNaN(discount)) {
    row.price = row.price * (1 - discount / 100);
}
            break;
          default:
            break;
        }
      }
      return row;
    });
  
    setRows(newRows);
    updateTotal(newRows);
    setInputValue("");
    setSelectedOperation(null);
    setSelectedRowId(null);
    //setSelectedRows([]);

  }, [rows, inputValue, selectedOperation, selectedRows]);
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleEnterClick();
      } else if (event.key === "Backspace" || event.key === "Delete") {
        // Aquí puedes agregar la lógica para manejar el botón "Borrar"
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleEnterClick]);

  const fetchProductByCode = (code) => {
    return new Promise((resolve) => {
      // Simula un tiempo de espera de 1 segundo para buscar el producto
      setTimeout(() => {
        alert(`Buscando producto con código: ${code}`);
        resolve(null); // Devuelve 'null' ya que esta es solo una función temporal
      }, 1000);
    });
  };

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
    alert(`Detalles del total: $${total}`);
  };

  const columns = createColumns(
    incrementQuantity,
    decrementQuantity,
    deleteRow
  );

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

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
            <CustomInput value={inputValue} onChange={handleInputChange} />

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
                          onCellClick={handleCellClick} 
                          selectionModel={selectedRows} 
                          autoHeight
                          
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
              selectedOperation={selectedOperation}
              setSelectedOperation={setSelectedOperation}
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
          <CategoryTabs handleProductDoubleClick={handleProductDoubleClick} />
        </Flex>
      </Flex>

    
  );
};

export default POSApp;
