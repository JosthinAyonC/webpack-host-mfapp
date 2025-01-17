import React from 'react';
import useMutation from '~/hooks/useMutation';
import useQuery from '~/hooks/useQuery';

function UseQueryMutation() {
  // Fetching data from PokeAPI
  const { data, loading, error, refetch } = useQuery('https://pokeapi.co/api/v2/ability/', { method: 'GET' }, { page: 1, limit: 10, sort: 'asc' });

  // Posting data to a mock API
  const {
    mutate,
    data: responseData,
    loading: loadingMutation,
    error: errorMutation,
  } = useMutation(
    'https://jsonplaceholder.typicode.com/posts', // Mock API endpoint
    'POST'
  );

  const handleSubmit = async () => {
    try {
      const result = await mutate(
        { title: 'Foo', body: 'Bar', userId: 1 }, // Sample payload
        { 'Custom-Header': 'TestValue' } // Optional headers
      );
      console.log('Resource created:', result);
    } catch (err) {
      console.error('Error creating resource:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={refetch}>Refetch Data</button>
      <div>
        <button onClick={handleSubmit} disabled={loadingMutation}>
          {loadingMutation ? 'Creating...' : 'Create Resource'}
        </button>
        {errorMutation && <p>Error: {errorMutation}</p>}
        {responseData && <pre>{JSON.stringify(responseData, null, 2)}</pre>}
      </div>
    </div>
  );
}

export default UseQueryMutation;
