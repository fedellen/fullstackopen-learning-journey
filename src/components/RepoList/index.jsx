import React from 'react';
import { FlatList, View } from 'react-native';

import useRepositories from '../../hooks/useRepositories';

import RepositoryItem from './RepositoryItem';

// This is a spacer component
const ItemSeparator = () => <View style={{ height: 30 }} />;

// Pure component for repo list
export const RepositoryListContainer = ({ repositories }) => {
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
      renderItem={(item) => <RepositoryItem item={item.item} />}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
