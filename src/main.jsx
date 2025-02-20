import React from "react";
//import { createRoot } from "react-dom/client";
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";
import { render } from 'react-dom';
//import App from "./App.jsx";

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

 class Post extends React.Component{
  render(){
    return React.createElement('div',
    {
      className:'post'
    },
    React.createElement('h2',{
      className:'postAuthor',
      id:this.props.id,
    },
    this.props.user,
    React.createElement('span',{
      className:'postBody'
    },
    this.props.content
    ),
    this.props.children
    )
    );
  }
}
class Comment extends React.Component{
  render(){
    return React.createElement('div',
    {
      className:'comment'
    },
    React.createElement('h2',{
      className:'commentAuthor'
    },
    this.props.user,
    React.createElement('span',{
      className:'commentContent'
    },
    this.props.content
    )
    )
    );
  }
}
Comment.propTypes={
  id:PropTypes.number.isRequired,
  content:PropTypes.string.isRequired,
  user:PropTypes.string.isRequired
};
Post.propTypes={
  user:PropTypes.string.isRequired,
  content:PropTypes.string.isRequired,
  id:PropTypes.number.isRequired
};

 class CreateComment extends React.Component{
    constructor(props){
      super(props);
      this.state={
        content:'',
        user:''
      };
      this.handleUserChange=this.handleUserChange.bind(this);
      this.handleTextChange=this.handleTextChange.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleUserChange(event){
      const val=event.target.value;
      this.setState(()=>{
        return{
          user:val
        };
      });
    }
    handleTextChange(event){
      const val=event.target.value;
      this.setState(()=>{
        return{
          content:val
        };
      });
    }
    handleSubmit(event){
      event.preventDefault();
      this.props.onCommentSubmit({
        user:this.state.user.trim(),
        content:this.state.content.trim()
      });
      this.setState(()=>{
        return{
          user:'',
          content:''
        };
      });
    }
    render(){
      return React.createElement('form',{
        className:'createComment',
        onSubmit:this.handleSubmit
      },
      React.createElement('input',{
        type:'text',
        placeholder:'Your name',
        value:this.state.user,
        onChange:this.handleUserChange
      }),
      React.createElement('input',{
        type:'text',
        placeholder:'Thoughts?',
        value:this.state.content,
        onChange:this.handleTextChange
      }),
      React.createElement('input',{
        type:'submit',
        value:'Post'
      })
      );
    }
  }
  CreateComment.propTypes={
    onCommentSubmit:PropTypes.func.isRequired,
    content:PropTypes.string
  };
/*

  const app=React.createElement(Post,{
    id:1,
    content:'said: This is a post',
    user:'mark'
  },
  React.createElement(Comment,{
    id:2,
    user:'bob',
    content:'commented: wow! how cool'
  }),
  React.createElement(CreateComment)
  );


  ReactDOM.render(app,node);

  */

  
  

  class CommentBox extends React.Component{
    constructor(props){
      super(props);
      this.state={
        comments:this.props.comments
      };
      this.handleCommentSubmit=this.handleCommentSubmit.bind(this);
    }
    handleCommentSubmit(comment){
      const comments=this.state.comments;
      comment.id=Date.now();
      const newComments=comments.concat([comment]);
      this.setState(()=>{
        return{
          comments:newComments
        };
      });
    }
    render(){
      return React.createElement('div',{
        className:'commentBox'
      },
      React.createElement(Post,{
        id:this.props.post.id,
        content:this.props.post.content,
        user:this.props.post.user
      }),
      this.state.comments.map((comment)=>{
        return React.createElement(Comment,{
          key:comment.id,
          id:comment.id,
          content:comment.content,
          user:comment.user
        });
      }),
      React.createElement(CreateComment,{
        onCommentSubmit:this.handleCommentSubmit
      })
      );
    }
  }
  CommentBox.propTypes = {
    post: PropTypes.object.isRequired,
    comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  };
  
ReactDOM.render(React.createElement(CommentBox,{
  post:data.post,
  comments:data.comments
},
CreateComment, {}),rootElement);
  



 /*<React.StrictMode>
 <App />
 </React.StrictMode> */
 
 
  



  

 