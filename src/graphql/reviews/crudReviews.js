import { gql, useQuery, useMutation } from '@apollo/client'

const GET_REVIEWS = gql`
  query GetReviews {
    getReviews {
      id
      user {
        id
        username
      }
      product {
        id
        name
      }
      rating
      comment
    }
  }
`

const CREATE_REVIEW = gql`
  mutation CreateReview($input: ReviewInput!) {
    createReview(input: $input) {
      id
      user {
        id
        username
      }
      product {
        id
        name
      }
      rating
      comment
    }
  }
`


export function useGetReviews() {
    return useQuery(GET_REVIEWS)
  }
  
  export function useCreateReview() {
    return useMutation(CREATE_REVIEW, {
      refetchQueries: [{ query: GET_REVIEWS }],
    })
  }
  