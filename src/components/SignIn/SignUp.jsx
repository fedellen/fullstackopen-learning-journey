import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import { View } from 'react-native';
import Button from '../Styled/Button';
import FormikTextInput from '../Styled/FormikTextInput';
import { useMutation } from '@apollo/react-hooks';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CREATE_USER } from '../../graphql/mutations';
import useSignIn from '../../hooks/useSignIn';
import { useHistory } from 'react-router-native';

const SignUp = () => {
  const [mutate] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const history = useHistory();

  const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: ''
  };

  const validationSchema = yup.object().shape({
    username: yup.string().min(5).required('Username is required..'),
    password: yup.string().min(5).required('Password is required..'),
    passwordConfirmation: yup
      .string()
      .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value;
      })
  });

  const onSubmit = async ({ username, password }) => {
    console.log(
      `You've passed yup.validation! Here are your credentials ${username} : ${password}`
    );
    try {
      await mutate({
        variables: { username, password }
      });
      console.log('Thanks for signing up ', username);
      await signIn({ username, password });
      console.log('Signed in..');
      history.push(`/`);
    } catch (error) {
      console.log('We have an error here in SignUp => onSubmit 😲', error);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <Formik
        onSubmit={(values) => onSubmit(values)}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        {({ handleSubmit }) => (
          <View style={{ padding: 30 }}>
            <FormikTextInput name='username' placeholder='Username' />
            <FormikTextInput
              name='password'
              placeholder='Password'
              secureTextEntry
            />
            <FormikTextInput
              name='passwordConfirmation'
              placeholder='Password confirmation'
              secureTextEntry
            />

            <Button text='Sign up' onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;
