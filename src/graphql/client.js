import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client';
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const consoleLink = new ApolloLink((operation, forward) => {

  return forward(operation);
});

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql',
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const link = authLink.concat(consoleLink).concat(httpLink);

export const client = new ApolloClient({
  link: errorLink.concat(link),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});
