import React, { useState, useContext } from 'react'
import { ThemeContext } from '@emotion/react';
import shareoutsImage from '../images/shareouts-login.png'
import Button from './Button';

function Login() {
  const context = useContext(ThemeContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');

  function showError(message) {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 3000)
  }
  function login() {
    if (username && password) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password })
      };
      fetch(process.env.REACT_APP_API_URL + '/loginUser', requestOptions)
        .then(response => response.json())
        .then((data) => {
          const id = data.id;
          if (id) {
            localStorage.setItem('userId', id);
            context.setUserId(id);
            window.location.assign('/')
          }
          else {
            showError(data.message);
          }
        });
    }
    else {
      showError('All fields must be filled in');
    }

  }
  return (
    <div className='lg:mx-0 mx-5'>
      {context.userId ? window.location.assign('/') :
        <>
          <div className='flex lg:w-1/2'>
            <h3 className='lg:mt-24 mt-12 fancy font-extrabold mx-auto  text-white text-7xl '>Shareouts</h3>
          </div>
          <div className=' flex lg:flex-row flex-col min-h-screen'>

            <form onSubmit={() => false} className='lg:mt-40 lg:w-1/2 lg:ml-32 m-5'>
              <div>
                <input onInput={(e) => setUsername(e.target.value)} autoFocus autoComplete="username" className='my-10 w-full shadow-lg shadow-blue-900 font-semibold text-lg border-2 rounded-lg p-3' type='text' placeholder='username'></input>
              </div>
              <div>
                <input onInput={(e) => setPassword(e.target.value)} type='password' autoComplete="password" className='mt-10 w-full shadow-lg shadow-blue-900 font-semibold text-lg border-2 rounded-lg p-3' placeholder='password'></input>
              </div>
              {error ?
                <div className={`text-center font-semibold mt-7 text-red-700`}>
                  {error}
                </div> :
                ''}
              <div className='flex justify-center lg:mt-20 mt-12'>
                <Button onClickFunction={login} className='w-1/2' text='Login' />
              </div>
              <div className='mt-12 text-center'>
                <span className='text-white lg:mx-auto ml-5 mt-2 font-semibold '>You need an account ?  <a href={'/register'} className='hover:cursor-pointer underline'>Sign in</a></span>
              </div>
            </form>
            <div className='lg:w-1/2'>
              <div className='lg:mt-48 px-24 text-center'>
                <span className='fancy font-extrabold text-6xl'>Share your thoughts with the world </span>
              </div>
            </div>
          </div >
        </>}
    </div >

  )
}

export default Login