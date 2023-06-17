import React from 'react'
import { Modal, ModalOverlay, Flex, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react'

import TableSelect from './TableSelect'
import ColumnsComponent from './ColumnsComponent'
import useCompanies from './useCompanies'

function CompanyModal({ isOpen, onClose, onCompanySelect }) {
  const { rows } = useCompanies({ onCompanySelect, onClose })

  const handleRowSelect = (row) => {
    onCompanySelect(row.id)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={'inside'}>
      <ModalOverlay />
      <ModalContent maxW="80rem" color="white" bg="rgb(19,21,56)" borderRadius="15px">
        <ModalHeader>Selecciona Compañia</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TableSelect
            useCustomHook={useCompanies}
            ColumnsComponent={ColumnsComponent}
            onRowSelect={handleRowSelect}
            onCompanySelect={onCompanySelect}
            onClose={onClose}
          />
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

export default CompanyModal
