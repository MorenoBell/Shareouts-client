import { ThemeContext } from '@emotion/react'
import React from 'react'
import { useState } from 'react';
import { useContext } from 'react'
import Button from './Button'

function Result(props) {
  const context = useContext(ThemeContext);
  const [addable, setAddable] = useState(props.result.addable);
  console.log(addable);
  const addFriend = () => {
    const params = {
      loggedUserId: context.userId,
      userToAddId: props.result._id
    };
    context.apiRequest('/addFriend', params)
      .then(response => response.json())
      .then(data => {
        setAddable(false);
      });
  }
  return (
    <div className='mt-1 bg-cyan-800 px-5 py-2 rounded-lg flex justify-between shadow-lg'>
      <span className='text-gray-300 font-bold mt-5 text-lg'>{props.result.name + ' ' + props.result.lastName}</span>
      {addable ?
        <Button onClickFunction={addFriend} text='Follow' />
        : ''}
      {!addable ? <Button onClickFunction={() => window.location.assign('/profile?userToCheck=' + encodeURI(props.result._id))} text='profile' /> : ''}

    </div>
  )
}

export default Result