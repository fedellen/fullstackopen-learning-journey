import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query getAllRepo(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
    ) {
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
  query getRepo($id: ID!) {
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
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
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
