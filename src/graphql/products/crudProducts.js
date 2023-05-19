import { gql, useQuery, useMutation } from '@apollo/client'

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      sku
      name
      vendor
      description
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
      productColors {
        color {
          id
          name
        }
      }
      productSizes {
        size {
          id
          name
        }
      }
    }
  }
`

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      sku
      name
      vendor
      description
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
      productColors {
        color {
          id
          name
        }
      }
      productSizes {
        size {
          id
          name
        }
      }
    }
  }
`
export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      sku
      name
      vendor
      description
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
    }
  }
`

export const DUPLICATE_PRODUCT = gql`
  mutation DuplicateProduct($input: DuplicateProductInput!) {
    duplicateProduct(input: $input) {
      id
      name
      sku
      vendor
      description
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
    }
  }
`

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      sku
      name
      vendor
      description
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
    }
  }
`

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`

export const UPLOAD_PRODUCT_IMAGE = gql`
  mutation UploadProductImage($id: ID!, $image: Upload!) {
    uploadProductImage(id: $id, image: $image) {
      id
      image
    }
  }
`

export const DELETE_PRODUCT_IMAGE = gql`
  mutation DeleteProductImage($id: ID!) {
    deleteProductImage(id: $id) {
      id
      image
    }
  }
`




export function useGetProducts() {
    return useQuery(GET_PRODUCTS)
  }
  
  export function useGetProduct(id, options = {}) {
    if (!id) {
      return {
        loading: false,
        data: null,
        error: null,
      }
    }
  
    return useQuery(GET_PRODUCT, { variables: { id }, ...options })
  }
  
  
  export function useCreateProduct() {
    return useMutation(CREATE_PRODUCT, {
      refetchQueries: [{ query: GET_PRODUCTS }],
    })
  }

  export function useDuplicateProduct() {
    return useMutation(Duplicate_PRODUCT, {
      refetchQueries: [{ query: GET_PRODUCTS }],
    })
  }
  
  export function useUpdateProduct() {
    return useMutation(UPDATE_PRODUCT, {
      refetchQueries: [{ query: GET_PRODUCTS }],
    })
  }
  
  export function useDeleteProduct() {
    return useMutation(DELETE_PRODUCT, {
      refetchQueries: [{ query: GET_PRODUCTS }],
    })
  }

  export function useUploadProductImage() {
    return useMutation(UPLOAD_PRODUCT_IMAGE, {
      refetchQueries: [{ query: GET_PRODUCTS }],
    })
  }
  
  export function useDeleteProductImage() {
    return useMutation(DELETE_PRODUCT_IMAGE, {
      refetchQueries: [{ query: GET_PRODUCTS }],
    })
  }
  

   