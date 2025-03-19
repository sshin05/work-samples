import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import { getSession } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getApolloClient = () => {
  // Set apiUrl to default based on current origin.
  let apiUrl =
    typeof window !== 'undefined' && window.location.origin + '/graphql';

  // If API_URL has value, override. This is for local development support.
  if (API_URL) apiUrl = API_URL;

  const terminatingLink = createUploadLink({
    uri: apiUrl,
    headers: {
      // This is required to prevent CORS issue related to uploading files.
      'apollo-require-preflight': 'true'
    }
  });

  const authLink = setContext(async (_, { headers }) => {
    const session = await getSession();

    if (session.accessToken)
      return {
        headers: {
          ...headers,
          authorization: 'Bearer ' + session.accessToken
        }
      };

    return {
      headers: {
        ...headers
      }
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(terminatingLink),
    cache: new InMemoryCache({
      addTypename: false,
      typePolicies: {
        // Needed since some curriculum have the same ID. Apollo
        // normalizes on the ID and typename field causing different versions
        // of the same item to be overwritten by version 1.
        // REF: https://www.apollographql.com/blog/apollo-client/caching/demystifying-cache-normalization/
        ForceMultiplier: {
          keyFields: ['id', 'version']
        },
        LearningPath: {
          keyFields: ['id', 'version']
        },
        Skill: {
          keyFields: ['id', 'version']
        }
      }
    })
  });

  return client;
};
