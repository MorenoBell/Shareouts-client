import { ThemeContext } from '@emotion/react';
import React from 'react'
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'
import Posts from './Posts';

function Profile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState();
  const context = useContext(ThemeContext);
  useEffect(() => {
    const params = {
      loggedUserId: context.userId,
      userId: searchParams.get('userToCheck')
    }
    context.apiRequest('/userProfile', params)
      .then(response => response.json())
      .then(data => {
        setUser(data.user);
      })
  }, [])
  return (
    <div>
      {
        user ?
          <div className='fancy text-center  font-semibold text-3xl'>
            {user.name + ' ' + user.lastName}
          </div>
          : ''
      }
      <Posts userToSearchId={searchParams.get('userToCheck')} />
    </div >
  )
}

export default Profile