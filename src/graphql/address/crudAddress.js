import { gql, useQuery, useMutation } from "@apollo/client";

const GET_ADDRESSES = gql`
  query GetAddresses {
    addresses {
      id
      street
      city
      state
      zipCode
      country
      userId
    }
  }
`;

const GET_ADDRESS = gql`
  query GetAddress($id: ID!) {
    address(id: $id) {
      id
      street
      city
      state
      zipCode
      country
      userId
    }
  }
`;

const CREATE_ADDRESS = gql`
  mutation CreateAddress($street: String!, $city: String!, $state: String!, $zipCode: String!, $country: String!, $userId: ID!) {
    createAddress(street: $street, city: $city, state: $state, zipCode: $zipCode, country: $country, userId: $userId) {
      id
      street
      city
      state
      zipCode
      country
      userId
    }
  }
`;

const UPDATE_ADDRESS = gql`
  mutation UpdateAddress($id: ID!, $street: String, $city: String, $state: String, $zipCode: String, $country: String) {
    updateAddress(id: $id, street: $street, city: $city, state: $state, zipCode: $zipCode, country: $country) {
      id
      street
      city
      state
      zipCode
      country
      userId
    }
  }
`;

const DELETE_ADDRESS = gql`
  mutation DeleteAddress($id: ID!) {
    deleteAddress(id: $id) {
      id
    }
  }
`;


export function useGetAddresses() {
    return useQuery(GET_ADDRESSES);
  }
  
  export function useGetAddress(id) {
    return useQuery(GET_ADDRESS, { variables: { id } });
  }
  
  export function useCreateAddress() {
    return useMutation(CREATE_ADDRESS, {
      refetchQueries: [{ query: GET_ADDRESSES }],
    });
  }
  
  export function useUpdateAddress() {
    return useMutation(UPDATE_ADDRESS, {
      refetchQueries: [{ query: GET_ADDRESSES }],
    });
  }
  
  export function useDeleteAddress() {
    return useMutation(DELETE_ADDRESS, {
      refetchQueries: [{ query: GET_ADDRESSES }],
    });
  }
  