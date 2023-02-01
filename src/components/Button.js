import React from 'react'

function Button(props) {
  return (
    <button onClick={props.onClickFunction} type='button' className={`rounded-lg bg-gradient-to-r shadow-blue-900 shadow-xl border-0 from-cyan-800 mt-5 to-cyan-700 text-white font-bold  px-7 py-3  mx-2 ${props.className}`}>{props.text}</button>
  )
}

export default Button