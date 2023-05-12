import { useMutation, useQuery, gql } from "@apollo/client";

const GET_PRODUCT_SIZES_BY_PRODUCT_ID = gql`
  query GetProductSizesByProductId($productId: ID!) {
    getProductSizesByProductId(productId: $productId) {
      id
      size
      stock
    }
  }
`;

const ADD_PRODUCT_SIZE = gql`
  mutation AddProductSize($productId: ID!, $sizeId: ID!) {
    addProductSize(productSize: {productId: $productId, sizeId: $sizeId}) {
      id
      size
      stock
    }
  }
`;

const REMOVE_PRODUCT_SIZE = gql`
  mutation RemoveProductSize($id: ID!) {
    removeProductSize(id: $id)
  }
`;

export function useGetProductSizesByProductId(productId) {
  return useQuery(GET_PRODUCT_SIZES_BY_PRODUCT_ID, {
    variables: { productId },
  });
}

export function useAddProductSize() {
  return useMutation(ADD_PRODUCT_SIZE);
}

export function useRemoveProductSize() {
  return useMutation(REMOVE_PRODUCT_SIZE);
}
