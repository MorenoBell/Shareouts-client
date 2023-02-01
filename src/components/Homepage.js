import { ThemeContext } from '@emotion/react'
import React, { useContext, useState } from 'react'
import Friends from './Friends'
import Posts from './Posts'

function Homepage() {
  const context = useContext(ThemeContext)

  return (
    <div className='min-h-screen '>
      {!context.userId ? window.location.assign('/login')
        :
        <div className='flex justify-between md:mt-20'>
          <div className='w-full'>
            <div className='fancy mb-5 font-bold text-center text-3xl'>Shares</div>
            <Posts />
          </div>
        </div>
      }
    </div>
  )
}

export default Homepage