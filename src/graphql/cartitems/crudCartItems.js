import { useQuery, useMutation, gql } from '@apollo/client'

const GET_CART_ITEMS = gql`
  query GetCartItems($cartId: ID!) {
    getCartItems(cartId: $cartId) {
      id
      cartId
      product {
        id
        name
        description
        price
      }
      quantity
      price
    }
  }
`

const ADD_CART_ITEM = gql`
  mutation AddCartItem($cartId: ID!, $productId: ID!, $quantity: Int!, $price: Float!) {
    addCartItem(cartId: $cartId, productId: $productId, quantity: $quantity, price: $price) {
      id
      cartId
      product {
        id
        name
        description
        price
      }
      quantity
      price
    }
  }
`

const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($id: ID!, $quantity: Int!) {
    updateCartItem(id: $id, quantity: $quantity) {
      id
      cartId
      product {
        id
        name
        description
        price
      }
      quantity
      price
    }
  }
`

const DELETE_CART_ITEM = gql`
  mutation DeleteCartItem($id: ID!) {
    deleteCartItem(id: $id)
  }
`


export function useGetCartItems(cartId) {
    return useQuery(GET_CART_ITEMS, { variables: { cartId } })
  }
  
  export function useAddCartItem() {
    return useMutation(ADD_CART_ITEM)
  }
  
  export function useUpdateCartItem() {
    return useMutation(UPDATE_CART_ITEM)
  }
  
  export function useDeleteCartItem() {
    return useMutation(DELETE_CART_ITEM)
  }
  