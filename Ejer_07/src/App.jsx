import React, { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedId, setSelectedId] = useState(1);
  const [postDetails, setPostDetails] = useState(null);

  // 1. Efecto para cargar la lista de posts
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error("Error al cargar posts:", err));
  }, []);

  // 2. Efecto para cargar los detalles del post seleccionado
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${selectedId}`)
      .then(res => res.json())
      .then(data => setPostDetails(data))
      .catch(err => console.error("Error al cargar detalles:", err));
  }, [selectedId]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>1. Lista de Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <button onClick={() => setSelectedId(post.id)}>
              {post.title}
            </button>
          </li>
        ))}
      </ul>

      <h2>2. Detalles de un Post</h2>
      {postDetails ? (
        <div>
          <h3>{postDetails.title}</h3>
          <p>{postDetails.body}</p>
        </div>
      ) : (
        <p>Cargando detalles…</p>
      )}
    </div>
  );
}

export default App;
