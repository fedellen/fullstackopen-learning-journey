import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.primary
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab name={'Repositories!'} />
    </View>
  );
};

export default AppBar;
