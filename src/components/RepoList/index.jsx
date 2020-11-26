import React from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';

import useRepositories from '../../hooks/useRepositories';

import RepositoryItem from './RepositoryItem';

// This is a spacer component
const ItemSeparator = () => <View style={{ height: 30 }} />;

// Pure component for repo list
export const RepositoryListContainer = ({ repositories }) => {
  const history = useHistory();

  const handleRedirect = (id) => {
    console.log('hello redirect, here is our id:', id);
    console.log('pushing to: ', `/repo/${id}`);

    history.push(`/repo/${id}`);
  };

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      style={{ paddingHorizontal: 20, flexGrow: 1, flexShrink: 1 }}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={ItemSeparator}
      ListFooterComponent={ItemSeparator}
      renderItem={(item) => (
        <TouchableOpacity onPress={() => handleRedirect(item.item.id)}>
          <RepositoryItem item={item.item} />
        </TouchableOpacity>
      )}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
