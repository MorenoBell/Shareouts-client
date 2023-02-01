import { ThemeContext } from '@emotion/react'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import Button from './Button';
import Searchbar from './Searchbar';

function Navbar() {
  const context = useContext(ThemeContext)
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchBarVisible, setSearchBarVisible] = useState(false)
  const logoutButtonClick = () => {
    context.setUserId('');
    localStorage.removeItem('userId');
    window.location.assign('/login');
  }

  const searchNavbarClick = () => {
    if (showMobileMenu) {
      window.scrollTo(0, 0);
    }
    setSearchBarVisible(!searchBarVisible);
  }

  const openMobileNavbar = () => {
    setShowMobileMenu(!showMobileMenu);
  }
  return (
    searchBarVisible ?
      <Searchbar searchNavbarClick={searchNavbarClick} />
      :
      <nav className='flex lg:flex-row flex-col justify-between pt-3'>
        <div onClick={() => window.location.assign('/')} className='fancy text-7xl hover:cursor-pointer justify-self-start ml-5 font-extrabold'>Shareouts</div>
        <div className='lg:invisible fixed mt-16 visible'>
          <Button onClickFunction={openMobileNavbar} text={<i className="fa-solid fa-bars"></i>} />
          {showMobileMenu ?
            <aside className="w-64" aria-label="Sidebar">
              <div className="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">
                <ul className="space-y-2">
                  <li>
                    <Button onClickFunction={searchNavbarClick} text={<i className="fa-solid fa-magnifying-glass"></i>} />
                  </li>
                  <li>
                    <Button onClickFunction={() => window.location.assign('/newPost')} text='New post' />
                  </li>
                  <li>
                    <Button onClickFunction={() => window.location.assign(`/profile?userToCheck=${context.userId}`)} text='Profile' />
                  </li>
                  <li>
                    <Button onClickFunction={() => window.location.assign('/friends')} text='Followed' />
                  </li>
                  <li>
                    <Button onClickFunction={logoutButtonClick} text='Logout' />
                  </li>
                </ul>
              </div>
            </aside>
            : ''}
        </div>
        <div className='lg:visible invisible'>
          <Button onClickFunction={searchNavbarClick} text={<i className="fa-solid fa-magnifying-glass"></i>} />
          <Button onClickFunction={() => window.location.assign('/newPost')} text='New post' />
          <Button onClickFunction={() => window.location.assign(`/profile?userToCheck=${encodeURIComponent(context.userId)}`)} text={`Profile`} />
          <Button onClickFunction={() => window.location.assign('/Friends')} text='Followed' />
          <Button onClickFunction={logoutButtonClick} text='Logout' />
        </div>
      </nav>

  )
}

export default Navbar