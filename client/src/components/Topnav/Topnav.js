import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export default function Topnav() {
  return (
    <div className='text-lg bg-black text-white h-16 flex place-items-center justify-between p-5 pl-10 pr-10'>
      <Link to='/'>
        <b>Pocket IDE</b>
      </Link>
      <Link to='/profile'>
        <FontAwesomeIcon icon='user-circle' color='white' size="2x" />
      </Link>
    </div>
  )
}
