import { gql, useQuery, useMutation } from "@apollo/client";

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      image
      products {
        id
        name
      }
    }
  }
`;

const GET_CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      id
      name
      image
      products {
        id
        name
      }
    }
  }
`;

const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CategoryInput!) {
    createCategory(input: $input) {
      id
      name
      image
    }
  }
`;

const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $input: CategoryInput!) {
    updateCategory(id: $id, input: $input) {
      id
      name
      image
    }
  }
`;

const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;

export function useGetCategories() {
    return useQuery(GET_CATEGORIES);
  }
  
  export function useGetCategory(id) {
    return useQuery(GET_CATEGORY, { variables: { id } });
  }
  
  export function useCreateCategory() {
    return useMutation(CREATE_CATEGORY, {
      refetchQueries: [{ query: GET_CATEGORIES }],
    });
  }
  
  export function useUpdateCategory() {
    return useMutation(UPDATE_CATEGORY, {
      refetchQueries: [{ query: GET_CATEGORIES }],
    });
  }
  
  export function useDeleteCategory() {
    return useMutation(DELETE_CATEGORY, {
      refetchQueries: [{ query: GET_CATEGORIES }],
    });
  }
  