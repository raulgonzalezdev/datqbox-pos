import { useQuery, useMutation, gql } from '@apollo/client';

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      lat
      lng
    }
  }
`;

const GET_LOCATION = gql`
  query GetLocation($id: ID!) {
    location(id: $id) {
      id
      lat
      lng
    }
  }
`;

const CREATE_LOCATION = gql`
  mutation CreateLocation($input: LocationInput!) {
    createLocation(input: $input) {
      id
      lat
      lng
    }
  }
`;

const UPDATE_LOCATION = gql`
  mutation UpdateLocation($id: ID!, $input: LocationInput!) {
    updateLocation(id: $id, input: $input) {
      id
      lat
      lng
    }
  }
`;

const DELETE_LOCATION = gql`
  mutation DeleteLocation($id: ID!) {
    deleteLocation(id: $id)
  }
`;

export function useGetLocations() {
    return useQuery(GET_LOCATIONS);
  }
  
  export function useGetLocation(id) {
    return useQuery(GET_LOCATION, { variables: { id } });
  }
  
  export function useCreateLocation() {
    return useMutation(CREATE_LOCATION, {
      refetchQueries: [{ query: GET_LOCATIONS }],
    });
  }
  
  export function useUpdateLocation() {
    return useMutation(UPDATE_LOCATION, {
      refetchQueries: [{ query: GET_LOCATIONS }],
    });
  }
  
  export function useDeleteLocation() {
    return useMutation(DELETE_LOCATION, {
      refetchQueries: [{ query: GET_LOCATIONS }],
    });
  }
  
