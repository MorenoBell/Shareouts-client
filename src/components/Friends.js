import { ThemeContext } from '@emotion/react';
import React, { useContext, useState, useEffect } from 'react'
import Friend from './Friend';

function Friends() {
  const context = useContext(ThemeContext);
  let [friends, setFriends] = useState();
  const getFriends = () => {
    const params = {
      userId: context.userId
    };
    context.apiRequest('/getFriends', params)
      .then(res => res.json())
      .then(data => {
        setFriends(data);
      });
  }
  useEffect(() => {
    getFriends();
  }, []);


  const removeFriend = (id) => {
    const params = {
      userId: context.userId,
      id: id
    }

    context.apiRequest('/removeFriend', params)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFriends();
          getFriends();
        }
        else {

        }
      });
  }
  return (
    <div className='flex-col mt-5'>
      {!friends ? '...Loading'
        : !friends.length ? 'You are currently not following anyone'
          : friends.map((friend, index) => {
            return (<Friend key={index} removeFriend={removeFriend} friend={friend} />)
          })}
    </div>
  )
}

export default Friends