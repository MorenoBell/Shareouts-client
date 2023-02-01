import { ThemeContext } from '@emotion/react';
import React, { useContext, useState } from 'react'
import Button from './Button';

function NewPost() {
  const context = useContext(ThemeContext);
  const [postDescription, setPostDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 2000);
  }

  const shareButtonOnClick = () => {
    if (postDescription) {
      context.apiRequest('/newPost', { userId: context.userId, postDescription: postDescription })
        .then(response => response.json())
        .then((data) => {
          if (data.status) {
            window.location.assign('/');
          }
          else {
            showErrorMessage('Ups... something went wrong');
          }
        });
    }
    else {
      showErrorMessage('You forgot something');
    }
  }

  return (
    <div className='text-center'>
      <div className='md:flex justify-center align-middle mt-5'>
        <input
          onInput={(e) => setPostDescription(e.target.value)}
          autoFocus
          className='rounded-lg mt-auto w-11/12 mx-5 md:w-3/4 px-5 py-3' placeholder='share your thoughts with the world' />
        <div className='text-center mt-2'>
          <Button onClickFunction={shareButtonOnClick} text='Share' className='mt-auto' />
        </div>
      </div>
      <div className='md:mt-12'>
        {errorMessage ? <span className='text-red-700 text-lg font-semibold'>{errorMessage}</span> : ''}
      </div>
    </div>
  )
}

export default NewPost