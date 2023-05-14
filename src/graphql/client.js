import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client';
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';

// Aquí hay algunos enlaces de ejemplo que podrías tener
const errorLink = onError(({ graphqlErrors, networkError }) => {
  // manejar errores
});

const authLink = setContext((_, { headers }) => {
  // obtener el token de autenticación de almacenamiento local si existe
  const token = localStorage.getItem('authToken');
  // devolver las cabeceras al contexto para que estén disponibles después del enlace de autenticación
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const uploadLink = createUploadLink({ uri: 'http://localhost:4000/graphql' });

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, uploadLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      errorPolicy: "all", // Mostrar todos los errores, incluso si hay datos parciales
    },
    mutate: {
      errorPolicy: "all", // Mostrar todos los errores, incluso si hay datos parciales
    },
  },
});

