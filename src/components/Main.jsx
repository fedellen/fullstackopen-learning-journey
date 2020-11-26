import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import RepositoryList from './RepoList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import RepositorySingle from './RepoList/RepositoryItem';
import { useQuery } from '@apollo/react-hooks';
import { AUTH_USER } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.background
  }
});

const Main = () => {
  const [user, setUser] = useState(null);
  const userQuery = useQuery(AUTH_USER);

  if (userQuery.data.authorizedUser && user === null) {
    console.log(userQuery);
    setUser(userQuery.data);
  } else if (!userQuery.data.authorizedUser && user !== null) {
    setUser(null);
  }

  console.log('user is ', user);

  return (
    <View style={styles.container}>
      <AppBar user={user} />
      <Switch>
        <Route path='/signin'>
          <SignIn />
        </Route>
        <Route path='/repositories/:id'>
          <RepositorySingle />
        </Route>
        <Route path='/' exact>
          <RepositoryList />
        </Route>

        <Redirect to='/' />
      </Switch>
    </View>
  );
};

export default Main;
