import { useMutation, useQuery, gql } from '@apollo/client'



const GET_PRODUCT_SIZES_BY_PRODUCT_ID = gql`
  query GetProductSizesByProductId($ProductId: ID!) {
    getProductSizesByProductId(ProductId: $ProductId) {
      id
      SizeId
      stock
      size {
        id
        name
      }
    }
  }
`

const ADD_PRODUCT_SIZE = gql`
  mutation AddProductSize($ProductId: ID!, $SizeId: ID!) {
    addProductSize(productSize: {ProductId: $ProductId, SizeId: $SizeId}) {
        id
        SizeId
        stock
        size {
          id
          name
        }
    }
  }
`

const ADD_MULTIPLE_PRODUCT_SIZES = gql`
  mutation AddMultipleProductSizes($input: [ProductSizeInput!]!) {
    addMultipleProductSizes(input: $input) {
      id
      ProductId
      SizeId
      stock
    }
  }
`


const REMOVE_PRODUCT_SIZE = gql`
  mutation RemoveProductSize($input: RemoveProductSizeInput!) {
    removeProductSize(input: $input)
  }
`

export function useGetProductSizesByProductId(ProductId) {
    return useQuery(GET_PRODUCT_SIZES_BY_PRODUCT_ID, {
      variables: { ProductId },
    })
  }

export function useAddProductSize() {
  return useMutation(ADD_PRODUCT_SIZE)
}

export function useRemoveProductSize() {
  return useMutation(REMOVE_PRODUCT_SIZE)
}

export function useAddMultipleProductSizes() {
    return useMutation(ADD_MULTIPLE_PRODUCT_SIZES)
  }