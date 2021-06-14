import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Button({ icon, onClick }) {
  return (
    <div className='text-5xl p-4 text-red-900 hover:bg-red-300 bg-red-500 rounded-lg self-start cursor-pointer ' onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </div>
  )
}

export default Button
