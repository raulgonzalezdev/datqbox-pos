import { gql, useQuery, useMutation } from '@apollo/client'

export const GET_COMPOSITE_PRODUCT_ITEMS = gql`
  query GetCompositeProductItems($productId: ID!) {
    compositeProduct(productId: $productId) {
      id
      name
      compositeProductItems {
        id
        quantity
        product {
          id
          name
          price
        }
      }
    }
  }
`
export const CREATE_COMPOSITE_PRODUCT_ITEM = gql`
  mutation CreateCompositeProductItem($input: CreateCompositeProductItemInput!) {
    createCompositeProductItem(input: $input) {
      id
      quantity
      product {
        id
        name
        price
      }
    }
  }
`
export const UPDATE_COMPOSITE_PRODUCT_ITEM = gql`
  mutation UpdateCompositeProductItem($id: ID!, $input: UpdateCompositeProductItemInput!) {
    updateCompositeProductItem(id: $id, input: $input) {
      id
      quantity
      product {
        id
        name
        price
      }
    }
  }
`

export const DELETE_COMPOSITE_PRODUCT_ITEM = gql`
  mutation DeleteCompositeProductItem($id: ID!) {
    deleteCompositeProductItem(id: $id)
  }
`

export function useGetCompositeProductItems(productId) {
  return useQuery(GET_COMPOSITE_PRODUCT_ITEMS, { variables: { productId } })
}

export function useCreateCompositeProductItem() {
  return useMutation(CREATE_COMPOSITE_PRODUCT_ITEM)
}

export function useUpdateCompositeProductItem() {
  return useMutation(UPDATE_COMPOSITE_PRODUCT_ITEM)
}

export function useDeleteCompositeProductItem() {
  return useMutation(DELETE_COMPOSITE_PRODUCT_ITEM)
}
