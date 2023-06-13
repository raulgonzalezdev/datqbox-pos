import { useQuery, useMutation, gql } from '@apollo/client'

const GET_EXCHANGE_RATES = gql`
  query GetExchangeRates {
    getAllExchangeRates {
      id
      date
      rate
      currencyId
    }
  }
`

const GET_EXCHANGE_RATE = gql`
  query GetExchangeRate($id: ID!) {
    getExchangeRate(id: $id) {
      id
      date
      rate
      currencyId
    }
  }
`

const CREATE_EXCHANGE_RATE = gql`
  mutation CreateExchangeRate($date: String!, $rate: Float!, $currencyTypeId: Int!) {
    createExchangeRate(input: {date: $date, rate: $rate, currencyTypeId: $currencyTypeId}) {
      id
      date
      rate
      currencyId
    }
  }
`

const UPDATE_EXCHANGE_RATE = gql`
  mutation UpdateExchangeRate($id: ID!, $date: String!, $rate: Float!, $currencyTypeId: Int!) {
    updateExchangeRate(id: $id, input: {date: $date, rate: $rate, currencyTypeId: $currencyTypeId}) {
      id
      date
      rate
      currencyId
    }
  }
`

export const DELETE_EXCHANGE_RATE = gql`
  mutation DeleteExchangeRate($id: ID!) {
    deleteExchangeRate(id: $id) 
  }
`

export function useUpdateExchangeRate() {
  return useMutation(UPDATE_EXCHANGE_RATE, {
    refetchQueries: [{ query: GET_EXCHANGE_RATES }],
  })
}

export function useDeleteExchangeRate() {
  return useMutation(DELETE_EXCHANGE_RATE, {
    refetchQueries: [{ query: GET_EXCHANGE_RATES }],
  })
}

export function useGetExchangeRates() {
  return useQuery(GET_EXCHANGE_RATES)
}

export function useCreateExchangeRate() {
  return useMutation(CREATE_EXCHANGE_RATE, {
    refetchQueries: [{ query: GET_EXCHANGE_RATES }],
  })
}

export function useGetExchangeRate(id) {
  return useQuery(GET_EXCHANGE_RATE, {
    variables: { id },
  })
}
