import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../theme';
import AppBarTab from './AppBarTab';
import { useQuery } from '@apollo/react-hooks';
import { AUTH_USER } from '../../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.primary,
    borderBottomWidth: 3,
    borderColor: theme.colors.secondary
  }
});

const AppBar = () => {
  const userQuery = useQuery(AUTH_USER, {
    fetchPolicy: 'cache-and-network'
  });

  const user = userQuery.data ? userQuery.data.authorizedUser : null;

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
