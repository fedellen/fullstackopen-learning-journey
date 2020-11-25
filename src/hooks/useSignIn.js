import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { AUTHORIZE } from '../graphql/mutations';
import { useContext } from 'react';

import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const [mutate, result] = useMutation(AUTHORIZE);

  const signIn = async ({ username, password }) => {
    console.log(`username: ${username} and password: ${password}`);
    try {
      const { data } = await mutate({ variables: { username, password } });
      console.log('this is data', data);
      await authStorage.setAccessToken(data.authorize.accessToken);
      apolloClient.resetStore();
    } catch (error) {
      console.log('we have an error here');
    }
  };
  return [signIn, result];
};

export default useSignIn;
