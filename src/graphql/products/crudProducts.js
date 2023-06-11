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
      isComposite
      productCosts {
        id
        purchaseCost
        otherCosts
        shippingCost
        isTaxedCost
        calcMethod
        taxRateCosts
      

      }
      price
      profit
      category {
        id
        name
      }
      inventory
      rentalType
      featured
      newarrivals
      taxRate
      unit
      taxInclued
      requiresPrescription
      expirationDate
      dosage
      usageInstructions
      contraindications
      activeIngredient
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

      exchangeRate {
        currencyId
        rate
        date
        currencyType {
          id
          name
          symbol
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
      isComposite
      productCosts {
        id
        purchaseCost
        otherCosts
        shippingCost
        isTaxedCost
        calcMethod
        taxRateCosts
      

      }
      price
      profit
      category {
        id
        name
      }
      inventory
      rentalType
      featured
      unit
      newarrivals
      taxRate
      taxInclued
      requiresPrescription
      expirationDate
      dosage
      usageInstructions
      contraindications
      activeIngredient
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

      exchangeRate {
        currencyId
        rate
        date
        currencyType {
          id
          name
          symbol
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
      isComposite
      productCosts {
        id
        purchaseCost
        otherCosts
        shippingCost
        isTaxedCost
        calcMethod
        taxRateCosts
        product {
          id
          categoryId
          name
          description
        }

      }
      price
      profit
      category {
        id
        name
      }
      inventory
      rentalType
      featured
      newarrivals
      unit
      taxRate
      taxInclued
      requiresPrescription
      expirationDate
      dosage
      usageInstructions
      contraindications
      activeIngredient
      exchangeRate {
        currencyId
      }
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
      isComposite
     
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
      unit
      taxInclued
      requiresPrescription
      expirationDate
      dosage
      usageInstructions
      contraindications
      activeIngredient
      exchangeRate {
        currencyId
      }
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
      isComposite
     
      price
      profit
      category {
        id
        name
      }
      inventory
      rentalType
      featured
      newarrivals
      taxRate
      unit
      taxInclued
      requiresPrescription
      expirationDate
      dosage
      usageInstructions
      contraindications
      activeIngredient
      exchangeRate {
        currencyId
      }
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

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($categoryId: ID!) {
    productsByCategory(categoryId: $categoryId) {
      id
      sku
      name
      vendor
      description
      image
      isComposite
      productCosts {
        id
        purchaseCost
        otherCosts
        shippingCost
        isTaxedCost
        calcMethod
        taxRateCosts
      }
      price
      profit
      category {
        id
        name
      }
      inventory
      rentalType
      featured
      newarrivals
      taxRate
      unit
      taxIncluded
      requiresPrescription
      expirationDate
      dosage
      usageInstructions
      contraindications
      activeIngredient
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
      exchangeRate {
        currencyId
        rate
        date
        currencyType {
          id
          name
          symbol
        }
      }
    }
  }
`

export const GET_PRODUCTS_BY_PRICE_RANGE = gql`
  query GetProductsByPriceRange($minPrice: Float!, $maxPrice: Float!) {
    productsByPriceRange(minPrice: $minPrice, maxPrice: $maxPrice) {
      id
      sku
      name
      vendor
      description
      image
      isComposite
      productCosts {
        id
        purchaseCost
        otherCosts
        shippingCost
        isTaxedCost
        calcMethod
        taxRateCosts
      }
      price
      profit
      category {
        id
        name
      }
      inventory
      rentalType
      featured
      newarrivals
      taxRate
      unit
      taxIncluded
      requiresPrescription
      expirationDate
      dosage
      usageInstructions
      contraindications
      activeIngredient
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
      exchangeRate {
        currencyId
        rate
        date
        currencyType {
          id
          name
          symbol
        }
      }
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

export function useGetProductsByCategory(categoryId) {
  return useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: { categoryId },
  })
}

export function useGetProductsByPriceRange(minPrice, maxPrice) {
  return useQuery(GET_PRODUCTS_BY_PRICE_RANGE, {
    variables: { minPrice, maxPrice },
  })
}

