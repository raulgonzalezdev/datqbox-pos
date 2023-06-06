import React, { useState, useCallback, useEffect } from 'react'
import { useCreateInvoice } from 'graphql/invoice/crudInvoice'
import { useCreateInvoiceItem } from 'graphql/invoiceitem/crudInvoiceItem'
import { useCreateTaxInvoice } from 'graphql/taxinvoice/crudTaxInvoice'
import { useCreatePaymentMethod, useGetPaymentMethods } from 'graphql/PaymentMethods/PaymentMethods'

export default function useInvoices(rows, selectedCompany) {
  const [createInvoice, { data: invoiceData }] = useCreateInvoice()
  const [createInvoiceItem] = useCreateInvoiceItem()
  const [createTaxInvoice] = useCreateTaxInvoice()
  const [createPaymentMethod] = useCreatePaymentMethod()

  const [invoice, setInvoice] = useState(null)
  const [paymentMethods, setPaymentMethods] = useState([])
  const { loading: paymentMethodsLoading, error: paymentMethodsError, data: paymentMethodsData } = useGetPaymentMethods()

  useEffect(() => {
    if (paymentMethodsData && paymentMethodsData.paymentMethods) {
      setPaymentMethods(paymentMethodsData.paymentMethods)
    }
  }, [paymentMethodsData])

  const handleCreateInvoice = useCallback(async (invoiceInput) => {
    try {
      const { data } = await createInvoice({ variables: { input: invoiceInput } })
      setInvoice(data.createInvoice)
    } catch (error) {
      console.error('Failed to create invoice', error)
    }
  }, [createInvoice])

  const handleAddProductToInvoice = useCallback(async (productId, quantity, price) => {
    if (!invoice) {
      console.error('No invoice created yet')
      return
    }

    try {
      await createInvoiceItem({ variables: { input: { invoiceId: invoice.id, productId, quantity, price } } })
    } catch (error) {
      console.error('Failed to add product to invoice', error)
    }
  }, [createInvoiceItem, invoice])

  useEffect(() => {
    rows.forEach(row => {
      handleAddProductToInvoice(row.id, row.cant, row.price)
    })
  }, [rows, handleAddProductToInvoice])

  return {
    invoice,
    handleCreateInvoice,
    handleAddProductToInvoice,
    paymentMethods,
    paymentMethodsLoading,
    paymentMethodsError,
  }
}
