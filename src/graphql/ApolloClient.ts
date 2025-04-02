import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { getToken } from 'src/modules/authentication/authentication/adapters/out/cookies';
import { getMainDefinition } from '@apollo/client/utilities';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

const httpUrl = process.env.REACT_APP_GRAPHQL_HTTP_URI;
const wsUrl = process.env.REACT_APP_GRAPHQL_WS_URI;

const httpLink = createUploadLink({
  uri: httpUrl,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: wsUrl as string,
  }),
);

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log('-------graphQLErrors', graphQLErrors);
  console.log('-------networkError', networkError);
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, splitLink]),
  cache: new InMemoryCache({
    addTypename: false,
    typePolicies: {
      Macros: {
        keyFields: [],
      },
    },
  }),
});
