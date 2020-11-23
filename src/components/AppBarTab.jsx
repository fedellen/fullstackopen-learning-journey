import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Heading from './Heading';

const styles = StyleSheet.create({
  appBarTab: {
    paddingVertical: 20
  }
});

const AppBarTab = ({ name }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => console.log('This was pressed Pressed!')}
    >
      <View style={styles.appBarTab}>
        <Heading>{name}</Heading>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppBarTab;
