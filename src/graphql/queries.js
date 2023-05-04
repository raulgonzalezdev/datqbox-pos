// queries.js
import { gql } from "@apollo/client";

export const ALL_PRODUCTS_QUERY = gql`
  query AllProductsQuery {
    products {
      id
      name
      image
      price
      featured
      newarrivals
      category {
        id
        name
      }
    }
  }
`;
ALL_PRODUCTS_QUERY.queryName = "AllProductsQuery";

export const PRODUCT_QUERY = gql`
  query ProductQuery($id: ID!) {
    product(id: $id) {
      id
      name
      vendor
      image
      price
      featured
      newarrivals
      category {
        id
        name
      }
      rentalType
      availability
      location {
        lat
        lng
      }
      inventory
    }
  }
`;
PRODUCT_QUERY.queryName = "ProductQuery";

export const ALL_CATEGORIES_QUERY = gql`
  query AllCategoriesQuery {
    categories {
      id
      name
      image
    }
  }
`;
ALL_CATEGORIES_QUERY.queryName ="AllCategoriesQuery";

export const CATEGORY_QUERY = gql`
  query CategoryQuery($id: ID!) {
    category(id: $id) {
      id
      name
      image
      products {
        id
        name
        image
        vendor
        price
      }
    }
  }
`;
CATEGORY_QUERY.queryName = "CategoryQuery";

export const FEATURED_PRODUCTS_QUERY = gql`
  query FeaturedProductsQuery {
    featuredProducts {
        id
        name
        image
        price
        featured
        newarrivals
        category {
          id
          name
        }
    }
  }
`;
FEATURED_PRODUCTS_QUERY.queryName = "FeaturedProductsQuery";

export const NEW_ARRIVALS_PRODUCTS_QUERY = gql`
  query NewArrivalsProductsQuery {
    newArrivalsProducts {
        id
        name
        image
        price
        featured
        newarrivals
        category {
          id
          name
        }
    }
  }
`;
NEW_ARRIVALS_PRODUCTS_QUERY.queryName = "NewArrivalsProductsQuery";
