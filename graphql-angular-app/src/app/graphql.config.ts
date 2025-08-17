import { provideApollo } from 'apollo-angular';
import { InMemoryCache, ApolloClientOptions } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';

export const GRAPHQL_URI = 'http://localhost:4000/graphql'; // your backend

export function provideApolloClient(httpLink: HttpLink) {
  return provideApollo((): ApolloClientOptions<any> => {
    return {
      link: httpLink.create({ uri: GRAPHQL_URI }),
      cache: new InMemoryCache(),
    };
  });
}
