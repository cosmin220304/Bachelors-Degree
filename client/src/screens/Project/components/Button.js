import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Button({ icon, onClick }) {
  return (
    <div className='p-4 text-red-900 bg-red-500 rounded-lg self-start' onClick={onClick}>
      <FontAwesomeIcon icon={icon} size='4x' />
    </div>
  )
}

export default Button
