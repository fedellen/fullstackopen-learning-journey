import React from 'react';
import { StyleSheet } from 'react-native';

import theme from '../../theme';
import Text from './Text';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.heading,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.bold
  }
});

const Heading = ({ ...props }) => {
  const textStyle = [styles.text];

  return <Text style={textStyle} {...props} />;
};

export default Heading;
