import React from 'react'

function DragPoint({ className }) {
  return (
    <div className={className}>
      <div className='bg-gray-400 h-16 w-8 flex flex-col justify-between'>
        <hr className='border-2 border-gray-600' />
        <hr className='border-2 border-gray-600' />
        <hr className='border-2 border-gray-600' />
        <hr className='border-2 border-gray-600' />
        <hr className='border-2 border-gray-600' />
      </div>
    </div>
  )
}

export default DragPoint
