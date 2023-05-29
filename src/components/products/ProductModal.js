import React from 'react'
import { Modal, ModalOverlay, Flex, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react'
import ProductList from 'views/Pages/Products/ProductsList'

function ProductModal({ isOpen, onClose, onProductSelect, loadedProducts }) {


  const handleRowDoubleClick = (row) => {
    onProductSelect(row)
    
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={'inside'}>
      <ModalOverlay />
      <ModalContent maxW="80rem" color="white" bg="rgb(19,21,56)" borderRadius="15px">
        <ModalHeader>Selecciona Producto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
           <ProductList ptValue={'0px'} onProductSelect={handleRowDoubleClick} loadedProducts={loadedProducts} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default  ProductModal
