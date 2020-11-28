import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import { GET_SINGLE_REPO } from '../../graphql/queries';
import * as Linking from 'expo-linking';

import Button from '../Styled/Button';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

const RepositorySingle = () => {
  const { id } = useParams();

  const { data, loading } = useQuery(GET_SINGLE_REPO, {
    fetchPolicy: 'cache-and-network',
    variables: { id }
  });

  if (loading) return null;

  const githubLink = () => {
    console.log('send to github', data.repository.url);
    Linking.openURL(data.repository.url);
  };

  const reviewNodes = data
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      style={{ paddingHorizontal: 20 }}
      ListHeaderComponent={<RepositoryItem item={data.repository} />}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListFooterComponent={
        <Button text={'Open in GitHub'} onPress={githubLink} />
      }
    />
  );
};

export default RepositorySingle;
