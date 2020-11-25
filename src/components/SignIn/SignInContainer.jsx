import React from 'react';
import { Formik } from 'formik';
import FormikTextInput from '../Styled/FormikTextInput';
import Text from '../Styled/Text';
import * as yup from 'yup';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../../theme';

const SignInContainer = ({ onSubmit }) => {
  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
  });
  return (
    <View>
      <Formik
        onSubmit={(values) => onSubmit(values)}
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
    </View>
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

export default SignInContainer;
