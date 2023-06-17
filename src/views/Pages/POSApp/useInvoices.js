import React, { useState, useCallback, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useCreateInvoice } from 'graphql/invoice/crudInvoice'
import { useCreateInvoiceItem } from 'graphql/invoiceitem/crudInvoiceItem'
import { useCreateTaxInvoice } from 'graphql/taxinvoice/crudTaxInvoice'
import { useGetPaymentMethods, useCreateInvoicePaymentMethod } from 'graphql/PaymentMethods/PaymentMethods'
import { useGetTaxes } from 'graphql/tax/crudTax'


export default function useInvoices(rows,  taxDetails, resetState) {
  const toast = useToast()
  const [createInvoice] = useCreateInvoice()
  const [createInvoiceItem] = useCreateInvoiceItem()
  const [createTaxInvoice] = useCreateTaxInvoice()
  const [createInvoicePaymentMethod] = useCreateInvoicePaymentMethod()
  const [selectedCompany, setSelectedCompany] = useState(null)

  const [selectedPayMethods, setSelectedPayMethods] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const { loading: paymentMethodsLoading, error: paymentMethodsError, data: paymentMethodsData } = useGetPaymentMethods()
  const { loading: taxLoading, error: taxError, data: taxData } = useGetTaxes()
  //console.log('taxDetails', taxDetails)
  useEffect(() => {
    if (paymentMethodsData && paymentMethodsData.paymentMethods) {
      setPaymentMethods(paymentMethodsData.paymentMethods)
    }
  }, [paymentMethodsData])


  const handleCompanySelect = (company) => {
    setSelectedCompany(company)
    //console.log('Selected company: ', company)
  }



  const handleCreateInvoice = useCallback(
    async (selectedMethods, total) => {
      let invoiceId = null
      try {
        const invoiceInput = {
          companyId:  selectedCompany.id,
          userId:  20,
          branchId: 1,
          exchangeRateId: 1,
          total: total,
          status: 'PAGADO',
        }

        const { data } = await createInvoice({ variables: { input: invoiceInput } })
        invoiceId = data.createInvoice.id
        

        for (const row of rows) {
          await createInvoiceItem({
            variables: {
              input: {
                invoiceId: parseInt(invoiceId),
                productId: parseInt(row.id),
                quantity: row.cant,
                price: row.price,
              },
            },
          })
        }

        for (const [paymentMethodId, amount] of selectedMethods) {
          await createInvoicePaymentMethod({ variables: { input: { invoiceId, paymentMethodId: paymentMethodId, amount } } })
        }
        
       // console.log('taxDetails',taxDetails)
        // Crear TaxInvoices para cada detalle de impuesto
        for (const taxRate of Object.keys(taxDetails)) {
          const taxDetail = taxDetails[taxRate]

          const tax = taxData.getAllTaxes.find((tax) => tax.rate === parseInt(taxRate))

          if (!tax) {
            console.error(`No se encontró tax con rate ${taxRate}`)
            continue
          }
      
          const taxId = tax.id
          console.log('cambio', {
            variables: {
              invoiceId: parseInt(invoiceId),
              taxId: parseInt(taxId),
              amount: taxDetail.tax,
              subtotal: taxDetail.subtotal,
            },
          })
      
          await createTaxInvoice({
            variables: {
              invoiceId: parseInt(invoiceId),
              taxId: parseInt(taxId),
              amount: taxDetail.tax,
              subtotal: taxDetail.subtotal,
            },
          })
      }
      
 
        toast({
          title: 'Factura creada con éxito',
          description: 'La factura se ha creado correctamente.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })

        resetState()
        setSelectedCompany(null)
        setPaymentMethods([])
        
       
      } catch (error) {
        console.error('Failed to create invoice', error)
        toast({
          title: 'Error al crear la factura',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
      return invoiceId
    },
    [ createInvoice, createInvoiceItem, createInvoicePaymentMethod, createTaxInvoice, rows, selectedPayMethods, taxDetails, toast, selectedCompany]
  )


  return {

    handleCreateInvoice,
    paymentMethods,
    paymentMethodsLoading,
    paymentMethodsError,
    selectedPayMethods,
    setSelectedPayMethods,
    handleCompanySelect,
    selectedCompany,
    resetState,
  }
}
