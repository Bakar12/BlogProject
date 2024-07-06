import React, { useState } from 'react';
import axios from '../axiosConfig';

const CommentForm = ({ postId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('comments/', {
      post: postId,
      content: content,
      author: 1 // Assuming user ID 1 is logged in for simplicity
    })
    .then(response => {
      setContent('');
      window.location.reload(); // Reload the page to show the new comment
    })
    .catch(error => {
      console.error('There was an error posting the comment!', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="content">Comment:</label>
        <input
          type="text"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default CommentForm;
