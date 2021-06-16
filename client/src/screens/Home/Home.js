import React, { useState, useContext, useEffect } from 'react'
import NoProjectsFoundArrow from './components/NoProjectsFoundArrow'
import CreateProjectButton from './components/CreateProjectButton'
import { v4 as uuidv4 } from 'uuid'
import NoProjectsCard from './components/NoProjectsCard'
import ProjectCard from './components/ProjectCard'
import { UserContext } from '../../utils/UseUserContext'
import LanguageDropDown from '../../components/LanguageDropDown'
import axios from 'axios'

function Home({ isUserProfile }) {
  const [user,] = useContext(UserContext)
  const [projects, setProjects] = useState([])
  const [language, setLanguage] = useState('javascript')
  const [searchName, setSearchName] = useState()

  useEffect(() => {
    if (isUserProfile) {
      getUserProjects()
      return
    }
    getAllProjects()
  }, [isUserProfile])

  const getUserProjects = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
      const { data } = await axios.get(`/api/projects?owner=${user._id}`, { headers })
      setProjects(data)
    } catch {
      setProjects([])
    }
  }

  const getAllProjects = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
      const { data } = await axios.get(`/api/projects`, { headers })
      setProjects(data)
    } catch {
      setProjects([])
    }
  }

  const changeHandler = (e) => {
    setSearchName(e.target.value)
  }

  const makeSearch = async (e) => {
    try {
      let url = `/api/projects?language=${language}`
      if (searchName) url += `&title=${searchName}`

      const headers = {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
      const { data } = await axios.get(url, { headers })
      setProjects(data)
    } catch {
      setProjects([])
    }
  }

  return (
    <div className='text-gray-400 mt-8 relative'>

      <div className='flex flex-wrap justify-center gap-4 m-2 mb-8'>
        <LanguageDropDown className='ring-1 ring-gray-300 p-2 rounded-sm text-black' setLanguage={setLanguage} language={language} />
        <input placeholder={'search by name'} className='ring-1 ring-gray-300 p-2 rounded-sm' onChange={changeHandler} />
        <div onClick={makeSearch} className='bg-green-500 italic font-bold text-white p-2 rounded cursor-pointer pl-8 pr-8 grid place-items-center hover:bg-green-300'>
          search
        </div>
      </div>

      <div className='pl-8 pr-8 flex flex-col flex-wrap gap-8'>
        {projects.map(p => (
          <ProjectCard key={uuidv4()}
            title={p.title}
            language={p.language}
            creationDate={p.creationDate}
            lastModifiedDate={p.lastModifiedDate}
            authorName={p.authorName}
            id={p._id}
          />
        ))}
      </div>

      {projects.length === 0 && <NoProjectsCard className='grid place-items-center m-auto md:w-6/12' />}

      <div className='h-screen' />
      <div className='sticky bottom-4 right-4 flex flex-col'>
        <CreateProjectButton className='self-end' />
      </div>

    </div>
  )
}

export default Home
