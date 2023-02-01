import { ThemeContext } from '@emotion/react';
import { Button } from './Button'
import React, { useState, useContext } from 'react'
import EditPost from './EditPost';

function Post(props) {
  const context = useContext(ThemeContext);
  const [post, setPost] = useState(props.post);
  const [editing, setEditing] = useState(false);
  const toggleLikePost = () => {
    let newLikes = post.likes;
    //mettere anche la chiamata che aggiorna  i dati nel db, per ora è solo front end 
    if (post.likes.includes(context.userId)) {
      newLikes = post.likes.filter((x) => x != context.userId);
    }
    else {
      newLikes.push(context.userId);
    }
    context.apiRequest('/likePost', { postId: post._id, userId: context.userId })
      .then(response => response.json())
      .then(data => {
        if (data.status) {
          post.likes = newLikes;
          setPost({ ...post });
        }
      })
  }


  const commentButtonClick = () => {

  }

  const editPost = (text) => {

    context.apiRequest('/editPost', { postId: post._id, text: text })
      .then(response => response.json())
      .then(data => {
        if (data) {

          post.description = text;
          setEditing(false);
          setPost(post);
        }
      })
  }

  return (
    <div className='bg-cyan-700 md:w-full my-10 px-5 py-2.5 rounded-lg'>
      <div className='flex justify-between p-2'>
        <div>{post.deletable ? <i onClick={() => props.deletePost(post._id)} className="fa-solid p-2 hover:cursor-pointer fa-xl fa-xmark"></i> : ''}</div>
        <div>{post.deletable ? <i onClick={() => setEditing(!editing)} className="fa-solid p-2 hover:cursor-pointer fa-xl fa-pencil"></i> : ''}</div>
      </div>
      {editing ? <EditPost editPost={editPost} text={post.description} />
        : <>
          <div className='text-white font-semibold text-xl w-full shadow-lg p-2 rounded-lg'>
            {post.creatorDescription}
          </div>
          <div className='fancy font-semibold p-2 text-xl'>
            {post.description}
          </div>
          <div className='p-2'>
            {post.likes.includes(context.userId) ?
              <i type='button' onClick={toggleLikePost} className="fa-solid fa-xl hover:cursor-pointer fa-thumbs-up"></i>
              : <i type='button' onClick={toggleLikePost} className="fa-regular fa-xl hover:cursor-pointer fa-thumbs-up"></i>
            }
            <a href={`/comments?postId=${encodeURIComponent([post._id])}`}><i onClick={commentButtonClick} class="fa-regular fa-xl ml-12 hover:cursor-pointer fa-comment"></i></a>
          </div></>}
    </div >
  )
}

export default Post