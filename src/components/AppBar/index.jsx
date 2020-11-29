import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../theme';
import AppBarTab from './AppBarTab';

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab name='Repositories' link='/' />
        {user === null ? (
          <>
            <AppBarTab name='Sign In' link='/signin' />
            <AppBarTab name='Sign Up' link='/signup' />
          </>
        ) : (
          <>
            <AppBarTab name='Sign Out' link='/' />
            <AppBarTab name='Create a Review' link='/review' />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
