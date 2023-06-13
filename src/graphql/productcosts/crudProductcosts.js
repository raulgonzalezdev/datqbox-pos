import { gql, useQuery, useMutation } from '@apollo/client'

export const CREATE_PRODUCT_COST = gql`
mutation CreateProductCost($input: CreateProductCostsInput!) {
  createProductCosts(input: $input) {
    id
    productId
    purchaseCost
    otherCosts
    shippingCost
    isTaxedCost
    calcMethod
    taxRateCosts
  }
}

`

export const UPDATE_PRODUCT_COST = gql`
mutation UpdateProductCost($id: ID!, $input: UpdateProductCostsInput!) {
  updateProductCosts(id: $id, input: $input) {
    id
    productId
    purchaseCost
    otherCosts
    shippingCost
    isTaxedCost
    calcMethod
    taxRateCosts
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

export const GET_PRODUCT_COSTS = gql`
  query GetProductCostById($productId: ID!) {
    productCost(productId: $productId) {
      id
      purchaseCost
      otherCosts
      shippingCost
      isTaxedCost
      calcMethod
      taxRateCosts
      productId
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
      update: (cache, { data: { createProductCosts } }) => {
        // Actualización de cache si es necesario
      },
      onError: (error) => {
        // Manejo del error
        console.error(error)
      },
    })
}

export function useUpdateProductCost() {
  return useMutation(UPDATE_PRODUCT_COST, {
    update: (cache, { data: { updateProductCosts } }) => {
      // Actualización de cache si es necesario
    },
    onError: (error) => {
      // Manejo del error
      console.error(error)
    },
  })
}

  
  export function useDeleteProductCost() {
    return useMutation(DELETE_PRODUCT_COST, {
      refetchQueries: (mutationResult) => [{ query: GET_PRODUCT_COSTS, variables: { productId: mutationResult.data.deleteProductCost.product.id } }],
    })
  }
  