import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
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
