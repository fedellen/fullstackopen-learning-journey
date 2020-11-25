import { RepositoryListContainer } from '../components/RepoList';
import React from 'react';
import { render } from '@testing-library/react-native';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        pageInfo: {
          totalCount: 8,
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd'
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4'
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd'
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4'
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ=='
          }
        ]
      };

      const { getByText } = render(
        <RepositoryListContainer
          repositories={repositories}
          testID='repoList'
        />
      );

      // Add all text to a single array
      let checkFor = [];
      repositories.edges.forEach((element) => {
        checkFor.push(element.node.fullName);
        checkFor.push(element.node.description);
        checkFor.push(element.node.language);
        // these numbers are all rendered with "21k" if > 1000
        checkFor.push(
          element.node.forksCount >= 10000
            ? Math.round(element.node.forksCount / 1000) + 'k'
            : element.node.forksCount.toString()
        );
        checkFor.push(
          element.node.stargazersCount >= 10000
            ? Math.round(element.node.stargazersCount / 1000) + 'k'
            : element.node.stargazersCount.toString()
        );
        checkFor.push(element.node.ratingAverage.toString());

        // checkFor.push(element.node.reviewCount.toString());

        // removed reviewCount to avoid duplicate "3" strings
        // use a different solution to the scale tests
      });

      // Check all text
      checkFor.forEach((textString) => {
        expect(getByText(textString)).toBeDefined();
      });
    });
  });
});
