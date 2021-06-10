import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Topnav() {
  return (
    <div className='text-lg bg-black text-white h-16 flex place-items-center justify-between p-5 pl-10 pr-10'>
      <b>Pocket IDE</b>
      <div>
        <FontAwesomeIcon icon='user-circle' color='white' size="2x" />
      </div>
    </div>
  )
}
