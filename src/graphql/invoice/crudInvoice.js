import { useQuery, useMutation, gql } from '@apollo/client';

const GET_INVOICES = gql`
  query GetInvoices {
    getInvoices {
      id
      user {
        id
        username
      }
      branch {
        id
        name
      }
      paymentMethod {
        id
        name
      }
      total
      tax
      status
    }
  }
`;

const GET_INVOICE = gql`
  query GetInvoice($id: ID!) {
    getInvoice(id: $id) {
      id
      user {
        id
        username
      }
      branch {
        id
        name
      }
      paymentMethod {
        id
        name
      }
      total
      tax
      status
    }
  }
`;

const CREATE_INVOICE = gql`
  mutation CreateInvoice($input: CreateInvoiceInput!) {
    createInvoice(input: $input) {
      id
      user {
        id
        username
      }
      branch {
        id
        name
      }
      paymentMethod {
        id
        name
      }
      total
      tax
      status
    }
  }
`;

const UPDATE_INVOICE = gql`
  mutation UpdateInvoice($id: ID!, $input: UpdateInvoiceInput!) {
    updateInvoice(id: $id, input: $input) {
      id
      user {
        id
        username
      }
      branch {
        id
        name
      }
      paymentMethod {
        id
        name
      }
      total
      tax
      status
    }
  }
`;

const DELETE_INVOICE = gql`
  mutation DeleteInvoice($id: ID!) {
    deleteInvoice(id: $id)
  }
`;


export function useGetInvoices() {
    return useQuery(GET_INVOICES);
  }
  
  export function useGetInvoice(id) {
    return useQuery(GET_INVOICE, { variables: { id } });
  }
  
  export function useCreateInvoice() {
    return useMutation(CREATE_INVOICE, {
      refetchQueries: [{ query: GET_INVOICES }],
    });
  }
  
  export function useUpdateInvoice() {
    return useMutation(UPDATE_INVOICE, {
      refetchQueries: [{ query: GET_INVOICES }],
    });
  }
  
  export function useDeleteInvoice() {
    return useMutation(DELETE_INVOICE, {
      refetchQueries: [{ query: GET_INVOICES }],
    });
  }
  