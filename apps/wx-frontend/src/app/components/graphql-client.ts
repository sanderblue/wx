import ApolloClient from 'apollo-boost';
import { environment } from '../../environments/environment';

export const apolloClient = new ApolloClient({
  uri: environment.apiUrl,
});
