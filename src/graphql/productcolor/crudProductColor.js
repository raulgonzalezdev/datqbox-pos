import { useMutation, useQuery, gql } from "@apollo/client";

const GET_PRODUCT_COLORS_BY_PRODUCT_ID = gql`
  query GetProductColorsByProductId($productId: ID!) {
    getProductColorsByProductId(productId: $productId) {
      id
      productId
      colorId
    }
  }
`;

const ADD_PRODUCT_COLOR = gql`
  mutation AddProductColor($productId: ID!, $colorId: ID!) {
    addProductColor(productId: $productId, colorId: $colorId) {
      id
      productId
      colorId
    }
  }
`;

const REMOVE_PRODUCT_COLOR = gql`
  mutation RemoveProductColor($id: ID!) {
    removeProductColor(id: $id)
  }
`;

export function useGetProductColorsByProductId(productId) {
  return useQuery(GET_PRODUCT_COLORS_BY_PRODUCT_ID, {
    variables: { productId },
  });
}

export function useAddProductColor() {
  return useMutation(ADD_PRODUCT_COLOR);
}

export function useRemoveProductColor() {
  return useMutation(REMOVE_PRODUCT_COLOR);
}
