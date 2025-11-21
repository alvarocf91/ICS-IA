import React from 'react';

function PostDetails({ post }) {
  if (!post) return <p>Cargando detalles...</p>;

  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
}

export default PostDetails;
