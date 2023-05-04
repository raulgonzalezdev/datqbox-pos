import { useQuery, useMutation, gql } from '@apollo/client';

// Queries y Mutations
const GET_USERS = gql`
  query GetUsers {
    users {
      id
      firstName
      lastName
      email
      password
      avatar
      role
      is_superuser
      is_active
    }
  }
`;

const ADD_USER = gql`
  mutation AddUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        id
        firstName
        lastName
        email
        avatar
        role
        is_superuser
        is_active
      }
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UserInput!) {
    updateUser(id: $id, input: $input) {
      id
      firstName
      lastName
      email
      avatar
      role
      is_superuser
      is_active
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

// Funciones CRUD
export function useGetUsers() {
  return useQuery(GET_USERS);
}

export function useAddUser() {
  return useMutation(ADD_USER);
}

export function useUpdateUser() {
  return useMutation(UPDATE_USER);
}

export function useDeleteUser() {
  return useMutation(DELETE_USER);
}
