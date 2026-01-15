import { useParams, Link } from 'react-router-dom';
import { POSTS } from '../data/posts';
import { useCallback } from 'react';

export const PostDetailPage = () => {
  const { postId } = useParams();

  const getPost = useCallback(
    (id) => POSTS.find(post => post.id === Number(id)),
    []
  );

  const post = getPost(postId);

  if (!post) {
    return (
      <div>
        <h2>Artículo no encontrado</h2>
        <Link to="/posts">Volver a la lista de artículos</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link to="/posts">Volver a la lista de artículos</Link>
    </div>
  );
};
