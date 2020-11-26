import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../theme';
import AppBarTab from './AppBarTab';
import { useHistory, useLocation } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.primary,
    borderBottomWidth: 3,
    borderColor: theme.colors.secondary
  }
});

const AppBar = ({ user }) => {
  const history = useHistory();
  const location = useLocation();

  // Still getting a warning on push:

  // ExceptionsManager.js:173 Warning:

  //   Cannot update during an existing state transition
  //   (such as within `render`). Render methods should
  //   be a pure function of props and state.

  if (location.pathname === '/signin' && user) {
    history.push('/');
    return null;
  }
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab name='Repositories' link='/' />
        {user === null ? (
          <AppBarTab name='Sign In' link='/signin' />
        ) : (
          <AppBarTab name='Sign Out' link='/' />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
