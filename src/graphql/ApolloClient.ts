// import { getToken } from './../shared/helpers/LocalStorage';

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

/*
export const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  // uri: 'http://ec2-18-212-53-234.compute-1.amazonaws.com/graphql',
  // uri: 'https://nk-backend-production.up.railway.app/graphql',

  onError: ({ graphQLErrors, networkError }) => {
    console.log('-------graphQLErrors', graphQLErrors);
    console.log('-------networkError', networkError);
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
      );
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
    return graphQLErrors[0];
  },

  fetchOptions: {
    credentials: 'include',
  },
  request: (operation): void => {
    const token = getToken();
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
});
*/
