import { useQuery, useMutation, gql } from '@apollo/client'

const GET_PAYMENT_METHODS = gql`
  query GetPaymentMethods {
    paymentMethods {
      id
      name
      description
      image
    }
  }
`

const GET_PAYMENT_METHOD = gql`
  query GetPaymentMethod($id: ID!) {
    paymentMethod(id: $id) {
      id
      name
      description
      image
    }
  }
`

const CREATE_PAYMENT_METHOD = gql`
  mutation CreatePaymentMethod($input: PaymentMethodInput!) {
    createPaymentMethod(input: $input) {
      id
      name
      description
      image
    }
  }
`

const UPDATE_PAYMENT_METHOD = gql`
  mutation UpdatePaymentMethod($id: ID!, $input: PaymentMethodInput!) {
    updatePaymentMethod(id: $id, input: $input) {
      id
      name
      description
      image
    }
  }
`

const DELETE_PAYMENT_METHOD = gql`
  mutation DeletePaymentMethod($id: ID!) {
    deletePaymentMethod(id: $id)
  }
`

export const CREATE_INVOICE_PAYMENT_METHOD = gql`
  mutation CreateInvoicePaymentMethod($input: InvoicePaymentMethodInput!) {
    createInvoicePaymentMethod(input: $input) {
      invoiceId
      paymentMethodId
      amount
      invoice {
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
        paymentMethods {
          id
          name
        }
        total
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
      paymentMethod {
        id
        name
      }
    }
  }
`

export const DELETE_INVOICE_PAYMENT_METHOD = gql`
  mutation DeleteInvoicePaymentMethod($invoiceId: ID!, $paymentMethodId: ID!) {
    deleteInvoicePaymentMethod(invoiceId: $invoiceId, paymentMethodId: $paymentMethodId)
  }
`


export function useGetPaymentMethods() {
  return useQuery(GET_PAYMENT_METHODS)
}

export function useGetPaymentMethod(id) {
  return useQuery(GET_PAYMENT_METHOD, { variables: { id } })
}

export function useCreatePaymentMethod() {
  return useMutation(CREATE_PAYMENT_METHOD, {
    refetchQueries: [{ query: GET_PAYMENT_METHODS }],
    update: (cache, { data: { createPaymentMethod } }) => {
      cache.modify({
        fields: {
          paymentMethods(existingPaymentMethods = []) {
            const newPaymentMethodRef = cache.writeFragment({
              data: createPaymentMethod,
              fragment: gql`
                fragment NewPaymentMethod on PaymentMethod {
                  id
                  name
                  description
                }
              `,
            })
            return [...existingPaymentMethods, newPaymentMethodRef]
          },
        },
      })
    },
  })
}

export function useCreateInvoicePaymentMethod() {
  return useMutation(CREATE_INVOICE_PAYMENT_METHOD, {
    refetchQueries: [{ query: GET_PAYMENT_METHODS }],
  })
}

export function useUpdatePaymentMethod() {
  return useMutation(UPDATE_PAYMENT_METHOD, {
    refetchQueries: [{ query: GET_PAYMENT_METHODS }],
  })
}

export function useDeletePaymentMethod() {
  return useMutation(DELETE_PAYMENT_METHOD, {
    refetchQueries: [{ query: GET_PAYMENT_METHODS }],
  })
}
