import React from "react";
import {
    StyledInput,
    StyledFormLabel,
    StyledTextarea,
    StyledSelect,
    StyledNumberInput,
  } from "components/ReusableComponents/ReusableComponents";
import {
 
    Box,
    Checkbox,
  } from "@chakra-ui/react";
  import { useGetCategories } from "graphql/category/crudCategory";




function ProductInfo({ formState, handleChange, handleNumberInputChange, setFormState, handleCheckboxChange, handleRentalTypeChange }) {
    const { data: categoriesData } = useGetCategories();
    // const [formState, setFormState] = useState({});

    const handleCategoryChange = (event) => {
      const categoryId = event.target.value;
      const category = categoriesData.categories.find(
        (cat) => cat.id === categoryId
      );
      if (category) {  // verifica si la categoría existe antes de acceder a sus propiedades
          setFormState({
            ...formState,
            categoryId: categoryId,
            category: {
              id: categoryId,
              name: category.name,
            },
          });
      } else { // Si no se encuentra la categoría, podrías configurar el estado a un valor predeterminado o mostrar un error, etc.
          setFormState({
            ...formState,
            categoryId: null,
            category: null,
          });
      }
  };
  
  
    return (
    <React.Fragment>
      <Box w={{ base: "100%", md: "50%" }} pr={{ base: "0", md: "4" }}>
        <StyledFormLabel>Codigo Sku producto</StyledFormLabel>
        <StyledInput
          name="sku"
          value={formState.sku || ""}
          onChange={handleChange}
          placeholder="Ingrese el sku del producto"
        />
      </Box>

      <Box w={{ base: "100%", md: "50%" }} pr={{ base: "0", md: "4" }}>
        <StyledFormLabel>Nombre del producto</StyledFormLabel>
        <StyledInput
          name="name"
          value={formState.name || ""}
          onChange={handleChange}
          placeholder="Ingrese el nombre del producto"
        />
      </Box>
      <Box w={{ base: "100%", md: "50%" }} pr={{ base: "0", md: "4" }}>
        <StyledFormLabel>Proveedor</StyledFormLabel>
        <StyledInput
          name="vendor"
          value={formState.vendor || ""}
          onChange={handleChange}
          placeholder="Ingrese el proveedor del producto"
        />
      </Box>
      <Box w={{ base: "100%", md: "50%" }} pr={{ base: "0", md: "4" }}>
        <StyledFormLabel>Descripcion</StyledFormLabel>
        <StyledTextarea
          name="description"
          value={formState.description || ""}
          onChange={handleChange}
          placeholder="Ingrese el descripcion detallada del producto"
        />
      </Box>
      <Box w={{ base: "100%", md: "50%" }} pr={{ base: "0", md: "4" }}>
        <StyledFormLabel>Precio</StyledFormLabel>
        <StyledNumberInput
          name="price"
          type="number"
          value={formState.price || 0}
          onChange={(value) => handleNumberInputChange("price", value)}
          placeholder="Ingrese el precio del producto"
        />
      </Box>
      <Box w={{ base: "100%", md: "50%" }} pr={{ base: "0", md: "4" }}>
        <StyledFormLabel>Inventario</StyledFormLabel>
        <StyledNumberInput
          name="inventory"
          type="number"
          value={formState.inventory || 0}
          onChange={(value) => handleNumberInputChange("inventory", value)}
          placeholder="Ingrese el inventario del producto"
        />
      </Box>
      <Box w={{ base: "100%", md: "50%" }} pr={{ base: "0", md: "4" }}>
        <StyledFormLabel>Categoría</StyledFormLabel>
        <StyledSelect
          value={formState.categoryId}
          onChange={handleCategoryChange}
        >
          <option value={0}>Selecciona una categoría</option>
          {categoriesData?.categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </StyledSelect>
      </Box>

      <Box w={{ base: "100%", md: "50%" }} pr={{ base: "0", md: "4" }}>
        <StyledFormLabel>Rental Type</StyledFormLabel>
        <StyledSelect
          value={formState.rentalType}
          onChange={handleRentalTypeChange}
        >
          <option value="sale">Venta</option>
          <option value="rent">Alquiler</option>
        </StyledSelect>
      </Box>
      <Box w={{ base: "100%", md: "50%" }} pr={{ base: "0", md: "4" }}>
        <StyledFormLabel>Url Imagen</StyledFormLabel>
        <StyledInput
          name="image"
          value={formState.image || ""}
          type="url"
          onChange={handleChange}
          placeholder="Ingrese el url d la imagen"
        />
      </Box>
      <Box w={{ base: "100%", md: "50%" }} pr={{ base: "0", md: "4" }}>
        <StyledFormLabel>Tax Rate</StyledFormLabel>
        <StyledNumberInput
          name="taxRate"
          type="number"
          value={formState.taxRate || 0}
          onChange={(value) => handleNumberInputChange("taxRate", value)}
          placeholder="Ingrese la tasa de impuesto del producto"
        />
      </Box>

      <Box w={{ base: "100%", md: "50%" }} pr={{ base: "0", md: "4" }}>
        <StyledFormLabel>Featured</StyledFormLabel>
        <Checkbox
          name="featured"
          isChecked={formState.featured}
          onChange={handleCheckboxChange}
        />
      </Box>
      <Box w={{ base: "100%", md: "50%" }} pr={{ base: "0", md: "4" }}>
        <StyledFormLabel>New Arrivals</StyledFormLabel>
        <Checkbox
          name="newarrivals"
          isChecked={formState.newarrivals}
          onChange={handleCheckboxChange}
        />
      </Box>
    </React.Fragment>
  );
}

export default ProductInfo;
