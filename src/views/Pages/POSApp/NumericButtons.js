import React, { useState } from "react";
import { SimpleGrid, Button } from "@chakra-ui/react";

const NumericButtons = ({
  handleNumericButtonClick,
  handleEnterClick,
  selectedOperation,
  setSelectedOperation,
}) => {
  const selectedButtonStyle = {
    border: "2px solid",
    borderColor: "green.500",
    backgroundColor: "green.200",
  };
  
  const handleCantBtnClick = () => {
    setSelectedOperation(selectedOperation === "Cant" ? null : "Cant");
  };

  const handlePrecioBtnClick = () => {
    setSelectedOperation(selectedOperation === "Precio" ? null : "Precio");
  };

  const handleDescBtnClick = () => {
    setSelectedOperation(selectedOperation === "% Desc" ? null : "% Desc");
  };

  return (
    <SimpleGrid columns={4} spacing={1} ml={4}>
      <Button onClick={() => handleNumericButtonClick(1)}>1</Button>
      <Button onClick={() => handleNumericButtonClick(2)}>2</Button>
      <Button onClick={() => handleNumericButtonClick(3)}>3</Button>
      <Button
        style={selectedOperation === "Cant" ? selectedButtonStyle : {}}
        onClick={handleCantBtnClick}
      >
        Cant
      </Button>
      <Button onClick={() => handleNumericButtonClick(4)}>4</Button>
      <Button onClick={() => handleNumericButtonClick(5)}>5</Button>
      <Button onClick={() => handleNumericButtonClick(6)}>6</Button>
      <Button
        style={selectedOperation === "% Desc" ? selectedButtonStyle : {}}
        onClick={handleDescBtnClick}
      >
        % Desc
      </Button>
      <Button onClick={() => handleNumericButtonClick(7)}>7</Button>
      <Button onClick={() => handleNumericButtonClick(8)}>8</Button>
      <Button onClick={() => handleNumericButtonClick(9)}>9</Button>
      <Button
        style={selectedOperation === "Precio" ? selectedButtonStyle : {}}
        onClick={handlePrecioBtnClick}
      >
        Precio
      </Button>
      <Button onClick={() => handleNumericButtonClick(0)}>0</Button>
      <Button>,</Button>
      <Button>Borrar</Button>
      <Button onClick={handleEnterClick}>Enter</Button>
    </SimpleGrid>
  );
};

export default NumericButtons;
