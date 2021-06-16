import React, { useState, useContext, useEffect } from 'react'
import Pagination from './components/Pagination'
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
  const [language, setLanguage] = useState()
  const [searchName, setSearchName] = useState()
  const [pageNumber, setPageNumber] = useState(0)
  const [offlineProjects, setOfflineProjects] = useState()

  useEffect(() => {
    reset()
  }, [isUserProfile])

  useEffect(() => {
    getAllProjects()
  }, [pageNumber, language, searchName])

  const getAllProjects = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
      let url = `/api/projects?pageSize=5&pageNumber=${pageNumber}`
      if (isUserProfile) url += `&owner=${user._id}`
      if (searchName) url += `&title=${searchName}`
      if (language) url += `&langnuage=${language}`

      const { data } = await axios.get(url, { headers })
      const offlineData = localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects')) : []
      setProjects(data)
      setOfflineProjects(offlineData)

    } catch (err) {
      const offlineData = localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects')) : []
      setProjects(offlineData)
    }
  }

  useEffect(() => {
    if (!offlineProjects) return
    localStorage.removeItem('projects')
    offlineProjects.map(p => addOfflineProject(p))
  }, [offlineProjects])

  const addOfflineProject = async (project) => {
    try {
      const headers = {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
      if (project.method === 'post') {
        await axios.post(`/api/users/${user.uid}/projects`, { ...project }, { headers })
      } else {
        await axios.put(`/api/users/${user.uid}/projects/${project._id}`, { ...project }, { headers })
      }

    } catch (err) {
      console.log(err)
    }
  }

  const changeHandler = (e) => {
    setSearchName(e.target.value)
  }

  const reset = async (e) => {
    setLanguage()
    setSearchName()
    setPageNumber(0)
  }

  const prevPage = () => {
    setPageNumber(p => Math.max(0, p - 1))
  }

  const nextPage = () => {
    setPageNumber(p => projects.length > 0 ? p + 1 : p)
  }

  return (
    <div className='text-gray-400 mt-8 relative'>

      <div className='flex flex-wrap justify-center gap-4 m-2 mb-4'>
        <LanguageDropDown className='ring-1 ring-gray-300 p-2 rounded-sm text-black' setLanguage={setLanguage} language={language} />
        <input placeholder={'search by name'} className='ring-1 ring-gray-300 p-2 rounded-sm' onChange={changeHandler} />
        <div onClick={reset} className='bg-green-500 italic font-bold text-white p-2 rounded cursor-pointer pl-8 pr-8 grid place-items-center hover:bg-green-300'>
          reset
        </div>
      </div>

      <Pagination className='m-2 mb-8' prevPage={prevPage} nextPage={nextPage} pageNumber={pageNumber} />

      <div className='pl-8 pr-8 flex flex-col flex-wrap gap-8'>
        {projects.map(p => (
          <ProjectCard key={uuidv4()}
            title={p.title}
            language={p.language}
            creationDate={p.creationDate}
            lastModifiedDate={p.lastModifiedDate}
            authorName={p.authorName}
            id={p._id || p.offlineId}
          />
        ))}
      </div>

      <Pagination className='m-2 mt-8' prevPage={prevPage} nextPage={nextPage} pageNumber={pageNumber} />

      {projects.length === 0 && <NoProjectsCard className='grid place-items-center m-auto md:w-6/12' />}

      <div className='h-screen' />
      <div className='sticky bottom-4 right-4 flex flex-col'>
        <CreateProjectButton className='self-end' />
      </div>

    </div>
  )
}

export default Home
