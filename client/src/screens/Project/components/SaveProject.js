import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SaveProject({ className }) {
  return (
    <div className={className}>
      <div className='text-white flex justify-end md:justify-start  p-2 items-center'>
        <div className='text-white text-xs ring-1 p-2 rounded ring-white cursor-pointer'>
          <FontAwesomeIcon icon='cloud' size='sm' /> Save project
        </div>
      </div>
    </div>
  )
}

export default SaveProject
