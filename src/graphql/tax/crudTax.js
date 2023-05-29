import { useQuery, useMutation, gql } from '@apollo/client'

const GET_TAXES = gql`
  query GetTaxes {
    getAllTaxes {
      id
      name
      rate
    }
  }
`

const GET_TAX = gql`
  query GetTax($id: ID!) {
    getTax(id: $id) {
      id
      name
      rate
    }
  }
`

const CREATE_TAX = gql`
  mutation CreateTax($name: String!, $rate: Float!) {
    addTax(name: $name, rate: $rate) {
      id
      name
      rate
    }
  }
`

const UPDATE_TAX = gql`
  mutation UpdateTax($id: ID!, $name: String!, $rate: Float!) {
    updateTax(id: $id, input: {name: $name, rate: $rate}) {
      id
      name
      rate
    }
  }
`

export const DELETE_TAX = gql`
  mutation DeleteTax($id: ID!) {
    deleteTax(id: $id) 
  }
`

export function useGetTaxes() {
  return useQuery(GET_TAXES)
}

export function useCreateTax() {
  return useMutation(CREATE_TAX, {
    refetchQueries: [{ query: GET_TAXES }],
  })
}

export function useGetTax(id) {
  return useQuery(GET_TAX, {
    variables: { id },
  })
}

export function useUpdateTax() {
    return useMutation(UPDATE_TAX, {
      refetchQueries: [{ query: GET_TAXES }],
    })
  }
  
  export function useDeleteTax() {
    return useMutation(DELETE_TAX, {
      refetchQueries: [{ query: GET_TAXES }],
    })
  }
