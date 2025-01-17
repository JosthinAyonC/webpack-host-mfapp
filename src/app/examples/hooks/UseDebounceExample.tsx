import React, { useEffect, useState } from 'react';
import useDebounce from '~/hooks/useDebounce';

export function UseDebounceExample() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      // Esto se va a mostrar cuando pasen 0.5 segundos sin escribir
      console.log('Searching for:', debouncedQuery);
    }
  }, [debouncedQuery]);

  return <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />;
}
