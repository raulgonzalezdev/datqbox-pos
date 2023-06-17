import React, { useState } from 'react'
import {
  Box,
  Image,
  SimpleGrid,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Checkbox,
  IconButton,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useUploadedImages } from 'graphql/image/crudImage'

const IMAGES_PER_PAGE = 8 // 3 filas de 4 imágenes

function ImagesUpload({ onImageSelect }) {
  const [isOpen, setIsOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const [selectedImages, setSelectedImages] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const { images: imagesUpload, loading: createLoading } = useUploadedImages()

  const onImageClick = (imageUrl, isChecked) => {
    if (isChecked) {
      setSelectedImages((prevImages) => [...prevImages, imageUrl])
    } else {
      setSelectedImages(selectedImages.filter((image) => image !== imageUrl))
    }
  }

  let thumbs = []
  if (imagesUpload) {
    thumbs = imagesUpload
      .slice(currentPage * IMAGES_PER_PAGE, (currentPage + 1) * IMAGES_PER_PAGE)
      .map((image) => (
        <Box
          key={image.url}
          p={2}
          boxShadow="lg"
          borderRadius="8px"
          width="120px"
          height="120px"
          overflow="hidden"
          position="relative"
        >
          <Checkbox
            position="absolute"
            right="0"
            top="0"
            value={image.url}
            isChecked={selectedImages.includes(image.url)}
            onChange={(e) => onImageClick(e.target.value, e.target.checked)}
          />

          <Image
            src={image.url}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px',

            }}
            cursor="pointer"
            onClick={() => {
              setPreviewImage(image.url)
              setPreviewOpen(true)
            }}
          />
        </Box>
      ))
  }

  const onSubmit = () => {
    onImageSelect(selectedImages)
    setSelectedImages([])
    setIsOpen(false)
  }

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  return (
    <>
      <Button colorScheme="blue" mr={4} onClick={() => setIsOpen(true)}>View All</Button>
      <Modal size={'xl'} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="30%"
          backdropBlur="1px"
        />
        <ModalContent
          color="white"
          bg="rgb(19,21,56)"
          background="rgb(19,21,56)"
          borderRadius="15px"
        >
          <ModalHeader color="white">Uploaded Images</ModalHeader>
          <ModalCloseButton size="xl" />
          <ModalBody>
            <IconButton
              colorScheme="blue"
              icon={<ChevronLeftIcon />}
              isRound='true'
              onClick={goToPreviousPage}
              isDisabled={currentPage === 0}
            />
            <SimpleGrid
              columns={{ base:1, sm: 4, md: 4, lg: 4, xl: 4, '2xl': 4 }}
              spacing={4}
            >
              {thumbs}
            </SimpleGrid>
            <IconButton
              colorScheme="blue"
              icon={<ChevronRightIcon />}
              isRound='true'
              onClick={goToNextPage}
              isDisabled={thumbs.length < IMAGES_PER_PAGE}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onSubmit}>
              Submit
            </Button>
            <Button colorScheme="blue" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={previewOpen} onClose={() => setPreviewOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Image Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {previewImage && <Image src={previewImage} alt="Preview" />}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => setPreviewOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ImagesUpload
 
