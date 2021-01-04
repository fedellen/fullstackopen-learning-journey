import React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchKeyword = ({ keyword, handleKeyword }) => {
  return (
    <Searchbar
      placeholder='Search..'
      onChangeText={(e) => {
        handleKeyword(e);
      }}
      value={keyword}
    />
  );
};

export default SearchKeyword;
