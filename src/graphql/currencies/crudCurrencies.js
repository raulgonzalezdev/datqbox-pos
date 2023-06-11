import { useQuery, useMutation, gql } from '@apollo/client'

const GET_CURRENCY_TYPES = gql`
  query GetCurrencyTypes {
    getAllCurrencyTypes {
      id
      name
    }
  }
`

const GET_CURRENCY_TYPE = gql`
  query GetCurrencyType($id: ID!) {
    getCurrencyType(id: $id) {
      id
      name
    }
  }
`

const CREATE_CURRENCY_TYPE = gql`
mutation CreateCurrencyType($name: String!, $symbol: String!) {
  createCurrencyType(input: {name: $name, symbol: $symbol}) {
    id
    name
    symbol
  }
}
`

const UPDATE_CURRENCY_TYPE = gql`
  mutation UpdateCurrencyType($id: ID!, $name: String!, $symbol: String!) {
    updateCurrencyType(id: $id, input: { name: $name, symbol: $symbol }) {
      id
      name
      symbol
    }
  }
`


export const DELETE_CURRENCY_TYPE = gql`
  mutation DeleteCurrencyType($id: ID!) {
    deleteCurrencyType(id: $id) 
  }
`

export function useUpdateCurrencyType() {
  return useMutation(UPDATE_CURRENCY_TYPE, {
    refetchQueries: [{ query: GET_CURRENCY_TYPES }],
  })
}

export function useDeleteCurrencyType() {
  return useMutation(DELETE_CURRENCY_TYPE, {
    refetchQueries: [{ query: GET_CURRENCY_TYPES }],
  })
}


export function useGetCurrencyTypes() {
  return useQuery(GET_CURRENCY_TYPES)
}

export function useCreateCurrencyType() {
  return useMutation(CREATE_CURRENCY_TYPE, {
    refetchQueries: [{ query: GET_CURRENCY_TYPES }],
  })
}

export function useGetCurrencyType(id) {
  return useQuery(GET_CURRENCY_TYPE, {
    variables: { id },
  })
}
