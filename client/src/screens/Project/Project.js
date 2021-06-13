import React, { useRef, useCallback, useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import DropDown from './components/DropDown'

const videoConstraints = {
  width: 720,
  height: 1280,
  facingMode: 'environment'
}

function Project() {
  const { id } = useParams()
  const history = useHistory()
  const webcamRef = useRef()
  const [code, setCode] = useState()
  const [output, seOutput] = useState()
  const [language, setLanguage] = useState('javascript')

  useEffect(() => {
    if (!id || id === 'new') return
    loadProjectData()
  }, [id])

  const loadProjectData = async () => {
    try {
      const { data } = await axios(`/api/projects/${id}`)
      setCode({ ...data.code })
      setLanguage({ ...data.language })
    } catch {
      alert('project doesn\'t exist!')
      history.push('/')
    }
  }

  const takePhoto = useCallback(() => {
    const base64Image = webcamRef.current.getScreenshot()
    recognizeCode(base64Image)
  }, [webcamRef])

  const recognizeCode = async (base64Image) => {
    try {
      console.log("calling with data: ", {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.J17JYU9weVb9fVBqmhS5JZjEdzgjOAvz-21uuO7Eg4w',
          'Content-Type': 'application/json'
        },
        data: {
          'language': 'javascript',
          'code': 'console.log(3)'
        }
      })
      const headers = {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.J17JYU9weVb9fVBqmhS5JZjEdzgjOAvz-21uuO7Eg4w',
        'Content-Type': 'application/json'
      }
      //const { data } = await axios.post('/api/recognize', { language, base64Image }, { headers })
      //todo: remove ^
      await new Promise(r => setTimeout(r, 5 * 1000))
      const data = { code: "Console.log 13)\r\n" }
      setCode(data.code)
    } catch {
      alert('request failed, try again in 2 minutes!')
    }
  }

  return (
    <div className='h-full bg-black'>
      <div className='bg-black m-auto md:w-6/12 md:grid md:grid-cols-2 md:ml-16'>

        <DropDown className='absolute z-10' changeHandler={(e) => setLanguage(e.target.value)} />

        <div className='absolute inset-center z-10 text-white'>
          <FontAwesomeIcon icon='spinner' spin size='10x' />
        </div>

        <Webcam
          screenshotFormat='image/jpeg'
          audio={false}
          videoConstraints={videoConstraints}
          ref={webcamRef}
          className='m-auto'
        />

        {/* Buttons */}
        <div className='grid grid-cols-3 text-center gap-2 m-2 md:mt-0 h-32'>
          <div className='p-4 text-red-900 bg-red-500 rounded-lg self-start'>
            <FontAwesomeIcon icon='pen' size='4x' />
          </div>
          <div className='p-4 text-red-900 bg-red-500 rounded-lg self-start' onClick={takePhoto}>
            <FontAwesomeIcon icon='camera' size='4x' />
          </div>
          <div className='p-4 text-red-900 bg-red-500 rounded-lg self-start'>
            <FontAwesomeIcon icon='code' size='4x' />
          </div>
        </div>

        {/* Output */}
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

          <div className='pl-4 text-white truncate whitespace-pre-wrap'> {output} </div>
        </div>
      </div >
    </div>
  )
}

export default Project
