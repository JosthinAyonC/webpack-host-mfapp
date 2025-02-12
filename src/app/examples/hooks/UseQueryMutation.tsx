import React from 'react';
import { Form } from '~/form/Form';
import { DatePickerField, DropdownField, FormState } from '~/form/fields';
import { useMutation, useQuery } from '~/hooks';

function UseQueryMutation() {
  // Fetching data from PokeAPI
  const { data, loading, error, refetch } = useQuery('https://pokeapi.co/api/v2/ability/', { method: 'GET' }, { page: 1, limit: 10, sort: 'asc' });

  // Posting data to a mock API
  const { mutate, loading: loadingMutation } = useMutation(
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
      <Form<FormState> onSubmit={handleSubmit}>
        <DatePickerField name="date" label="Date" />
        <DropdownField
          name="status"
          label="Status"
          options={[
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
          ]}
        />
      </Form>
      <h1>Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => refetch}>Refetch Data</button>
      <div>
        <button onClick={handleSubmit} disabled={loadingMutation}>
          {loadingMutation ? 'Creating...' : 'Create Resource'}
        </button>
      </div>
    </div>
  );
}

export default UseQueryMutation;
