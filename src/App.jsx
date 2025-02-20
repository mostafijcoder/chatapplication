import React from "react";
import { useState } from "react";
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";
import { render } from 'react-dom';


const rootElement = document.getElementById("root");

const data={
  post: {
    id: 123,
    content: 'What we hope ever to do with ease, we must first learn to do with diligence. - Samuel Johnson',
    user: 'Mark'
  },
  comments: [
    {
      id: 0,
      user: 'David',
      content: 'such. win.',
    },
    {
      id: 1,
      user: 'Haley',
      content: 'Love it.'
    },
    {
      id: 2,
      user: 'Peter',
      content: 'Who was Samuel Johnson?'
    },
    {
      id: 3,
      user: 'Margaret',
      content: 'That\'s really profound.'
    },
    {
      id: 4,
      user: 'Randy',
      content: 'The meaning of life is to give life meaning.'
    }
  ]
};

const Post = ({ id, user, content, children }) => (
  <div className="post">
    <h2 className="postAuthor" id={id}>
      {user}
    </h2>
    <p className="postBody">{content}</p>
    {children}
  </div>
);

Post.propTypes = {
  user: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

// ✅ Comment Component
const Comment = ({ user, content }) => (
  <div className="comment">
    <h2 className="commentAuthor">{user}</h2>
    <p className="commentContent">{content}</p>
  </div>
);

Comment.propTypes = {
  content: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};
const CreateComment = ({ onCommentSubmit }) => {
  const [user, setUser] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.trim() && content.trim()) {
      onCommentSubmit({ user: user.trim(), content: content.trim() });
      setUser("");
      setContent("");
    }
  };

  return (
    <form className="createComment" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        type="text"
        placeholder="Thoughts?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input type="submit" value="Post" />
    </form>
  );
};

  CreateComment.propTypes={
    onCommentSubmit:PropTypes.func.isRequired,
    content:PropTypes.string
  };

  const CommentBox = ({ post, comments: initialComments }) => {
    const [comments, setComments] = useState(initialComments);
  
    const handleCommentSubmit = (comment) => {
      comment.id = Date.now();
      setComments([...comments, comment]);
    };
  
    return (
      <div className="commentBox">
        <Post id={post.id} content={post.content} user={post.user} />
        {comments.map((comment) => (
          <Comment key={comment.id} user={comment.user} content={comment.content} />
        ))}
        <CreateComment onCommentSubmit={handleCommentSubmit} />
      </div>
    );
  };
  
  CommentBox.propTypes = {
    post: PropTypes.object.isRequired,
    comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  };
  
  // ✅ App Component (Main Entry)
  const App = () => <CommentBox post={data.post} comments={data.comments} />;
  
  export default App;



 
 
  



  

 