// src/ApolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4004/graphql', // adapte si le port change
  cache: new InMemoryCache(),
});

export default client;
