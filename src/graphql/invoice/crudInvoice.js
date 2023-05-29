import { useQuery, useMutation, gql } from '@apollo/client'

const GET_INVOICES = gql`
query GetInvoices {
  getAllInvoices {
    id
    user {
      id
      firstName
      lastName
      email
    }
    companies {
      id
      legalId
      name
      email
      phoneNumber
      address
    }
    branch {
      id
      name
    }
    paymentMethod {
      id
      name
      description
    }
    invoiceItems {
      id
      quantity
      price
      product {
        id
        sku
        name
        description
      }
    }
    total
    tax
    exchangeRate {
      currencyId
      date
      rate
      currencyType {
        id
        name
      }
    }
    status
    taxInvoices {
      id
      amount
      tax {
        id
        name
        rate
      }
    }
    createdAt
    updatedAt
  }
}
`

const GET_INVOICE = gql`
  query GetInvoice($id: ID!) {
    getInvoice(id: $id) {
      id
    user {
      id
      firstName
      lastName
      email
    }
    companies {
      id
      legalId
      name
      email
      phoneNumber
      address
    }
    branch {
      id
      name
    }
    paymentMethod {
      id
      name
      description
    }
    invoiceItems {
      id
      quantity
      price
      product {
        id
        sku
        name
        description
      }
    }
    total
    tax
    exchangeRate {
      currencyId
      date
      rate
      currencyType {
        id
        name
      }
    }
    status
    taxInvoices {
      id
      amount
      tax {
        id
        name
        rate
      }
    }
    createdAt
    updatedAt
    }
  }
`

const CREATE_INVOICE = gql`
  mutation CreateInvoice($input: InvoiceInput!) {
    createInvoice(input: $input) {
      id
      user {
        id
        firstName
        lastName
      }
      branch {
        id
        name
      }
      companies {
        id
        name
      }
      paymentMethod {
        id
        name
      }
      total
      tax
      currencyId
      exchangeRateId
      status
      taxInvoices {
        id
        amount
        tax {
          id
          name
          rate
        }
      }
      createdAt
      updatedAt
    }
  }
`

const UPDATE_INVOICE = gql`
  mutation UpdateInvoice($id: ID!, $input: InvoiceInput!) {
    updateInvoice(id: $id, input: $input) {
      id
      user {
        id
        firstName
        lastName
      }
      branch {
        id
        name
      }
      paymentMethod {
        id
        name
      }
      total
      tax
      currencyId
      exchangeRateId
      status
    }
  }
`


export const DELETE_INVOICE = gql`
  mutation DeleteInvoice($id: ID!) {
    deleteInvoice(id: $id)
  }
`


export function useGetInvoices() {
    return useQuery(GET_INVOICES)
  }
  
  export function useGetInvoice(id) {
    return useQuery(GET_INVOICE, { variables: { id } })
  }
  
  // export function useCreateInvoice() {
  //   return useMutation(CREATE_INVOICE, {
  //     refetchQueries: [{ query: GET_INVOICES }],
  //   })
  // }

  export function useCreateInvoice() {
    return useMutation(CREATE_INVOICE, {
      refetchQueries: [{ query: GET_INVOICES }],
      update: (cache, { data: { createInvoice } }) => {
        cache.modify({
          fields: {
            getAllInvoices(existingInvoices = []) {
              const newInvoiceRef = cache.writeFragment({
                data: createInvoice,
                fragment: gql`
                  fragment NewInvoice on Invoice {
                    id
                    total
                    tax
                    currencyId
                    exchangeRateId
                    status
                  }
                `,
              })
              return [...existingInvoices, newInvoiceRef]
            },
          },
        })
      },
    })
  }
  
  export function useUpdateInvoice() {
    return useMutation(UPDATE_INVOICE, {
      refetchQueries: [{ query: GET_INVOICES }],
    })
  }
  
  export function useDeleteInvoice() {
    return useMutation(DELETE_INVOICE, {
      refetchQueries: [{ query: GET_INVOICES }],
    })
  }
  