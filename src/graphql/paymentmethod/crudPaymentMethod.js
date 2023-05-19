import { useQuery, useMutation, gql } from '@apollo/client'

const GET_PAYMENT_METHODS = gql`
  query GetPaymentMethods {
    paymentMethods {
      id
      name
      description
    }
  }
`

const GET_PAYMENT_METHOD = gql`
  query GetPaymentMethod($id: ID!) {
    paymentMethod(id: $id) {
      id
      name
      description
    }
  }
`

const CREATE_PAYMENT_METHOD = gql`
  mutation CreatePaymentMethod($input: PaymentMethodInput!) {
    createPaymentMethod(input: $input) {
      id
      name
      description
    }
  }
`

const UPDATE_PAYMENT_METHOD = gql`
  mutation UpdatePaymentMethod($id: ID!, $input: PaymentMethodInput!) {
    updatePaymentMethod(id: $id, input: $input) {
      id
      name
      description
    }
  }
`

const DELETE_PAYMENT_METHOD = gql`
  mutation DeletePaymentMethod($id: ID!) {
    deletePaymentMethod(id: $id)
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
  