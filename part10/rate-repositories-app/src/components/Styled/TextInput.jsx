import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../../theme';

const TextInput = ({ error, ...props }) => {
  const textInputStyle = [styles.input, error && styles.hasError];

  return (
    <NativeTextInput
      style={textInputStyle}
      placeholderTextColor={theme.colors.background}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.secondary,
    fontSize: theme.fontSizes.heading,
    color: theme.colors.primary,
    borderRadius: 20,
    height: 60,
    padding: 15,
    marginVertical: 10
  },
  hasError: {
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: theme.colors.textSecondary
  }
});

export default TextInput;
