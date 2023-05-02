import React, { useState } from "react";
import { SimpleGrid, Button } from "@chakra-ui/react";

const NumericButtons = ({
  handleNumericButtonClick,
  handleEnterClick,
  incrementQuantity,
  decrementQuantity,
  deleteRow,
  selectedOperation,
  setSelectedOperation,
  focusSearchInput,
}) => {
  const [cantBtnSelected, setCantBtnSelected] = useState(false);
  const [precioBtnSelected, setPrecioBtnSelected] = useState(false);
  const [descBtnSelected, setDescBtnSelected] = useState(false);

  const selectedButtonStyle = {
    border: "2px solid",
    borderColor: "green.500",
    backgroundColor: "green.200",
  };
  const handleButtonClick = (number) => {
    handleNumericButtonClick(number);
    focusSearchInput(); // Corrección: Agrega esta línea
  };
  
  const handleCantBtnClick = () => {
    setCantBtnSelected(!cantBtnSelected);
    focusSearchInput();
  };

  const handlePrecioBtnClick = () => {
    setPrecioBtnSelected(!precioBtnSelected);
    focusSearchInput();
  };

  const handleDescBtnClick = () => {
    setDescBtnSelected(!descBtnSelected);
    focusSearchInput();
  };

  return (
    <SimpleGrid columns={4} spacing={1} ml={4}>
      <Button onClick={() => handleButtonClick(1)}>1</Button>
      <Button onClick={() => handleButtonClick(2)}>2</Button>
      <Button onClick={() => handleButtonClick(3)}>3</Button>
      <Button
        style={cantBtnSelected ? selectedButtonStyle : {}}
        onClick={() => {
          handleCantBtnClick();
          setSelectedOperation(cantBtnSelected ? null : "Cant");
        }}
      >
        Cant
      </Button>
      <Button onClick={() => handleButtonClick(4)}>4</Button>
      <Button onClick={() => handleButtonClick(5)}>5</Button>
      <Button onClick={() => handleButtonClick(6)}>6</Button>
      <Button
        style={descBtnSelected ? selectedButtonStyle : {}}
        onClick={() => {
          handleDescBtnClick();
          setSelectedOperation(descBtnSelected ? null : "% Desc");
        }}
      >
        % Desc
      </Button>
      <Button onClick={() => handleButtonClick(7)}>7</Button>
      <Button onClick={() => handleButtonClick(8)}>8</Button>
      <Button onClick={() => handleButtonClick(9)}>9</Button>
      <Button
        style={precioBtnSelected ? selectedButtonStyle : {}}
        onClick={() => {
          handlePrecioBtnClick();
          setSelectedOperation(precioBtnSelected ? null : "Precio");
        }}
      >
        Precio
      </Button>
      <Button onClick={() => handleButtonClick(0)}>0</Button>
      <Button>,</Button>
      <Button>Borrar</Button>
      <Button onClick={handleEnterClick}>Enter</Button>
    </SimpleGrid>
  );
};

export default NumericButtons;
