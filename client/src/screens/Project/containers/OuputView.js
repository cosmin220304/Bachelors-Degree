import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function OuputView({ className, output }) {

  const DisplayOutput = () => {
    if (output?.stderr) {
      return <div className='pl-4 text-white truncate whitespace-pre-wrap'> {output.stderr} </div>
    }

    if (output?.stdout) {
      return <div className='pl-4 text-white truncate whitespace-pre-wrap'> {output.stdout} </div>
    }

    return <div className='blink pl-4 text-white truncate whitespace-pre-wrap'> _ </div>
  }

  return (
    <div className={className}>
      <div className='text-white flex-1'> Output: </div>
      <DisplayOutput />
    </div>
  )
}

export default OuputView
