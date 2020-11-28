import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal
  },
  darkText: {
    color: theme.colors.primary
  }
});

const Text = ({ color, ...props }) => {
  const textStyle = [styles.text, color === 'darkText' && styles.darkText];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
