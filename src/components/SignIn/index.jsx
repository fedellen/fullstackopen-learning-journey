import React from 'react';
import useSignIn from '../../hooks/useSignIn';
import { useHistory } from 'react-router-native';
import SignInContainer from './SignInContainer';

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

export default SignIn;
