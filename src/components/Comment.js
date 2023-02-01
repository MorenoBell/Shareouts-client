import { ThemeContext } from '@emotion/react';
import React from 'react'
import { useState, useContext } from 'react'
import EditComment from './EditComment';

function Comment(props) {

  const [comment, setComment] = useState(props.comment);
  const [isEditing, setIsEditing] = useState(false);
  const context = useContext(ThemeContext)
  const editCommentClick = () => {
    setIsEditing(!isEditing);
  }
  const editComment = (text) => {
    context.apiRequest('/editComment', { id: comment._id, text: text })
      .then(r => r.json())
      .then(data => {
        comment.description = data;
        setComment(comment);
        setIsEditing(false);
      })
  }
  return (
    <div className='bg-cyan-700 text-start shadow-lg rounded-lg mb-3 mx-12 py-4 px-5'>
      <div className='flex justify-between rounded-lg bg-cyan-800 p-2'>
        <div className='fancy font-bold text-xl'>
          {comment.creatorName + " " + comment.creatorLastName}
        </div>
        {comment.editable ? <div>
          <i onClick={editCommentClick} class="fa-solid hover:cursor-pointer fa-xl fa-pencil"></i>
        </div> : ''}
      </div>
      <div className='font-semibold break-words mx-2 text-white text-xl mt-2'>
        {isEditing ?
          <EditComment editComment={editComment} text={comment.description} />
          : <div className='p-2'>{comment.description}</div>}
      </div>
      <div className='text-end mt-2'>
        {new Date(comment.creationDate).toLocaleDateString('en-US')}
      </div>
    </div>
  )
}

export default Comment