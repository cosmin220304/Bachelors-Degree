import React from 'react'
import Webcam from 'react-webcam'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const videoConstraints = {
  width: 720,
  height: 1280,
  facingMode: 'environment'
}

function WebCamView({ webcamRef }) {
  return (
    <div>
      <div className='absolute z-10 right-2 text-white'>
        <FontAwesomeIcon icon='expand-arrows-alt' size='1x' />
      </div>

      <Webcam
        screenshotFormat='image/jpeg'
        audio={false}
        videoConstraints={videoConstraints}
        ref={webcamRef}
        className='m-auto'
      />
    </div>
  )
}

export default WebCamView
