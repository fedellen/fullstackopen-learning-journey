import { gql } from 'apollo-boost';

export const AUTHORIZE = gql`
  mutation authorize($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password }) {
      user {
        username
      }
      accessToken
      expiresAt
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview(
    $repoName: String!
    $repoUsername: String!
    $rating: Int!
    $review: String
  ) {
    createReview(
      review: {
        repositoryName: $repoName
        ownerName: $repoUsername
        rating: $rating
        text: $review
      }
    ) {
      id
      user {
        username
      }
      repository {
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
      repositoryId
      rating
      createdAt
      text
    }
  }
`;
