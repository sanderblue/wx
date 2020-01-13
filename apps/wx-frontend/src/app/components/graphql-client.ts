import ApolloClient from 'apollo-boost';

export const apolloClient = new ApolloClient({
  uri: 'https://localhost:3333/graphql',
});
