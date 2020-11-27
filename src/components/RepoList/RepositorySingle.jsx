import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { View } from 'react-native';
import { useParams } from 'react-router-native';
import { GET_SINGLE_REPO } from '../../graphql/queries';
import * as Linking from 'expo-linking';

import Button from '../Styled/Button';
import RepositoryItem from './RepositoryItem';

const RepositorySingle = () => {
  console.log('welcome to repository single!');

  const { id } = useParams();

  const { data, loading } = useQuery(GET_SINGLE_REPO, {
    fetchPolicy: 'cache-and-network',
    variables: { id }
  });
  console.log(loading);

  if (loading) return null;

  console.log('here is repository', data.repository);

  const githubLink = () => {
    console.log('send to github', data.repository.url);
    Linking.openURL(data.repository.url);
  };

  return (
    <View style={{ paddingVertical: 30, paddingHorizontal: 20 }}>
      <RepositoryItem item={data.repository} />
      <Button text={'Open in GitHub'} onPress={githubLink} />
    </View>
  );
};

export default RepositorySingle;
