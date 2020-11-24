import { useQuery } from '@apollo/react-hooks';
import { useState, useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  //const [repositories, setRepositories] = useState();
  //const [loading, setLoading] = useState(false);

  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  console.log(data);

  if (loading) return 'Loading';
  return data;

  /*const fetchRepositories = async () => {
    //setLoading(true);

    const { data, error, loading } = useQuery(GET_REPOSITORIES, {
      fetchPolicy: 'cache-and-network'
    });

    console.log(data);

    // const res = await fetch('http://192.168.86.136:5000/api/repositories');
    //const json = await res.json();

    //setLoading(false);
    //setRepositories(json);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);*/

  //return { repositories, loading /*, refetch: fetchRepositories*/ };
};

export default useRepositories;
