'use client';
import { ApolloProvider as ApolloProviderClient } from '@apollo/client';
import { getApolloClient } from './getApolloClient';

const ApolloProvider = ({ children }) => {
  const client = getApolloClient();

  return (
    <ApolloProviderClient client={client}>{children}</ApolloProviderClient>
  );
};

export default ApolloProvider;
