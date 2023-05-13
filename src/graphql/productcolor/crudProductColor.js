import { useMutation, useQuery, gql } from "@apollo/client";

const GET_PRODUCT_COLORS_BY_PRODUCT_ID = gql`
  query GetProductColorsByProductId($ProductId: ID!) {
    getProductColorsByProductId(ProductId: $ProductId) {
      id
      ProductId
      ColorId
      color {
        id
        name
        hexCode
      }
    }
  }
`;

const ADD_PRODUCT_COLOR = gql`
  mutation AddProductColor($ProductId: ID!, $ColorId: ID!) {
    addProductColor(ProductId: $ProductId, ColorId: $ColorId) {
        id
        ProductId
        ColorId
        color {
          id
          name
          hexCode
        }
    }
  }
`;

const REMOVE_PRODUCT_COLOR = gql`
  mutation RemoveProductColor($input: RemoveProductColorInput!) {
    removeProductColor(input: $input)
  }
`;

const ADD_MULTIPLE_PRODUCT_COLORS = gql`
  mutation AddMultipleProductColors($input: [ProductColorInput!]!) {
    addMultipleProductColors(input: $input) {
      id
      ProductId
      ColorId
    }
  }
`;


export function useGetProductColorsByProductId(ProductId) {
    return useQuery(GET_PRODUCT_COLORS_BY_PRODUCT_ID, {
      variables: { ProductId },
    });
  }

export function useAddProductColor() {
  return useMutation(ADD_PRODUCT_COLOR);
}

export function useRemoveProductColor() {
  return useMutation(REMOVE_PRODUCT_COLOR);
}

export function useAddMultipleProductColors() {
    return useMutation(ADD_MULTIPLE_PRODUCT_COLORS);
  }
