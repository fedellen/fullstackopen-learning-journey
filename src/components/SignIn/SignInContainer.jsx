import React from 'react';
import { Formik } from 'formik';
import FormikTextInput from '../Styled/FormikTextInput';
import * as yup from 'yup';
import { View } from 'react-native';
import Button from '../Styled/Button';

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
          <View style={{ padding: 30 }}>
            <FormikTextInput name='username' placeholder='username' />
            <FormikTextInput
              name='password'
              placeholder='password'
              secureTextEntry
            />
            <Button text='Log In' onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignInContainer;
