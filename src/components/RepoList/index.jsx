import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';

import useRepositories from '../../hooks/useRepositories';
import FilterOptions from './FilterOptions';

import RepositoryItem from './RepositoryItem';

// Pure component for repo list
export const RepositoryListContainer = ({ repositories, handleFilter }) => {
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
      ListHeaderComponent={<FilterOptions handleFilter={handleFilter} />}
      renderItem={(item) => (
        <TouchableOpacity onPress={() => handleRedirect(item.item.id)}>
          <RepositoryItem item={item.item} />
        </TouchableOpacity>
      )}
    />
  );
};

const RepositoryList = () => {
  const [filter, setFilter] = useState('latest');
  const { repositories } = useRepositories(filter);

  const handleFilter = (value) => {
    setFilter(value);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      handleFilter={handleFilter}
    />
  );
};

export default RepositoryList;
