import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import Button from './components/Button'
import Loader from '../../components/Loader/Loader'
import WebCamView from './containers/WebCamView'
import CodeView from './containers/CodeView'
import OuputView from './containers/OuputView'

function Project() {
  const { id } = useParams()
  const history = useHistory()
  const [code, setCode] = useState('for i in range(4)\r\nConsole.log 13)')
  const [output, setOutput] = useState()
  const [savedLanguage, setSavedLanguage] = useState('javascript')

  const loadProjectData = async () => {
    try {
      const { data } = await axios(`/api/projects/${id}`)
      setCode({ ...data.code })
      setSavedLanguage({ ...data.language })
    } catch {
      alert('project doesn\'t exist!')
      history.push('/')
    }
  }

  useEffect(() => {
    if (!id || id === 'new') return
    loadProjectData()
  }, [id])

  useEffect(() => {
    console.log(code)
  }, [code])

  return (
    <div className='h-full bg-black'>
      <div className='bg-black m-auto md:w-6/12 md:grid md:grid-cols-2 md:ml-16'>

        <WebCamView setCode={setCode} savedLanguage={savedLanguage} />
        {/* <CodeView code={code} setCode={setCode} savedLanguage={savedLanguage} /> */}

        <div className='grid grid-cols-3 text-center gap-2 m-2 md:mt-0 md:h-32'>
          <Button icon='pen' onClick={() => { }} />
          <Button icon='camera' onClick={() => { }} />
          <Button icon='code' onClick={() => { }} />
        </div>

        <OuputView output={output} className='p-4 pt-0' />

      </div >
    </div>
  )
}

export default Project
