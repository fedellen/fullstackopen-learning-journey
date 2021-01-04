import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (filter, searchKeyword) => {
  let orderDirection = 'DESC';
  let orderBy = 'CREATED_AT';

  if (filter === 'lowest' || filter === 'highest') {
    orderBy = 'RATING_AVERAGE';
  }

  if (filter === 'lowest') {
    orderDirection = 'ASC';
  }

  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderDirection, orderBy, searchKeyword }
  });

  if (loading) return 'Loading';
  return data;
};

export default useRepositories;
