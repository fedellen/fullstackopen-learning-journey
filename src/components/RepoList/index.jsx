import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';

import useRepositories from '../../hooks/useRepositories';

import RepositoryItem from './RepositoryItem';

// Pure component for repo list
export const RepositoryListContainer = ({ repositories }) => {
  const history = useHistory();

  const handleRedirect = (id) => {
    history.push(`/repo/${id}`);
  };

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  if (!repositoryNodes) {
    return null;
  }

  return (
    <FlatList
      data={repositoryNodes}
      style={{ paddingHorizontal: 20, flexGrow: 1, flexShrink: 1 }}
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
