import { useQuery, useMutation, gql } from '@apollo/client'

const GET_COMPANIES = gql`
  query GetCompanies {
    companies {
      id
      name
      address
      phoneNumber
      email
      legalId
    }
  }
`

export const GET_COMPANY = gql`
  query GetCompany($id: ID!) {
    company(id: $id) {
      id
      name
      address
      phoneNumber
      email
      legalId
    }
  }
`

const CREATE_COMPANY = gql`
  mutation CreateCompany($input: CompanyInput!) {
    addCompany(input: $input) {
      id
      name
      address
      phoneNumber
      email
      legalId
    }
  }
`


const UPDATE_COMPANY = gql`
  mutation UpdateCompany($id: ID!, $input: CompanyInput!) {
    updateCompany(id: $id, input: $input) {
      id
      name
      address
      phoneNumber
      email
      legalId
    }
  }
`


export const DELETE_COMPANY = gql`
  mutation DeleteCompany($id: ID!) {
    deleteCompany(id: $id) 
  }
`

// Using these hooks
export function useGetCompanies() {
    return useQuery(GET_COMPANIES)
}

export function useCreateCompany() {
    return useMutation(CREATE_COMPANY, {
      refetchQueries: [{ query: GET_COMPANIES }],
    })
  }
  

export function useUpdateCompany() {
  return useMutation(UPDATE_COMPANY, {
    refetchQueries: [{ query: GET_COMPANIES }],
  })
}

export function useDeleteCompany() {
  return useMutation(DELETE_COMPANY, {
    refetchQueries: [{ query: GET_COMPANIES }],
  })
}

export function useGetCompany(id) {
  return useQuery(GET_COMPANY, {
    variables: { id },
  })
}
