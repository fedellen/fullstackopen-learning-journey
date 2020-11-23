import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

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

  return <NativeText style={textStyle} {...props} />;
};

export default Heading;
