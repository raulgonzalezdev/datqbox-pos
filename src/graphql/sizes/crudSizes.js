import { useQuery, useMutation, gql } from '@apollo/client'
const GET_SIZES = gql`
  query GetSizes {
    sizes {
      id
      name
      products {
        id
        name
      }
    }
  }
`

export const GET_SIZE = gql`
  query GetSize($id: ID!) {
    size(id: $id) {
      id
      name
      products {
        id
        name
      }
    }
  }
`

const CREATE_SIZE = gql`
  mutation CreateSize($name: String!) {
    createSize(name: $name) {
      id
      name
    }
  }
`

const UPDATE_SIZE = gql`
  mutation UpdateSize($id: ID!, $name: String!) {
    updateSize(id: $id, name: $name) {
      id
      name
    }
  }
`

export const DELETE_SIZE = gql`
  mutation DeleteSize($id: ID!) {
    deleteSize(id: $id) 
  }
`


export function useGetSizes() {
    return useQuery(GET_SIZES)
  }
  
  export function useCreateSize() {
    return useMutation(CREATE_SIZE, {
      refetchQueries: [{ query: GET_SIZES }],
    })
  }
  
  export function useUpdateSize() {
    return useMutation(UPDATE_SIZE, {
      refetchQueries: [{ query: GET_SIZES }],
    })
  }
  
  export function useDeleteSize() {
    return useMutation(DELETE_SIZE, {
      refetchQueries: [{ query: GET_SIZES }],
    })
  }

  export function useGetSize(id) {
    return useQuery(GET_SIZE, {
      variables: { id },
    })
  } 
  