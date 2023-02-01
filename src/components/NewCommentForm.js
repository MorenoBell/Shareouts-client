import Button from './Button'
import React, { useState, useContext } from 'react'

function NewCommentForm(props) {
  const [comment, setComment] = useState('');
  return (
    <div className='mt-8'>
      <input onInput={(e) => setComment(e.target.value)} autoFocus placeholder='New comment' className='w-3/4 rounded-lg px-5 py-2.5' />
      <Button onClickFunction={() => props.newCommentClickFunction(comment)} text='share' />
    </div>
  )
}

export default NewCommentForm