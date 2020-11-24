import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import * as yup from 'yup';

const SignIn = () => {
  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
  });

  const onSubmit = () => {
    alert('you did it');
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.signIn}>
          <FormikTextInput name='username' placeholder='username' />
          <FormikTextInput
            name='password'
            placeholder='password'
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text>Log In</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    textAlign: 'center',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 10
  },
  signIn: {
    padding: 30
  }
});

export default SignIn;
