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
      product {
        id
        name
      }
    }
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
  
