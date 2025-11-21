import React, { useState, useEffect } from 'react';

function UserSearch() {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!term) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      fetch(`https://jsonplaceholder.typicode.com/users?username=${term}`)
        .then(res => res.json())
        .then(data => setResults(data))
        .catch(err => console.error(err));
    }, 500);

    return () => clearTimeout(timeout);
  }, [term]);

  return (
    <div>
      <input
        type="text"
        value={term}
        onChange={e => setTerm(e.target.value)}
        placeholder="Buscar usuario..."
      />
      <ul>
        {results.map(user => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserSearch;
