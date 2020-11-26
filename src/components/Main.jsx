import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import RepositoryList from './RepoList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import RepositorySingle from './RepoList/RepositorySingle';
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

  // if data is undefined, set to user null. (awaiting graphQL query)
  // if query has auth user, user is set to the user.
  // if query has no auth user, set user to null
  // very specifically avoiding start-up errors 👌

  if (userQuery.data !== undefined) {
    if (userQuery.data.authorizedUser && user === null) {
      setUser(userQuery.data.authorizedUser);
    } else if (!userQuery.data.authorizedUser && user !== null) {
      setUser(null);
    }
  }
  console.log('user is ', user);

  return (
    <View style={styles.container}>
      <AppBar user={user} />
      <Switch>
        <Route path='/signin'>
          <SignIn />
        </Route>
        <Route path='/repo/:id'>
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
