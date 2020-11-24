import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const TextInput = ({ ...props }) => {
  const textInputStyle = [styles.input];

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
    marginBottom: 25
  }
});

export default TextInput;
