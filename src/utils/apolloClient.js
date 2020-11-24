import ApolloClient from 'apollo-boost';

const createApolloClient = () => {
  return new ApolloClient({
    uri: 'http://192.168.86.136:5000/graphql'
  });
};

export default createApolloClient;
