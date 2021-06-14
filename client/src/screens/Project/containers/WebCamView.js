import React, { useRef, useCallback, useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from '../../../components/Loader/Loader'
import LanguageDropDown from '../components/LanguageDropDown'
import Submit from '../components/Submit'

const videoConstraints = {
  width: 720,
  height: 1280,
  facingMode: 'environment'
}

function WebCamView({ className, setCode, language, setLanguage }) {
  const [loading, setLoading] = useState(false)
  let webcamRef = useRef()

  const takePhoto = useCallback(() => {
    if (loading) {
      alert('Wait for task to finish loading!')
      return
    }

    const base64Image = webcamRef.current.getScreenshot()
    recognizeAndSetCode(base64Image)
  }, [webcamRef])

  const recognizeAndSetCode = async (base64Image) => {
    setLoading(true)
    try {
      const headers = {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.J17JYU9weVb9fVBqmhS5JZjEdzgjOAvz-21uuO7Eg4w',
        'Content-Type': 'application/json'
      }
      //const { data } = await axios.post('/api/recognize', { language, base64Image }, { headers })
      //todo: remove ^
      await new Promise(r => setTimeout(r, 5 * 1000))
      const data = { code: 'console.log("camera")' }
      setCode(prev => prev + data.code)
    } catch {
      alert('request failed, try again in 2 minutes!')
    }
    setLoading(false)
  }

  return (
    <div className={className}>
      <Loader isVisible={loading} className='absolute inset-center z-10 text-white' />

      <LanguageDropDown className='absolute z-10' setLanguage={setLanguage} language={language} />

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

      <Submit onClick={takePhoto} text='Take photo!' />
    </div>
  )
}

export default WebCamView
