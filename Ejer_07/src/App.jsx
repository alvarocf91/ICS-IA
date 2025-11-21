import React, { useState } from 'react';
import PostList from './components/PostList';
import PostDetailsContainer from './components/PostDetailsContainer';
import UserSearch from './components/UserSearch';
import PostComments from './components/PostComments';
import NewPostForm from './components/NewPostForm';

function App() {
  const [selectedPostId, setSelectedPostId] = useState(1);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Ejer-07</h1>
      
      <h2>1. Lista de Posts</h2>
      <PostList />

      <h2>2. Detalles de un Post</h2>
      <input
        type="number"
        value={selectedPostId}
        onChange={(e) => setSelectedPostId(Number(e.target.value))}
        min="1"
        max="100"
      />
      <PostDetailsContainer postId={selectedPostId} />

      <h2>3. Búsqueda de Usuarios</h2>
      <UserSearch />

      <h2>4. Comentarios de un Post</h2>
      <PostComments postId={selectedPostId} />

      <h2>5. Crear un Post</h2>
      <NewPostForm />
    </div>
  );
}

export default App;
