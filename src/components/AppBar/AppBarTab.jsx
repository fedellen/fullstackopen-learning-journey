import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import Heading from '../Styled/Heading';
import AuthStorageContext from '../../contexts/AuthStorageContext';
import { useApolloClient } from '@apollo/react-hooks';

const styles = StyleSheet.create({
  appBarTab: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexGrow: 1,
    flexShrink: 1
    //zIndex: 1
  },
  link: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
  }
});

const AppBarTab = ({ name, link }) => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);

  if (name === 'Sign Out') {
    const signOut = async () => {
      await authStorage.removeAccessToken();
      apolloClient.resetStore();
    };
    return (
      <TouchableOpacity onPress={() => signOut()}>
        <View style={styles.appBarTab}>
          <Heading>{name}</Heading>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <Link to={link} component={TouchableOpacity} style={styles.appBarTab}>
      <View>
        <Heading>{name}</Heading>
      </View>
    </Link>
  );
};

export default AppBarTab;
