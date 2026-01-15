import { Link } from 'react-router-dom';
import { POSTS } from '../data/posts';
import { useMemo } from 'react';

export const PostsListPage = () => {
  const posts = useMemo(() => POSTS, []);

  return (
    <div>
      <h1>Lista de Artículos</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
