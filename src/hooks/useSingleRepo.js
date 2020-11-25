import { useQuery } from '@apollo/react-hooks';
import { GET_SINGLE_REPO } from '../graphql/queries';

const useSingleRepo = () => {
  const { data, loading } = useQuery(GET_SINGLE_REPO, {
    fetchPolicy: 'cache-and-network'
  });

  if (loading) return 'Loading';
  return data;
};

export default useSingleRepo;
