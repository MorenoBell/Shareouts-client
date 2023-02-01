import React from 'react'
import { useState } from 'react';

function EditComment(props) {
  const [text, setText] = useState(props.text);
  return (
    <div className='flex justify-between align-middle'>
      <input autoFocus onInput={(e) => setText(e.target.value)} className='p-3 fancy font-bold w-11/12 border-0 bg-cyan-900 rounded-lg ' value={text} />
      <div className='w-1/12 text-center'>
        <i onClick={() => props.editComment(text)} class="fa-solid fa-lg hover:cursor-pointer py-5 px-2.5 border-2 rounded-lg fa-check"></i>
      </div>
    </div>
  )
}

export default EditComment