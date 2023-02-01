import { ThemeContext } from '@emotion/react'
import React, { useState, useContext } from 'react'

function Register() {
  const context = useContext(ThemeContext);
  const userId = context.userId;
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const showError = (message) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 3000)
  }
  const signUpButtonClick = () => {
    if (username && password1 && password2) {
      if (password1 == password2) {
        context.apiRequest('/createNewUser', { user: username, pwd: password1, name: name, lastName: lastName })
          .then(response => response.json())
          .then((data) => {
            if (data.userId) {
              localStorage.setItem('userId', data.userId);
              context.setUserId(data.userId);
              window.location.assign('/');
            }
            else {
              showError(data.message);
            }
          });
      }
      else {
        showError('Passwords do not match')
      }

    }
    else {
      showError('All fields must be filled in');
    }
  }

  return (
    <>
      {
        userId ? window.location.assign('/') :
          <div className='lg:mx-0 mx-5'>
            <div className='flex lg:w-1/2'>
              <h3 className='lg:mt-24 mt-12 fancy font-extrabold mx-auto  text-white text-7xl '>Shareouts</h3>
            </div>
            <div className='flex lg:flex-row flex-col min-h-screen'>

              <form className='lg:mt-40 lg:w-1/2 lg:ml-32 m-5'>
                <div className='mt-12 justify-between flex flex-col lg:flex-row'>
                  <div className='lg:w-1/2  lg:mr-4'>
                    <input onInput={(e) => setName(e.target.value)} className=' w-full shadow-lg  shadow-blue-900 font-semibold text-lg   border-2 rounded-lg p-3' placeholder='Name'></input>
                  </div>
                  <div className='lg:w-1/2 lg:mt-0 mt-12'>
                    <input onInput={(e) => setLastName(e.target.value)} className=' w-full shadow-lg  shadow-blue-900 font-semibold text-lg   border-2 rounded-lg p-3' placeholder='Last name'></input>
                  </div>
                </div>
                <div className='my-12'>
                  <input onInput={(e) => setUsername(e.target.value)} autoFocus autoComplete="username" className=' w-full font-semibold text-lg shadow-lg shadow-blue-900 border-2 rounded-lg p-3' placeholder='username'></input>
                </div>
                <div className='mt-12 '>
                  <input onInput={(e) => setPassword1(e.target.value)} type='password' className=' w-full shadow-lg  shadow-blue-900 font-semibold text-lg   border-2 rounded-lg p-3' placeholder='password'></input>
                </div>
                <div className='mt-12 '>
                  <input onInput={(e) => setPassword2(e.target.value)} type='password' className='w-full shadow-lg shadow-blue-900  font-semibold text-lg  border-2 rounded-lg p-3' placeholder='repeat password'></input>
                </div>
                {error ?
                  <div className={`text-center font-semibold mt-7 text-red-700`}>
                    {error}
                  </div>
                  : ''
                }
                <div className='flex lg:mt-24 mt-12'>
                  <button onClick={signUpButtonClick} type='button' className='p-3 border-1 w-1/2 mx-auto shadow-lg bg-cyan-800 text-white font-bold text-lg shadow-blue-900 rounded-xl'>Sign in</button>
                </div>
                <div className='mt-12 text-center'>
                  <span className='text-white lg:mx-auto ml-5 mt-2 font-semibold antialiased  '>Arleady registered ?  <a href={'/login'} className='hover:cursor-pointer underline'>Login</a></span>
                </div>
              </form>
              <div className='lg:w-1/2'>
                <div className='lg:mt-48 lg:px-24 text-center'>
                  <span className='fancy font-extrabold text-6xl'>Share your thoughts with the world </span>
                </div>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default Register