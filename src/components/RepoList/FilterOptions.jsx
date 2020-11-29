import RNPickerSelect from 'react-native-picker-select';
import React from 'react';
import theme from '../../theme';
import { StyleSheet } from 'react-native';

const FilterOptions = ({ handleFilter }) => {
  return (
    <RNPickerSelect
      onValueChange={(value) => handleFilter(value)}
      items={[
        { label: 'Latest repositories', value: 'latest' },
        { label: 'Lowest rated repositories', value: 'lowest' },
        { label: 'Highest rated repositories', value: 'highest' }
      ]}
      useNativeAndroidPickerStyle={false}
      placeholder={{ label: 'Filter repositories by...', value: null }}
      style={styles}
    />
  );
};

const styles = StyleSheet.create({
  inputIOS: {
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: theme.colors.secondary,
    marginVertical: 15,
    padding: 20,
    fontSize: theme.fontSizes.subheading
  },
  inputAndroid: {
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: theme.colors.secondary,
    marginVertical: 15,
    padding: 20,
    fontSize: theme.fontSizes.subheading
  },
  placeholder: {
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: theme.colors.secondary,
    marginVertical: 15,
    padding: 20,
    fontSize: theme.fontSizes.subheading
  }
});

export default FilterOptions;
