import React, { useState } from 'react'
import Button from './Button';

function Friend(props) {
  const [friend, setFriend] = useState(props.friend)
  return (
    <div className='flex px-5 justify-between'>
      <div className='font-semibold text-white mt-5 text-2xl'>
        {friend.name + ' ' + friend.lastName}
      </div>
      <Button text='remove' onClickFunction={() => props.removeFriend(friend._id)} />
    </div>
  )
}

export default Friend