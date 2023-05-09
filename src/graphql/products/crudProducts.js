import { gql, useQuery, useMutation } from "@apollo/client";

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      vendor
      image
      price
      category {
        id
        name
      }
      inventory
      rentalType
      featured
      newarrivals
      taxRate
      images {
        id
        url
      }
      reviews {
        id
        rating
        comment
      }
      orderItems {
        id
        quantity
      }
      colors {
        id
        name
      }
      sizes {
        id
        name
      }
    }
  }
`;

const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      vendor
      image
      price
      category {
        id
        name
      }
      inventory
      rentalType
      featured
      newarrivals
      taxRate
      images {
        id
        url
      }
      reviews {
        id
        rating
        comment
      }
      orderItems {
        id
        quantity
      }
      colors {
        id
        name
      }
      sizes {
        id
        name
      }
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      vendor
      image
      price
      categoryId
      inventory
      rentalType
      featured
      newarrivals
      taxRate
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      vendor
      image
      price
      categoryId
      inventory
      rentalType
      featured
      newarrivals
      taxRate
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;


export function useGetProducts() {
    return useQuery(GET_PRODUCTS);
  }
  
  export function useGetProduct(id) {
    return useQuery(GET_PRODUCT, { variables: { id } });
  }
  
  export function useCreateProduct() {
    return useMutation(CREATE_PRODUCT, {
      refetchQueries: [{ query: GET_PRODUCTS }],
    });
  }
  
  export function useUpdateProduct() {
    return useMutation(UPDATE_PRODUCT, {
      refetchQueries: [{ query: GET_PRODUCTS }],
    });
  }
  
  export function useDeleteProduct() {
    return useMutation(DELETE_PRODUCT, {
      refetchQueries: [{ query: GET_PRODUCTS }],
    });
  }
  