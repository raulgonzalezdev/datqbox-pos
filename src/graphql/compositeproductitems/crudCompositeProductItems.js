import { gql, useQuery, useMutation } from '@apollo/client'

export const GET_COMPOSITE_PRODUCT_ITEMS = gql`
  query GetCompositeProductItems($mainProductId: ID!) {
    compositeProducts(mainProductId: $mainProductId) {
      id
      quantity
      includedProduct {
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

export const CREATE_COMPOSITE_PRODUCT_ITEM = gql`
  mutation CreateCompositeProductItems($input: CreateCompositeProductItemsInput!) {
    createCompositeProductItems(input: $input) {
      id
      quantity
      includedProduct {
        id
        name
        price
      }
    }
  }
`

export const UPDATE_COMPOSITE_PRODUCT_ITEM = gql`
mutation UpdateCompositeProductItems($mainProductId: ID!, $includedProductId: ID!, $input: UpdateCompositeProductItemsInput!) {
  updateCompositeProductItems(mainProductId: $mainProductId, includedProductId: $includedProductId, input: $input) {
    mainProduct {
      id
    }
    includedProduct {
      id
    }
    quantity
    includedProduct {
      id
      name
      price
    }
  }
}

`



export function useGetCompositeProductItems(mainProductId) {
  return useQuery(GET_COMPOSITE_PRODUCT_ITEMS, { variables: { mainProductId } })
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
