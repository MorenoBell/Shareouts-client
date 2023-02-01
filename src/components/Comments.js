import { ThemeContext } from '@emotion/react';
import React, { useState, useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import Button from './Button';
import Comment from './Comment';
import NewCommentForm from './NewCommentForm';

function Comments() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [comments, setComments] = useState();
  const [newCommentForm, setNewCommentForm] = useState();
  const context = useContext(ThemeContext);
  const getComments = () => {
    context.apiRequest('/getCommentsByPost', { userId: context.userId, postId: searchParams.get('postId') })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setComments(data);
      })
  }
  useEffect(() => {
    getComments();
  }, []);


  const newCommentClickFunction = (textDescription) => {
    context.apiRequest('/newComment', { userId: context.userId, postId: searchParams.get('postId'), commentText: textDescription })
      .then(response => response.json())
      .then(data => {
        const newComms = comments;
        newComms.unshift(data.ritorno);
        setComments(newComms);
        setNewCommentForm(false);
      })
  }

  const newPostButtonClick = () => {
    setNewCommentForm(!newCommentForm);
  }

  return (
    <div className='md:mt-12 text-center'>
      <div className='mb-12'>
        <Button onClickFunction={newPostButtonClick} text={newCommentForm ? 'Back' : 'New comment'} />
        <div>
          {newCommentForm ? <NewCommentForm newCommentClickFunction={newCommentClickFunction} /> : ''}
        </div>
      </div>
      <div className='md:w-3/5 mx-auto'>
        {!comments ? '...Loading'
          : !comments.length ? 'No comments yet'
            : comments.map(comment => {
              return <Comment key={comment._id} comment={comment} />
            })}
      </div>
    </div>
  )
}

export default Comments