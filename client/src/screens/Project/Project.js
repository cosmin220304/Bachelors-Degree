import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import Button from './components/Button'
import WebCamView from './containers/WebCamView'
import CodeView from './containers/CodeView'
import DrawView from './containers/DrawView'
import OuputView from './containers/OuputView'
import SaveProject from './components/SaveProject'
import { UserContext } from '../../utils/UseUserContext'

function Project() {
  const { id } = useParams()
  const history = useHistory()
  const [code, setCode] = useState('')
  const [output, setOutput] = useState()
  const [language, setLanguage] = useState('javascript')
  const [title, setTitle] = useState('New project')
  const [currentView, setCurrentView] = useState('Camera')
  const [user,] = useContext(UserContext)

  useEffect(() => {
    if (!id || id === 'new') return
    loadProjectData()
  }, [id])

  const loadProjectData = async () => {
    try {
      const headers = { Authorization: `Bearer ${user.token}` }
      const { data } = await axios.get(`/api/projects/${id}`, { headers })
      setCode(data.code)
      setLanguage(data.language)
      setTitle(data.title)

    } catch (err) {
      let projects = localStorage.getItem('projects')

      if (!projects) {
        alert('project doesn\'t exist!')
        history.push('/')

      } else {
        const project = JSON.parse(projects).find(p => p.offlineId === id)
        setCode(project.code)
        setLanguage(project.language)
        setTitle(project.title)
      }
    }
  }

  useEffect(() => {
    if (!code) return
    setCurrentView('Code')
  }, [code])

  const CurrentView = ({ className }) => {
    if (currentView === 'Code') {
      return <CodeView code={code} setCode={setCode} language={language} setLanguage={setLanguage} setOutput={setOutput} />
    }

    if (currentView === 'Draw') {
      return <DrawView setCode={setCode} language={language} setLanguage={setLanguage} />
    }

    return <WebCamView setCode={setCode} language={language} setLanguage={setLanguage} />
  }

  return (
    <div className='h-full bg-black'>

      <SaveProject className='md:pl-16' language={language} code={code} proj_title={title} />

      <div className='bg-black sm:m-auto md:w-6/12 md:flex items-start md:pl-16 md:w-full md:h-full'>

        <CurrentView />

        <div className='grid grid-cols-3 text-center gap-2 m-2 md:mt-0'>
          <Button icon='pen' onClick={() => setCurrentView('Draw')} />
          <Button icon='camera' onClick={() => setCurrentView('Camera')} />
          <Button icon='code' onClick={() => setCurrentView('Code')} />
          <OuputView output={output} className='p-4 pt-0 hidden md:block' />
        </div>

        <OuputView output={output} className='p-4 pt-0 md:hidden' />
      </div >
    </div >
  )
}

export default Project
