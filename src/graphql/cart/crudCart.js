import { useQuery, useMutation, gql } from '@apollo/client'
const GET_CART = gql`
  query GetCart($id: Int!) {
    getCart(id: $id) {
      id
      userId
      items {
        id
        cartId
        productId
        quantity
        price
        product {
          id
          name
          description
          price
        }
      }
    }
  }
`

const CREATE_CART = gql`
  mutation CreateCart($userId: Int!) {
    createCart(userId: $userId) {
      id
      userId
    }
  }
`

const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($cartId: Int!, $productId: Int!, $quantity: Int!, $price: Float!) {
    addItemToCart(cartId: $cartId, productId: $productId, quantity: $quantity, price: $price) {
      id
      cartId
      productId
      quantity
      price
    }
  }
`

const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemFromCart($id: Int!) {
    removeItemFromCart(id: $id) {
      id
      cartId
      productId
      quantity
      price
    }
  }
`

export function useGetCart(id) {
    return useQuery(GET_CART, { variables: { id } })
  }
  
  export function useCreateCart() {
    return useMutation(CREATE_CART)
  }
  
  export function useAddItemToCart() {
    return useMutation(ADD_ITEM_TO_CART)
  }
  
  export function useRemoveItemFromCart() {
    return useMutation(REMOVE_ITEM_FROM_CART)
  }
  