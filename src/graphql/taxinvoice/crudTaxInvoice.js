import { useQuery, useMutation, gql } from '@apollo/client'

const GET_TAX_INVOICES = gql`
  query GetTaxInvoices {
    getAllTaxInvoices {
      id
      invoiceId
      taxId
      amount
    }
  }
`

const GET_TAX_INVOICE = gql`
  query GetTaxInvoice($id: ID!) {
    getTaxInvoice(id: $id) {
      id
      invoiceId
      taxId
      amount
    }
  }
`

const CREATE_TAX_INVOICE = gql`
  mutation CreateTaxInvoice($invoiceId: Int!, $taxId: Int!, $amount: Float!) {
    addTaxInvoice(invoiceId: $invoiceId, taxId: $taxId, amount: $amount) {
      id
      invoiceId
      taxId
      amount
    }
  }
`

const UPDATE_TAX_INVOICE = gql`
  mutation UpdateTaxInvoice($id: ID!, $invoiceId: Int!, $taxId: Int!, $amount: Float!) {
    updateTaxInvoice(id: $id, input: {invoiceId: $invoiceId, taxId: $taxId, amount: $amount}) {
      id
      invoiceId
      taxId
      amount
    }
  }
`

export const DELETE_TAX_INVOICE = gql`
  mutation DeleteTaxInvoice($id: ID!) {
    deleteTaxInvoice(id: $id) 
  }
`

export function useUpdateTaxInvoice() {
  return useMutation(UPDATE_TAX_INVOICE, {
    refetchQueries: [{ query: GET_TAX_INVOICES }],
  })
}

export function useDeleteTaxInvoice() {
  return useMutation(DELETE_TAX_INVOICE, {
    refetchQueries: [{ query: GET_TAX_INVOICES }],
  })
}


export function useGetTaxInvoices() {
  return useQuery(GET_TAX_INVOICES)
}

export function useCreateTaxInvoice() {
  return useMutation(CREATE_TAX_INVOICE, {
    refetchQueries: [{ query: GET_TAX_INVOICES }],
  })
}

export function useGetTaxInvoice(id) {
  return useQuery(GET_TAX_INVOICE, {
    variables: { id },
  })
}
