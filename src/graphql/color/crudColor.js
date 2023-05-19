import { gql, useQuery, useMutation } from '@apollo/client'

const GET_COLORS = gql`
  query GetColors {
    colors {
      id
      name
      hexCode
      createdAt
      updatedAt
    }
  }
`

const GET_COLOR = gql`
  query GetColor($id: ID!) {
    color(id: $id) {
      id
      name
      hexCode
      createdAt
      updatedAt
    }
  }
`

const CREATE_COLOR = gql`
  mutation CreateColor($input: ColorInput!) {
    createColor(input: $input) {
      id
      name
      hexCode
    }
  }
`

const UPDATE_COLOR = gql`
  mutation UpdateColor($id: ID!, $input: ColorInput) {
    updateColor(id: $id, input: $input) {
      id
      name
      hexCode
    }
  }
`

export const DELETE_COLOR = gql`
  mutation DeleteColor($id: ID!) {
    deleteColor(id: $id) {
      id
    }
  }
`

export function useGetColors() {
  return useQuery(GET_COLORS)
}

export function useGetColor(id) {
  return useQuery(GET_COLOR, { variables: { id } })
}
  
export function useCreateColor() {
  return useMutation(CREATE_COLOR, {
    refetchQueries: [{ query: GET_COLORS }],
  })
}
  
export function useUpdateColor() {
  return useMutation(UPDATE_COLOR, {
    refetchQueries: [{ query: GET_COLORS }],
  })
}
  
export function useDeleteColor() {
  return useMutation(DELETE_COLOR, {
    refetchQueries: [{ query: GET_COLORS }],
  })
}

