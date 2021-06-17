import React, { useRef, useCallback, useState, useContext } from 'react'
import Webcam from 'react-webcam'
import Tesseract from 'tesseract.js'
import Loader from '../../../components/Loader/Loader'
import LanguageDropDown from '../../../components/LanguageDropDown'
import Submit from '../components/Submit'
import { UserContext } from '../../../utils/UseUserContext'
import axios from 'axios'

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
      const { data } = await axios.post('/api/recognize', { language, base64Image }, { headers })
      setCode(prev => (prev + '\n' + data.code).trim())
      setLoading(false)

    } catch (err) {
      console.log(err)
      alert('request to server failed, will try to use a local solution')
      recognizeOffline(base64Image)
    }
  }

  const recognizeOffline = async (base64Image) => {
    try {
      const worker = Tesseract.createWorker({
        langPath: '../../../utils/tesseract/lang',
      });
      await worker.load();
      await worker.loadLanguage('eng')
      await worker.initialize('eng')
      const { data: { text } } = await worker.recognize(base64Image);
      await worker.terminate();
      setCode(prev => (prev + '\n' + text.toLowerCase()).trim())

    } catch (err) {
      console.log(err)
      alert('some error occured, please try again!')

    } finally {
      setLoading(false)
    }
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
