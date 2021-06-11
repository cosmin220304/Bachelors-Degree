import React from 'react'

function ProjectCard({ name, language, lastModified, lastAccessed }) {
  return (
    <div className='bg-yellow-300 m-auto text-black shadow-lg rounded-lg w-64 h-32 p-4 border-l-8 border-black flex flex-col gap-1'>
      <div className='flex'>
        <b className='flex-1'> {name} </b>
        <b className=''> {language} </b>
      </div>
      <div className='flex-1' />
      <div className='text-xs italic'> Last Modified: {lastModified}</div>
      <div className='text-xs italic'> Last Accessed: {lastAccessed}</div>
    </div>
  )
}

export default ProjectCard
