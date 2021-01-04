import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import { useDebounce } from 'use-debounce';

import useRepositories from '../../hooks/useRepositories';
import { RepositoryListContainer } from './RepositoryListContainer';

const RepositoryList = () => {
  const [filter, setFilter] = useState('latest');
  const [keyword, setKeyword] = useState('');
  const [searchKeyword] = useDebounce(keyword, 500);
  const { repositories } = useRepositories(filter, searchKeyword);

  const handleFilter = (value) => setFilter(value);
  const handleKeyword = (value) => setKeyword(value);

  const history = useHistory();
  const handleRedirect = (id) => history.push(`/repo/${id}`);

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <RepositoryListContainer
      repositoryNodes={repositoryNodes}
      handleFilter={handleFilter}
      handleKeyword={handleKeyword}
      keyword={keyword}
      handleRedirect={handleRedirect}
    />
  );
};

export default RepositoryList;
