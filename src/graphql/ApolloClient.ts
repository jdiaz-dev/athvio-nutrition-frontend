import { getUserFromLocalStorage } from './../shared/helpers/LocalStorage';

import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',

});

const authLink = setContext((_, { headers }) => {
  const token = getUserFromLocalStorage().token;
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log('-------graphQLErrors', graphQLErrors)
  console.log('-------networkError', networkError)
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const apolloClient = new ApolloClient({
  // link: authLink.concat(httpLink),//.concat(errorLink),
  link:ApolloLink.from([errorLink, authLink, httpLink ]),

  cache: new InMemoryCache(),
});
// apolloClient.setLink(from([errorLink]))
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
    const token = getUserFromLocalStorage().token;
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
});
 */
