import { gql, useQuery, useMutation } from "@apollo/client";
const GET_IMAGES = gql`
  query GetImages {
    images {
      id
      url
      product {
        id
        name
      }
    }
  }
`;

const GET_IMAGE = gql`
  query GetImage($id: ID!) {
    image(id: $id) {
      id
      url
      product {
        id
        name
      }
    }
  }
`;

const ADD_IMAGE = gql`
  mutation AddImage($input: AddImageInput!) {
    addImage(input: $input) {
      id
      url
      product{
        id
      }
    }
  }
`;

const ADD_IMAGES = gql`
  mutation AddImages($input: AddImagesInput!) {
    addImages(input: $input) {
      id
      url
      product {
        id
      }
    }
  }
`;

const REMOVE_IMAGE = gql`
  mutation RemoveImage($id: ID!) {
    removeImage(id: $id)
  }
`;

const REMOVE_PRODUCT_IMAGES = gql`
  mutation RemoveProductImages($productId: ID!) {
    removeProductImages(productId: $productId)
  }
`;

export function useGetImages() {
    return useQuery(GET_IMAGES);
  }
  
  export function useGetImage(id) {
    return useQuery(GET_IMAGE, { variables: { id } });
  }
  
  export function useAddImage() {
    return useMutation(ADD_IMAGE, {
      refetchQueries: [{ query: GET_IMAGES }],
    });
  }
  export function useAddImages() {
    return useMutation(ADD_IMAGES, {
      refetchQueries: [{ query: GET_IMAGES }],
    });
  }
  
  export function useRemoveImage() {
    return useMutation(REMOVE_IMAGE, {
      refetchQueries: [{ query: GET_IMAGES }],
    });
  }
  
  export function useRemoveProductImages() {
    return useMutation(REMOVE_PRODUCT_IMAGES, {
      refetchQueries: [{ query: GET_IMAGES }],
    });
  }
  
  
