import React, { useEffect, useState } from 'react';
import PostDetails from './PostDetails';

function PostDetailsContainer({ postId }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    setPost(null);
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(res => res.json())
      .then(data => setPost(data))
      .catch(err => console.error(err));
  }, [postId]);

  return <PostDetails post={post} />;
}

export default PostDetailsContainer;
