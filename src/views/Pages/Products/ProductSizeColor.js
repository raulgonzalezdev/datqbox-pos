import React, { useState } from "react";
import { StyledFormLabel } from "components/ReusableComponents/ReusableComponents";
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverBody,
  PopoverHeader,
  PopoverArrow,
  PopoverFooter,
  FormControl,
  Input,
  Stack,
  useToast,
  useDisclosure,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

import { IconButton, Icon } from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { CustomCheckbox } from "components/CheckBox/CustomCheckBox";

import {
  useGetColors,
  useCreateColor,
  useUpdateColor,
  useDeleteColor,
} from "graphql/color/crudColor";
import {
  useGetSizes,
  useCreateSize,
  useUpdateSize,
  useDeleteSize,
} from "graphql/sizes/crudSizes";
import ColorPicker from "components/ColorPicker/colorPiker";

function ProductSizeColor({
  formState,
  handleChange,
  handleCheckboxChange,
  handleSelectedColors,
  handleSelectedSizes,
}) {
  const toast = useToast();
  const { data: colorsData } = useGetColors();
  const [createColor, { loading: createLoading }] = useCreateColor();
  const [updateColor, { loading: updateLoading }] = useUpdateColor();
  const [deleteColor, { loading: deleteLoading }] = useDeleteColor();

  const { data: sizesData } = useGetSizes();
  const [createSize, { loading: createLoadingSize }] = useCreateSize();
  const [updateSize, { loading: updateLoadingSize }] = useUpdateSize();
  const [deleteSize, { loading: deleteLoadingSize }] = useDeleteSize();

  const [colorselect, setColor] = useState("#0000FF");
  const [nameColor, setNameColor] = useState("Azul");
  const [valueSize, setValueSize] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [radioValue, setRadioValue] = useState(null);
  const [radioValueSize, setRadioValueSize] = React.useState(null);
  const [checkboxValuesSize, setCheckboxValuesSize] = React.useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const {
    isOpen: isOpenSize,
    onOpen: onOpenSize,
    onClose: onCloseSize,
  } = useDisclosure();

  const [actionType, setActionType] = useState(null);

  const handleColor = (colorselect) => {
    setColor(colorselect);
    setNameColor(colorselect);
  };

  function handleCheckboxChangeSize(e) {
    const { value } = e.target;

    setCheckboxValuesSize((prev) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value);
      } else {
        return [...prev, value];
      }
    });
  }

  const handleSubmit = async (type, actionType, id = null) => {
    try {
      if (type === "color") {
        const input = {
          name: nameColor,
          hexCode: colorselect,
        };

        if (actionType === "create") {
          await createColor({ variables: { input } });

          // Muestra un toast de éxito
          toast({
            title: "Color creado.",
            description: `El color ${nameColor} ha sido creado con éxito.`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else if (actionType === "update") {
          await updateColor({ variables: { id, input } });

          // Muestra un toast de éxito
          toast({
            title: "Color actualizado.",
            description: `El color ${nameColor} ha sido actualizado con éxito.`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else if (actionType === "delete") {
          await deleteColor({ variables: { id } });

          // Muestra un toast de éxito
          toast({
            title: "Color eliminado.",
            description: `El color ${nameColor} ha sido eliminado con éxito.`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }

        setNameColor("");
        setColor("");
        onClose();
      } else if (type === "size") {
        if (actionType === "create") {
          await createSize({ variables: { name: valueSize } });

          // Muestra un toast de éxito
          toast({
            title: "Tamaño creado.",
            description: `El tamaño ${valueSize} ha sido creado con éxito.`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else if (actionType === "update") {
          await updateSize({ variables: { id, name: valueSize } });

          // Muestra un toast de éxito
          toast({
            title: "Tamaño actualizado.",
            description: `El tamaño ${valueSize} ha sido actualizado con éxito.`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else if (actionType === "delete") {
          await deleteSize({ variables: { id } });

          // Muestra un toast de éxito
          toast({
            title: "Tamaño eliminado.",
            description: `El tamaño ${valueSize} ha sido eliminado con éxito.`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }

        setValueSize("");
        onCloseSize();
      }
    } catch (error) {
      // Muestra un toast de error si algo va mal

      toast({
        title: "Error al realizar la acción.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <React.Fragment>
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Accordion
          allowToggle
          w={{ base: "100%", md: "50%" }}
          pr={{ base: "0", md: "4" }}
          style={{ border: "none" }}
        >
          <AccordionItem>
            <AccordionButton color="white">
              <Box flex="1" textAlign="left">
                <StyledFormLabel>Colores</StyledFormLabel>
              </Box>
              <AccordionIcon color="white" />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <CheckboxGroup>
                {colorsData?.colors?.map((color) => (
                  <Box
                    key={color.id}
                    w="120%"
                    h="auto" // ajusta la altura para que sea automática y se adapte al contenido
                    mb={1}
                    pr={{ base: "0", md: "4", xl: "4" }}
                    p={1} // añade un poco de padding para dar más espacio alrededor del contenido
                  >
                    <CustomCheckbox
                      value={color.id}
                      color={color.hexCode}
                      name={color.name}
                      isChecked={false}
                      onCheck={() => {
                        handleSelectedColors(color.id);
                        setSelectedColor(color);
                        setRadioValue(color.id);
                      }}
                      index={color.id}
                      radioValue={radioValue}
                      setRadioValue={setRadioValue}
                    />
                  </Box>
                ))}
                <Popover
                  placement="bottom"
                  closeOnBlur={false}
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}
                  isLazy
                >
                  <Stack direction="row" spacing={2}>
                    <PopoverTrigger>
                      <IconButton
                        aria-label="Add new color"
                        icon={<AddIcon />}
                        onClick={() => {
                          setActionType("create");
                          onOpen();
                        }}
                      />
                    </PopoverTrigger>

                    <IconButton
                      aria-label="Edit color"
                      icon={<EditIcon />}
                      onClick={() => {
                        if (radioValue) {
                          console.log(selectedColor.name);
                          setNameColor(radioValue.name);
                          setColor(radioValue.color);
                          setActionType("update");
                          onOpen();
                        }
                      }}
                    />
                    <IconButton
                      aria-label="Delete color"
                      icon={<DeleteIcon />}
                      onClick={() => {
                        setActionType("delete");
                        handleSubmit("color", "delete", radioValue.index);
                      }}
                    />
                  </Stack>
                  <PopoverContent
                    color="white"
                    bg="blue.800"
                    borderColor="blue.800"
                  >
                    <PopoverHeader pt={4} fontWeight="bold" border="0">
                      Seleccionar Color
                    </PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                      <Stack spacing={4}>
                        <Box>
                          <ColorPicker
                            handleColor={handleColor}
                            boxProps={{
                              bg: colorselect,
                              boxSize: "5.7rem",
                              border: "1px solid #c4c4c4",
                              marginTop: "10px",
                            }}
                          />
                        </Box>
                        <FormControl>
                          <Input
                            name="name"
                            placeholder="Nombre del Color"
                            fontSize="sm"
                            type="text"
                            value={nameColor}
                            color="white"
                            onChange={(e) => setNameColor(e.target.value)}
                          />

                          <Input
                            name="hexCode"
                            type="text"
                            placeholder="Valor hex Color"
                            fontSize="sm"
                            value={colorselect}
                            color="white"
                            onChange={(e) => setColor(e.target.value)}
                          />
                        </FormControl>
                      </Stack>
                    </PopoverBody>

                    <PopoverFooter display="flex" justifyContent="flex-end">
                      <Box fontSize="sm">Click el cuadro para color</Box>
                      <Button
                        colorScheme="blue"
                        onClick={() =>
                          handleSubmit("color", actionType, radioValue.index)
                        }
                        mr={2} // Añade margen a la derecha
                        size="sm"
                      >
                        {actionType === "create" ? "Add" : "Update"}
                      </Button>
                      <Button colorScheme="red" onClick={onClose} size="sm">
                        Regresar
                      </Button>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              </CheckboxGroup>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Accordion
          allowToggle
          w={{ base: "100%", md: "50%" }}
          pl={{ base: "0", md: "4" }}
          style={{ border: "none" }}
        >
          <AccordionItem>
            <AccordionButton color="white">
              <Box flex="1" textAlign="left">
                <StyledFormLabel>Tamaños</StyledFormLabel>
              </Box>
              <AccordionIcon color="white" />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <CheckboxGroup>
                <RadioGroup onChange={setRadioValueSize} value={radioValueSize}>
                  {sizesData?.sizes?.map((size) => (
                    <Flex
                      key={size.id}
                      align="center"
                      justify="space-between"
                      mb={2}
                    >
                      <Checkbox
                        color="#FFFFFF"
                        value={size.id}
                        // onChange={handleCheckboxChangeSize}
                        onChange={(e) => {
                          handleSelectedSizes(size.id);
                          handleCheckboxChangeSize(e);
                        }}
                      >
                        {size.name}
                      </Checkbox>
                      <Radio
                        value={size.id}
                        colorScheme="blue"
                        ml={2}
                        onChange={(e) => {
                          setSelectedSize(size);
                          setRadioValueSize(e.target.value);
                        }}
                      />
                    </Flex>
                  ))}
                </RadioGroup>

                <Popover
                  placement="bottom"
                  closeOnBlur={false}
                  isOpen={isOpenSize}
                  onOpen={onOpenSize}
                  onClose={onCloseSize}
                  isLazy
                >
                  <Stack direction="row" spacing={2}>
                    <PopoverTrigger>
                      <IconButton
                        aria-label="Add new size"
                        icon={<AddIcon />}
                        onClick={() => {
                          setActionType("create");
                          onOpenSize();
                        }}
                      />
                    </PopoverTrigger>

                    <IconButton
                      aria-label="Edit Size"
                      icon={<EditIcon />}
                      onClick={() => {
                        if (selectedSize) {
                          setValueSize(selectedSize.name);
                          setActionType("update");
                          onOpenSize();
                        }
                      }}
                    />
                    <IconButton
                      aria-label="Delete Size"
                      icon={<DeleteIcon />}
                      onClick={() => {
                        setActionType("delete");
                        handleSubmit("size", "delete", radioValueSize);
                      }}
                    />
                  </Stack>
                  <PopoverContent
                    color="white"
                    bg="blue.800"
                    borderColor="blue.800"
                  >
                    <PopoverHeader pt={4} fontWeight="bold" border="0">
                      Añadir Talla o Tamaño
                    </PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                      <Stack spacing={4}>
                        <Input
                          name="name"
                          placeholder="Nombre del Size"
                          fontSize="sm"
                          type="text"
                          color="white"
                          value={valueSize}
                          onChange={(e) => setValueSize(e.target.value)}
                        />
                      </Stack>
                    </PopoverBody>

                    <PopoverFooter display="flex" justifyContent="flex-end">
                      <Button
                        colorScheme="blue"
                        onClick={() =>
                          handleSubmit("size", actionType, radioValueSize)
                        }
                        mr={2}
                        size="sm"
                      >
                        {actionType === "create" ? "Add" : "Update"}
                      </Button>
                      <Button size="sm" colorScheme="red" onClick={onCloseSize}>
                        Regresar
                      </Button>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              </CheckboxGroup>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    </React.Fragment>
  );
}

export default ProductSizeColor;
