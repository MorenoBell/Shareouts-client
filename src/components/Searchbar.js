import { ThemeContext } from '@emotion/react';
import React, { useState, useContext, useEffect } from 'react'
import Button from './Button';
import Result from './Result';

function Searchbar(props) {
  const context = useContext(ThemeContext);
  const [results, setResults] = useState();
  const [description, setDescription] = useState('');

  const descriptionOnInput = (e) => {
    setDescription(e.target.value);
  }
  useEffect(() => {
    searchForUsers();
  }, [description])
  const searchForUsers = () => {
    if (description && description.trim().length >= 3) {
      const params = {
        userId: context.userId,
        description: description
      }
      context.apiRequest('/searchUsers', params)
        .then(res => res.json())
        .then(data => {
          setResults(data.users);
        });
    }
    else {
      setResults();
    }
  }
  return (
    <>
      <div className='flex md:flex-row flex-col'>
        <div className='lg:w-1/5 w-full text-center'>
          <div onClick={() => window.location.assign('/')} className='fancy text-7xl hover:cursor-pointer justify-self-start ml-5 font-extrabold'>Shareouts</div>
        </div>
        <div className='lg:w-2/5 lg:ml-12 mx-auto w-10/12'>
          <input onInput={descriptionOnInput} autoFocus placeholder='search for someone' className='my-0 px-5 w-full border-2 rounded-lg py-2.5 h-min text-sm mt-5' />
        </div>
        <div className='lg:w-1/5 mx-auto w-2/12'>
          <Button onClickFunction={props.searchNavbarClick} className='h-min' text={<i className="fa-solid fa-backward"></i>} />
        </div>
      </div>
      <div className=''>
        {!results ?
          'Type 3 or more characters'
          :
          !results.length ?
            'No results found'
            :
            <div className='bg-cyan-900 rounded-lg mx-2 my-5'>
              {results.map((value) =>
                < Result key={value._id} result={value} />
              )}
            </div>}
      </div>
    </>
  )
}

export default Searchbar