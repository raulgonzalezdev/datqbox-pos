import React from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const InvoicePDF = ({ invoice, onPdfGenerated }) => {
  const generatePDF = () => {
    const doc = new jsPDF()

    // Encabezado
    autoTable(doc, {
      body: [
        ['Factura Nº:', invoice.id],
        ['Fecha:', new Date(invoice.createdAt).toLocaleDateString()],
        ['Cliente:', `${invoice.user.firstName} ${invoice.user.lastName}`],
        ['Empresa:', invoice.companies[0].name],
        ['Total:', `$${invoice.total.toFixed(2)}`],
        ['Método de Pago:', `${invoice.invoicePaymentMethods[0].paymentMethod.name} - ${invoice.invoicePaymentMethods[0].paymentMethod.description}`],
        ['Tasa de Cambio:', `${invoice.exchangeRate.rate} ${invoice.exchangeRate.currencyType.name} (${invoice.exchangeRate.date})`],
        ['Estado:', invoice.status]
      ],
      margin: { top: 20 }
    })

    // Productos
    autoTable(doc, {
      head: [['Producto', 'Precio', 'Cantidad']],
      body: invoice.invoiceItems.map(item => [
        item.product.name,
        `$${item.price.toFixed(2)}`,
        item.quantity
      ]),
      margin: { top: 20 }
    })

    // Impuestos
    autoTable(doc, {
      head: [['Impuesto', 'Monto', 'Tasa']],
      body: invoice.taxInvoices.map(tax => [
        tax.tax.name,
        `$${tax.amount.toFixed(2)}`,
        `${tax.tax.rate}%`
      ]),
      margin: { top: 20 }
    })

    // Formas de Pago
    autoTable(doc, {
      head: [['Método de Pago', 'Monto']],
      body: invoice.invoicePaymentMethods.map(paymentMethod => [
        paymentMethod.paymentMethod.name,
        `$${paymentMethod.amount.toFixed(2)}`
      ]),
      margin: { top: 20 }
    })

    // convierte el documento en un Blob
    const pdfOutput = doc.output()
    const blob = new Blob([pdfOutput], { type: 'application/pdf' })

    // crea una URL de objeto del Blob
    const url = URL.createObjectURL(blob)

    // invoca la función de devolución de llamada con la URL
    onPdfGenerated(url)

    const data = 'Esto es un ejemplo de datos para guardar en el archivo .dat'

    chrome.runtime.sendMessage('gnejafnnekdhcbmjeonmodfknfockaem', 
        { message: 'guarda_archivo', data: data }, 
        function(response) {
            console.log(response.message)
        })

  }

  // Llama a generatePDF inmediatamente cuando el componente se monta
  React.useEffect(() => {
    generatePDF()
  }, [])

  return null
}

export default InvoicePDF
