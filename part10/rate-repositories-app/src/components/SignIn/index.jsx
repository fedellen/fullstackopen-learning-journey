import React from 'react';
import useSignIn from '../../hooks/useSignIn';
import SignInContainer from './SignInContainer';

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
    } catch (err) {
      console.log(err);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
