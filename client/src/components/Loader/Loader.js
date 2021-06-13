import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Loader({ className, isVisible }) {
  if (!isVisible) return null

  return (
    <div className={className}>
      <FontAwesomeIcon icon='spinner' spin size='10x' />
    </div>
  )
}

export default Loader
