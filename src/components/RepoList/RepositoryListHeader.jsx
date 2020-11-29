import React from 'react';
import FilterOptions from './FilterOptions';
import SearchKeyword from './SearchKeyword';

const RepositoryListHeader = ({ handleFilter, handleKeyword, keyword }) => {
  return (
    <>
      <FilterOptions handleFilter={handleFilter} />
      <SearchKeyword keyword={keyword} handleKeyword={handleKeyword} />
    </>
  );
};

export default RepositoryListHeader;
