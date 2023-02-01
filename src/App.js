import { ThemeContext } from '@emotion/react';
import React, { useState } from 'react'
import Homepage from './components/Homepage';
import Profile from './components/Profile';
import Login from './components/Login'
import Navbar from './components/Navbar';
import Register from './components/Register'
import { Routes, Router, Route, Outlet, Link } from "react-router-dom";
import NewPost from './components/NewPost';
import Comments from './components/Comments';
import Friends from './components/Friends';
function App() {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  function apiRequest(url, params) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    };
    return fetch(process.env.REACT_APP_API_URL + url, requestOptions)
  }
  return (
    <ThemeContext.Provider value={{ setUserId, apiRequest, userId }}>
      <div className='min-h-screen  bg-gradient-to-r from-cyan-900 to-blue-900'>
        {userId ? <Navbar /> : ''}
        <div className='container mx-auto'>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/newPost" element={<NewPost />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/comments" element={<Comments />} />
          </Routes>
        </div>
      </div>
    </ThemeContext.Provider >
  )
}

export default App