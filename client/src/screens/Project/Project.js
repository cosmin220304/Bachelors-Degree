import React, { useRef, useCallback, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import LanguageDropDown from './components/LanguageDropDown'
import Button from './components/Button'
import Loader from '../../components/Loader/Loader'
import WebCamView from './containers/WebCamView'
import CodeView from './containers/CodeView'
import OuputView from './containers/OuputView'

function Project() {
  const { id } = useParams()
  const history = useHistory()
  const webcamRef = useRef()
  const [code, setCode] = useState('for i in range(4)\r\nConsole.log 13)\r\nasdadasd\r\nasdas\r\n')
  const [output, seOutput] = useState()
  const [language, setLanguage] = useState('javascript')
  const [loading, setLoading] = useState(false)

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

  useEffect(() => {
    if (!id || id === 'new') return
    loadProjectData()
  }, [id])

  const takePhoto = useCallback(() => {
    if (loading) {
      alert('Wait for task to finish loading!')
      return
    }
    if (!webcamRef.current) return

    const base64Image = webcamRef.current.getScreenshot()
    recognizeAndSetCode(base64Image)
  }, [webcamRef])

  const recognizeAndSetCode = async (base64Image) => {
    try {
      setLoading(true)
      const headers = {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.J17JYU9weVb9fVBqmhS5JZjEdzgjOAvz-21uuO7Eg4w',
        'Content-Type': 'application/json'
      }
      //const { data } = await axios.post('/api/recognize', { language, base64Image }, { headers })
      //todo: remove ^
      await new Promise(r => setTimeout(r, 5 * 1000))
      const data = { code: 'Console.log 13)\r\n' }
      setCode(data.code)
      setLoading(false)
    } catch {
      alert('request failed, try again in 2 minutes!')
    }
  }

  return (
    <div className='h-full bg-black'>
      <div className='bg-black m-auto md:w-6/12 md:grid md:grid-cols-2 md:ml-16'>
        <Loader isVisible={loading} className='absolute inset-center z-10 text-white' />
        {/* <LanguageDropDown className='absolute z-10' setLanguage={setLanguage} /> */}

        {/* <WebCamView webcamRef={webcamRef} /> */}
        <CodeView code={code} setCode={setCode} />

        <div className='grid grid-cols-3 text-center gap-2 m-2 md:mt-0 md:h-32'>
          <Button icon='pen' onClick={() => { }} />
          <Button icon='camera' onClick={takePhoto} />
          <Button icon='code' onClick={() => { }} />
        </div>

        <OuputView output={output} className='p-4 pt-0' />

      </div >
    </div>
  )
}

export default Project
