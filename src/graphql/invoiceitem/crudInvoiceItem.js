import { useQuery, useMutation, gql } from '@apollo/client'

const GET_INVOICE_ITEMS = gql`
  query GetInvoiceItems {
    invoiceItems {
      id
      invoiceId
      productId
      quantity
      price
    }
  }
`

const GET_INVOICE_ITEM = gql`
  query GetInvoiceItem($id: ID!) {
    invoiceItem(id: $id) {
      id
      invoiceId
      productId
      quantity
      price
    }
  }
`

const CREATE_INVOICE_ITEM = gql`
  mutation CreateInvoiceItem($input: InvoiceItemInput!) {
    createInvoiceItem(input: $input) {
      id
      invoiceId
      productId
      quantity
      price
    }
  }
`

const UPDATE_INVOICE_ITEM = gql`
  mutation UpdateInvoiceItem($id: ID!, $input: InvoiceItemInput!) {
    updateInvoiceItem(id: $id, input: $input) {
      id
      invoiceId
      productId
      quantity
      price
    }
  }
`

const DELETE_INVOICE_ITEM = gql`
  mutation DeleteInvoiceItem($id: ID!) {
    deleteInvoiceItem(id: $id)
  }
`


export function useGetInvoiceItems() {
    return useQuery(GET_INVOICE_ITEMS)
  }
  
  export function useGetInvoiceItem(id) {
    return useQuery(GET_INVOICE_ITEM, { variables: { id } })
  }
  
  export function useCreateInvoiceItem() {
    return useMutation(CREATE_INVOICE_ITEM, {
      refetchQueries: [{ query: GET_INVOICE_ITEMS }],
    })
  }
  
  export function useUpdateInvoiceItem() {
    return useMutation(UPDATE_INVOICE_ITEM, {
      refetchQueries: [{ query: GET_INVOICE_ITEMS }],
    })
  }
  
  export function useDeleteInvoiceItem() {
    return useMutation(DELETE_INVOICE_ITEM, {
      refetchQueries: [{ query: GET_INVOICE_ITEMS }],
    })
  }
  