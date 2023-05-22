import { useQuery, useMutation, gql } from '@apollo/client'
const GET_COMPANIES = gql`
  query GetCompanies {
    companies {
      id
      name
      adreess
      phoneNumber
      email
      legalId
     
    }
  }
`

export const GET_COMPANIE = gql`
  query GetCompanie($id: ID!) {
    companie(id: $id) {
      id
      name
      adreess
      phoneNumber
      email
      legalId
    }
  }
`

const CREATE_COMPANIE = gql`
  mutation CreateCompanie($name: String!) {
    createCompanie(name: $name) {
      id
      name
      adreess
      phoneNumber
      email
      legalId
    }
  }
`

const UPDATE_COMPANIE = gql`
  mutation UpdateCompanie($id: ID!, $name: String!) {
    updateCompanie(id: $id, name: $name) {
      id
      name
      adreess
      phoneNumber
      email
      legalId
    }
  }
`

export const DELETE_COMPANIE = gql`
  mutation DeleteCompanie($id: ID!) {
    deleteCompanie(id: $id) 
  }
`


export function useGetCompanies() {
    return useQuery(GET_COMPANIES)
  }
  
  export function useCreateCompanie() {
    return useMutation(CREATE_COMPANIE, {
      refetchQueries: [{ query: GET_COMPANIES }],
    })
  }
  
  export function useUpdateCompanie() {
    return useMutation(UPDATE_COMPANIE, {
      refetchQueries: [{ query: GET_COMPANIES }],
    })
  }
  
  export function useDeleteCompanie() {
    return useMutation(DELETE_COMPANIE, {
      refetchQueries: [{ query: GET_COMPANIES }],
    })
  }

  export function useGetCompanie(id) {
    return useQuery(GET_COMPANIE, {
      variables: { id },
    })
  } 
  