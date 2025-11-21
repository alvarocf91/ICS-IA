import React, { useState, useEffect } from 'react';

function PostComments({ postId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) return;

    setIsLoading(true);
    setError(null);

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then(res => res.json())
      .then(data => {
        setComments(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError('Error al cargar comentarios');
        setIsLoading(false);
      });
  }, [postId]);

  if (isLoading) return <p>Cargando comentarios...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {comments.map(comment => (
        <li key={comment.id}>
          <strong>{comment.name}</strong>: {comment.body}
        </li>
      ))}
    </ul>
  );
}

export default PostComments;
