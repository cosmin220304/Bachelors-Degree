import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../../utils/UseUserContext'

function ProjectCard({ title, language, lastModifiedDate, creationDate, authorName, id }) {
  const [user,] = useContext(UserContext)
  const history = useHistory()

  return (
    <div
      className='cursor-pointer bg-yellow-300 m-auto text-black shadow-lg rounded-lg w-64 h-32 p-4 border-l-8 border-black flex flex-col gap-1'
      onClick={() => history.push(`/project/${id}`)}>

      <div className='flex'>
        <b className='flex-1 truncate'> {title} </b>
        <b className=''> {language} </b>
      </div>

      {
        user.username === authorName
          ? <div className='text-xs text-green-700 font-bold'>  by you </div>
          : <div className='text-xs font-bold'>  by authorName  </div>
      }

      <div className='flex-1' />

      <div className='text-xs italic'> Last Modified on: {lastModifiedDate}</div>
      <div className='text-xs italic'> Created on: {creationDate}</div>

    </div >
  )
}

export default ProjectCard
