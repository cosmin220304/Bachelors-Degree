import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function NoProjectsCard({ className }) {
  return (
    <div className={'grid place-items-center gap-4 pl-16 pr-16 pt-8 pb-8 shadow-lg rounded-lg ' + className}>
      <h1 className='text-lg'> No projects found! :( </h1>

      <div className='mt-4'>
        <FontAwesomeIcon icon='camera' size='4x' />
      </div>

      <div className='flex place-items-center gap-2'>
        <hr className='w-16' />
      or
      <hr className='w-16' />
      </div>

      <div className='cursor-pointer'>
        <FontAwesomeIcon icon='pen' size='4x' />
      </div>
    </div>
  )
}

export default NoProjectsCard
