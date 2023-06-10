import React, { useState } from 'react'
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogContent, Button } from '@chakra-ui/react'

import InvoicePDF from './InvoicePDF'

const AlertDialogWithPDF = ({ isOpen, onClose, documentData, title, bodyText, noButtonText, yesButtonText }) => {
  const [pdfUrl, setPdfUrl] = useState(null)

  const handlePdfGenerated = (url) => {
    setPdfUrl(url)
  }

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{bodyText}</AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose} mr={6}>
              {noButtonText}
            </Button>
            {pdfUrl && (
              <Button
                onClick={() => {
                  window.open(pdfUrl, '_blank')
                  onClose()
                }}
              >
                {yesButtonText}
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>

      <InvoicePDF invoice={documentData} onPdfGenerated={handlePdfGenerated} />
    </AlertDialog>
  )
}

export default AlertDialogWithPDF
