import React, { useState, useEffect } from 'react'
import { Box, Flex, Button, Grid, useToast, useDisclosure, Input } from '@chakra-ui/react'
import { DataGrid } from '@mui/x-data-grid'
import { ThemeProvider } from '@mui/material/styles'
import { FcDepartment, FcOrgUnit, FcCurrencyExchange } from 'react-icons/fc'
import { MdAssuredWorkload } from 'react-icons/md'
import taxTableTheme from 'theme/themeTableMUI'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import CustomInput from 'components/CustomInput/CustomInput'
import { StyledText } from 'components/ReusableComponents/ReusableComponents'
import CompanyModal from 'components/companies/Companies'
import ProductModal from 'components/products/ProductModal'

import TotalModal from './TotalModal'
import NumericButtons from './NumericButtons'
import CategoryTabs from './CategoryTabs'
import usePOSApp from './usePOSApp'
import useProducts from './useProducts'
import useInvoices from './useInvoices'

const POSApp = () => {
  const [isCompanyModalOpen, setCompanyModalOpen] = useState(false)
 

  const toast = useToast()
  const { isOpen: isProductModalOpen, onOpen: onProductModalOpen, onClose: onProductModalClose } = useDisclosure()
  const { isOpen: isTotalModalOpen, onOpen: onTotalModalOpen, onClose: onTotalModalClose } = useDisclosure()
 

 


  const {
    rows,
    setRows,
    total,
    setTotal,
    selectedOperation,
    setSelectedOperation,
    selectedRowId,
    setSelectedRowId,
    inputValue,
    setInputValue,
    selectedRows,
    setSelectedRows,
    handleCellClick,
    handleNumericButtonClick,
    handleEnterClick,
    handleProductDoubleClick,
    incrementQuantity,
    decrementQuantity,
    deleteRow,
    handleDetailsClick,
    handleInputChange,
    fetchProductByCode,
    updateTotal,
    subtotal,
    taxDetails,
    columns,
  } = usePOSApp()

  const {
    products,
    loadingProducts,
    selectedProduct,
    foundProducts,
    findProductByIdOrSKU,
    searchProduct,
    handleProductSelect,
    handleProductsData,
    setFoundProducts,
  } = useProducts(rows, setRows, updateTotal)

  const {
    invoice,
    handleCreateInvoice,
    handleAddProductToInvoice,
    selectedPayMethods, 
    setSelectedPayMethods,
    paymentMethods,
    paymentMethodsLoading,
    paymentMethodsError,
    handleCompanySelect,
    selectedCompany,
  } = useInvoices(rows,  taxDetails)

  if (loadingProducts) {
    return <p>Loading...</p>
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()

      if (!inputValue.startsWith('*/')) {
        if (!inputValue.trim()) {
          return
        }

        const foundProduct = findProductByIdOrSKU(inputValue)
        if (foundProduct) {
          handleProductSelect(foundProduct)
        } else {
          toast({
            title: 'Producto no encontrado',
            description: 'No hay un producto con este codio o sku',
            status: 'warning',
            duration: 3000,
            isClosable: true,
            position: 'top',
          })
        }
      } else {
        const query = inputValue.slice(2)
        if (query) {
          const foundProducts = searchProduct(query)
          if (foundProducts.length > 0) {
            setFoundProducts(foundProducts)
            onProductModalOpen()
          } else {
            toast({
              title: 'Productos no encontrados',
              description: 'No hay productos que coincidan con la búsqueda',
              status: 'warning',
              duration: 3000,
              isClosable: true,
              position: 'top',
            })
          }
        }
      }
      setInputValue('')
    } else if (event.key === 'Backspace' || event.key === 'Delete') {
      // Aquí puedes agregar la lógica para manejar el botón "Borrar"
    }
  }

  return (
    <Grid templateColumns={{ sm: '1fr', md: '2fr 1fr', lg: '1fr 1fr' }} my="26px" gap="18px" marginLeft="10" marginRight="10">
      {/* Seccion 2 */}
      <Box order={{ lg: 2, md: 1 }}>
        <Flex direction="column" justifyContent="space-between" marginTop="-15" overflowY="hidden" width={{ base: 'auto', md: '100%' }}>
          <Card width={{ base: 'auto', md: '100%' }}>
            <CardBody width={{ base: 'auto', md: '100%' }} h="100%">
              <CategoryTabs handleProductDoubleClick={handleProductDoubleClick} />
            </CardBody>
          </Card>
        </Flex>
      </Box>
      {/* Seccion 1 */}

      <Box order={{ lg: 2, md: 1 }}>
        <Flex w="100%" h="100%" justifyContent="space-between">
          <Card marginTop="50">
            <CardBody w="100%" h="100%">
              <Box>
                <Flex justifyContent="space-between" mt={4} mb={4} alignItems="center" flexDirection={{ base: 'column', lg: 'row' }}>
                  <Flex width="100%" alignItems="center">
                    <CustomInput flex="0.95" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} />
                    <Button
                      ml={4}
                      leftIcon={<FcOrgUnit size={24} />}
                      onClick={() => {
                        onProductModalOpen()
                      }}
                      colorScheme="whiteAlpha"
                    >
                      Productos
                    </Button>

                    <ProductModal
                      isOpen={isProductModalOpen}
                      onClose={() => {
                        onProductModalClose()
                        setFoundProducts([])
                      }}
                      onProductSelect={handleProductSelect}
                      loadedProducts={products}
                    />

                    <TotalModal
                      isOpen={isTotalModalOpen}
                      onClose={() => {
                        onTotalModalClose()
                      }}
                      total={total}
                      subtotal={subtotal}
                      taxDetails={taxDetails}
                    />
                  </Flex>
                </Flex>

                <Card>
                  <CardBody>
                    <ThemeProvider theme={taxTableTheme}>
                      <Box sx={{ width: '100%', minHeight: '350px' }} mx="1em">
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
                  </CardBody>
                </Card>
                <Flex justifyContent="space-between" mt={4} mb={4} alignItems="center" flexDirection={{ base: 'column', lg: 'row' }}>
                  <Flex>
                    <Button colorScheme="whiteAlpha" leftIcon={<FcDepartment size={24} />} onClick={() => setCompanyModalOpen(true)}>
                      Cliente / Compañia
                    </Button>
                    {selectedCompany && (
                      <Box mr={2} ml={4} p={2} bgColor="gray.600" color="white" borderRadius="md">
                        ({selectedCompany.legalId}) {selectedCompany.name}
                      </Box>
                    )}
                    <CompanyModal isOpen={isCompanyModalOpen} onClose={() => setCompanyModalOpen(false)} onCompanySelect={handleCompanySelect} />
                  </Flex>

                  <Flex alignItems="center">
                    <Button
                      colorScheme="whiteAlpha"
                      leftIcon={<FcCurrencyExchange size={24} />}
                      onClick={() => {
                        onTotalModalOpen()
                      }}
                      mr={4}
                    >
                      Detalles total
                    </Button>
                    <StyledText pr={4}>Total: ${total.toFixed(2)}</StyledText>
                  </Flex>
                </Flex>

                <NumericButtons
                  handleNumericButtonClick={handleNumericButtonClick}
                  handleEnterClick={handleEnterClick}
                  selectedOperation={selectedOperation}
                  setSelectedOperation={setSelectedOperation}
                  total={total}
                  paymentMethodsLoading={paymentMethodsLoading}
                  paymentMethods={paymentMethods}
                  paymentMethodsError={paymentMethodsError}
                  handleCreateInvoice={handleCreateInvoice}
                  setSelectedPayMethods={setSelectedPayMethods}
                />
              </Box>
            </CardBody>
          </Card>
        </Flex>
      </Box>
    </Grid>
  )
}

export default POSApp
