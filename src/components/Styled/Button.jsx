import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../../theme';
import Text from './Text';

const Button = ({ text, onPress, ...props }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} {...props}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 10,
    borderColor: theme.colors.secondary,
    borderWidth: 3
  }
});

export default Button;
