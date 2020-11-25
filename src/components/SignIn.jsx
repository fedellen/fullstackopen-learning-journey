import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './Styled/FormikTextInput';
import Text from './Styled/Text';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';

const SignInContainer = ({ onSubmit }) => {
  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
  });
  return (
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
  );
};

const SignIn = () => {
  const [signIn, result] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      console.log('this is the result', result);
      if (result.data) history.push('/');
      else console.log('Credentials are incorrect...');
    } catch (err) {
      console.log(err);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
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
