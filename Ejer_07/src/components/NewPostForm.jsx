import React, { useState, useCallback } from 'react';

function NewPostForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addPost = useCallback(async () => {
    if (!title || !body) return;

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body }),
      });
      const data = await res.json();
      console.log('Post creado:', data);
      setTitle('');
      setBody('');
    } catch (err) {
      console.error('Error al crear el post', err);
    }
  }, [title, body]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Cuerpo"
        value={body}
        onChange={e => setBody(e.target.value)}
      />
      <br />
      <button type="submit">Crear Post</button>
    </form>
  );
}

export default NewPostForm;
