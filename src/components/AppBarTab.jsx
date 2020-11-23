import React from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import { Link } from 'react-router-native';
import Heading from './Heading';

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
  return (
    <Link to={link} component={TouchableOpacity} style={styles.appBarTab}>
      <View>
        <Heading>{name}</Heading>
      </View>
    </Link>
  );
};

export default AppBarTab;
