import React from 'react'

function Submit({ onClick, text }) {
  return (
    <div onClick={onClick} className='bg-green-500 italic font-bold text-white p-4 m-2 rounded cursor-pointer grid place-items-center hover:bg-green-300'>
      {text}
    </div>
  )
}

export default Submit
