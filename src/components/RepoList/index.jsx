import React, { useState } from 'react';
// import { FlatList, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import { useDebounce } from 'use-debounce';

import useRepositories from '../../hooks/useRepositories';
import { RepositoryListContainer } from './RepositoryListContainer';

// import RepositoryListHeader from './RepositoryListHeader';

// Pure component for repo list
// export const RepositoryListContainer = ({
//   repositories,
//   handleFilter,
//   keyword,
//   handleKeyword
// }) => {

//   const repositoryNodes = repositories
//     ? repositories.edges.map((edge) => edge.node)
//     : [];

//   if (!repositoryNodes) {
//     return null;
//   }

//   return (
//     <FlatList
//       data={repositoryNodes}
//       style={{ paddingHorizontal: 20, flexGrow: 1, flexShrink: 1 }}
//       ListHeaderComponent={
//         <RepositoryListHeader
//           handleFilter={handleFilter}
//           keyword={keyword}
//           handleKeyword={handleKeyword}
//         />
//       }
//       renderItem={(item) => (
//         <TouchableOpacity onPress={() => handleRedirect(item.item.id)}>
//           <RepositoryItem item={item.item} />
//         </TouchableOpacity>
//       )}
//     />
//   );
// };

const RepositoryList = () => {
  const [filter, setFilter] = useState('latest');
  const [keyword, setKeyword] = useState('');
  useDebounce(keyword, 500);
  const { repositories } = useRepositories(filter, keyword);
  const history = useHistory();

  const handleFilter = (value) => {
    setFilter(value);
  };

  const handleKeyword = (value) => {
    setKeyword(value);
  };

  const handleRedirect = (id) => {
    history.push(`/repo/${id}`);
  };

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
