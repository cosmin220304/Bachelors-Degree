import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useHistory } from 'react-router-dom'

export default function Topnav() {
  const history = useHistory()

  return (
    <div className='text-lg bg-black text-white h-16 flex place-items-center justify-between pl-10 pr-10 '>
      <Link to='/' onClick={history.push('/')}>
        <b>Pocket IDE</b>
      </Link>
      <Link to='/profile' onClick={history.push('/profile')}>
        <FontAwesomeIcon icon='user-circle' color='white' size="2x" />
      </Link>
    </div>
  )
}
