import React, { useRef, useEffect } from "react";
import { Input } from "@chakra-ui/react";

const CustomInput = () => {
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleBlur = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const searchInputStyle = {
    fontSize: "24px",
    cursor: "text",
    backgroundColor: "white",
    color: "black",
  };

  return (
    <Input
      ref={inputRef}
      onBlur={handleBlur}
      placeholder="Escanee el código de barras"
      style={searchInputStyle}
    />
  );
};

export default CustomInput;
