import React, { useRef, useCallback, useState, useContext } from 'react'
import Webcam from 'react-webcam'
import Loader from '../../../components/Loader/Loader'
import LanguageDropDown from '../../../components/LanguageDropDown'
import Submit from '../components/Submit'
import { UserContext } from '../../../utils/UseUserContext'

const videoConstraints = {
  width: 720,
  height: 1280,
  facingMode: 'environment'
}

function WebCamView({ className, setCode, language, setLanguage }) {
  let webcamRef = useRef()
  const [loading, setLoading] = useState(false)
  const [user,] = useContext(UserContext)

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
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
      //const { data } = await axios.post('/api/recognize', { language, base64Image }, { headers })
      //todo: remove ^, comment this v
      const data = { code: 'console.log("camera")' }
      setCode(prev => (prev + '\n' + data.code).trim())
    } catch {
      alert('request failed, try again in 2 minutes!')
    }
    setLoading(false)
  }

  return (
    <div className={className}>
      <Loader isVisible={loading} className='absolute inset-center z-10 text-white' />

      <LanguageDropDown className='absolute z-10' setLanguage={setLanguage} language={language} />

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
