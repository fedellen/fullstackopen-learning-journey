import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          fullName
          description
          ownerAvatarUrl
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
    }
  }
`;

export const GET_SINGLE_REPO = gql`
  query getRepo($id: String!) {
    repository(id: $id) {
      id
      fullName
      description
      ownerAvatarUrl
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      url
    }
  }
`;

export const AUTH_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;

// other queries

/*
/
/   This shows how to use GET_REPOSITORIES
/
/ import { useQuery } from '@apollo/react-hooks';
/
/ import { GET_REPOSITORIES } from '../graphql/queries';
/
/ const Component = () => {
/  const { data, error, loading } = useQuery(GET_REPOSITORIES);
/  // ...
/ };
/
/
*/
