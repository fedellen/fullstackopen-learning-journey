import { useMutation } from '@apollo/react-hooks';
import { AUTHORIZE } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);

  const signIn = async ({ username, password }) => {
    console.log(`username: ${username} and password: ${password}`);
    try {
      await mutate({ variables: { username, password } });
      console.log(result);
    } catch (error) {
      console.log('we have an error here');
    }
  };
  return [signIn, result];
};

export default useSignIn;
