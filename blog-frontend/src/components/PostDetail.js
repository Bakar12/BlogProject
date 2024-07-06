import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { useParams } from 'react-router-dom';
import CommentForm from './CommentForm';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`posts/${id}/`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the post!', error);
      });
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <h3>Comments</h3>
      <ul>
        {post.comments.map(comment => (
          <li key={comment.id}>{comment.content} - <strong>{comment.author}</strong></li>
        ))}
      </ul>
      <CommentForm postId={post.id} />
    </div>
  );
};

export default PostDetail;

