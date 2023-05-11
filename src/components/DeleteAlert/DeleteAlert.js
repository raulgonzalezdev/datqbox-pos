import React from 'react'
import { useMutation } from '@apollo/client'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast
} from '@chakra-ui/react'

const DeleteAlert = ({
  modelName,
  isOpen,
  onClose,
  mutation,
  id,
  handleConfirm,
  // refetchData,
}) => {
  const [deleteMutation] = useMutation(mutation);
  const cancelRef = React.useRef();
  const toast = useToast();

  const handleDeleteClick = async () => {
  
    try {
      const result = await deleteMutation({
        variables: {
          id: id,
        },
      });
      console.log('Delete result:', result);;
      onClose();
      
      handleConfirm();
      toast({
        title: modelName + " excluído.",
        status: "info",
        isClosable: true,
      });
   
      
    } catch (error) {
      onClose();
      toast({
        title: "Houve um erro ao excluir o " + modelName,
        status: "error",
        isClosable: true,
      });
    }
  };
  

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Excluir {modelName}
          </AlertDialogHeader>

          <AlertDialogBody>
            Tem certeza que deseja excluir este(a) {modelName}?
            <br />
            Esta ação não poderá ser desfeita.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={handleDeleteClick} ml={3}>
              Excluir
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default DeleteAlert
