import { ThemeContext } from '@emotion/react';
import Post from './Post';
import React, { useEffect, useState, useContext } from 'react'
import { useSearchParams } from 'react-router-dom';
import Button from './Button';

function Posts(props) {
  const context = useContext(ThemeContext);
  const [posts, setPosts] = useState();
  const [moreButton, setMoreButton] = useState(true);
  const range = 4;
  const [start, setStart] = useState(0);
  const getPosts = () => {
    const params = { userId: context.userId, userToSearchId: props.userToSearchId, start, range }
    context.apiRequest('/GetPosts', params)
      .then(response => response.json())
      .then(data => {
        let newArr = [];
        if (posts) {
          newArr = posts;
        }
        newArr = newArr.concat(data);
        if (data.length < range) {
          setMoreButton(false);
        }
        setStart(start + data.length);
        setPosts(newArr);
      });
  }
  useEffect(() => {
    getPosts();
  }, []);

  const moreButtonClick = () => {
    getPosts();
  }

  const deletePost = (postId) => {
    const params = {
      userId: context.userId,
      postId: postId
    };
    context.apiRequest('/deletePost', params)
      .then(response => response.json())
      .then(data => {
        if (data.status) {
          const newPosts = posts.filter(item => item._id !== postId);
          setStart(start - 1);
          setPosts(newPosts);
        }
      });
  }

  return (
    <div className='flex flex-col justify-center px-10'>
      {!posts ? '...Loading'
        : !posts.length ? <div className='w-full text-center mt-12 font-semibold text-lg'>No posts yet</div>
          : posts.map((post) => {
            return <Post deletePost={deletePost} key={post._id} post={post} />
          })}
      {moreButton ? (
        <div className='mt-4 mb-12 text-center'>
          <Button text='More' onClickFunction={moreButtonClick} />
        </div>) : ''}
    </div>
  )
}

export default Posts