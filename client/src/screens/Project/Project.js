import React, { useRef, useCallback, useState } from 'react'
import Webcam from 'react-webcam'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const videoConstraints = {
  width: 720,
  height: 1280,
  facingMode: "environment"
}

function Project() {
  const webcamRef = useRef()
  const [code, setCode] = useState('_')

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    console.log(imageSrc)
  }, [webcamRef])


  return (
    <div className='h-full bg-black'>
      <div className='bg-black md:w-6/12 m-auto'>

        <Webcam
          screenshotFormat="image/jpeg"
          audio={false}
          videoConstraints={videoConstraints}
          ref={webcamRef}
          className='m-auto'
        />

        {/* Buttons */}
        <div className='grid grid-cols-3 gap-2 text-center m-2'>
          <div className='p-4 text-red-900 bg-red-500 rounded-lg'>
            <FontAwesomeIcon icon='pen' size='4x' />
          </div>
          <div className='p-4 text-red-900 bg-red-500 rounded-lg' onClick={capture}>
            <FontAwesomeIcon icon='camera' size='4x' />
          </div>
          <div className='p-4 text-red-900 bg-red-500 rounded-lg'>
            <FontAwesomeIcon icon='code' size='4x' />
          </div>
        </div>

        {/* Code */}
        <div className='p-4 pt-0'>
          <div className='relative flex'>
            <div className='text-white flex-1'> Output: </div>
            <div className='text-white'>
              <FontAwesomeIcon icon='expand-arrows-alt' size='1x' />
            </div>
            <div className='text-white absolute top-8 right-0'>
              <FontAwesomeIcon icon='redo-alt' size='1x' />
            </div>
          </div>

          <div className='pl-4 text-white truncate whitespace-pre-wrap'> {code} </div>
        </div>
      </div >
    </div>
  )
}

export default Project
