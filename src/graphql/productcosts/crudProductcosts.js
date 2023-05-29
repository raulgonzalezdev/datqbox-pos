import { gql, useQuery, useMutation } from '@apollo/client'

export const CREATE_PRODUCT_COST = gql`
  mutation CreateProductCost($productId: ID!, $input: CreateProductCostInput!) {
    createProductCost(productId: $productId, input: $input) {
      id
      purchaseCost
      otherCosts
      shippingCost
    }
  }
`

export const UPDATE_PRODUCT_COST = gql`
  mutation UpdateProductCost($id: ID!, $input: UpdateProductCostInput!) {
    updateProductCost(id: $id, input: $input) {
      id
      purchaseCost
      otherCosts
      shippingCost
    }
}
 `

 export const DELETE_PRODUCT_COST = gql`
  mutation DeleteProductCost($id: ID!) {
    deleteProductCost(id: $id) {
      id
    }
  }
`

export function useGetProductCosts(productId) {
    return useQuery(GET_PRODUCT_COSTS, { variables: { productId } })
  }
  
  export function useGetProductCost(id) {
    return useQuery(GET_PRODUCT_COST, { variables: { id } })
  }
  
  export function useCreateProductCost() {
    return useMutation(CREATE_PRODUCT_COST, {
      refetchQueries: (mutationResult) => [{ query: GET_PRODUCT_COSTS, variables: { productId: mutationResult.data.createProductCost.product.id } }],
    })
  }
  
  export function useUpdateProductCost() {
    return useMutation(UPDATE_PRODUCT_COST, {
      refetchQueries: (mutationResult) => [{ query: GET_PRODUCT_COSTS, variables: { productId: mutationResult.data.updateProductCost.product.id } }],
    })
  }
  
  export function useDeleteProductCost() {
    return useMutation(DELETE_PRODUCT_COST, {
      refetchQueries: (mutationResult) => [{ query: GET_PRODUCT_COSTS, variables: { productId: mutationResult.data.deleteProductCost.product.id } }],
    })
  }
  