import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function OuputView({ className, output }) {
  return (
    <div className={className}>
      <div className='relative flex'>
        <div className='text-white flex-1'> Output: </div>
        <div className='text-white'>
          <FontAwesomeIcon icon='expand-arrows-alt' size='1x' />
        </div>
        <div className='text-white absolute top-8 right-0'>
          <FontAwesomeIcon icon='redo-alt' size='1x' />
        </div>
      </div>
      <div className='pl-4 text-white truncate whitespace-pre-wrap'> {output} </div>
    </div>
  )
}

export default OuputView
