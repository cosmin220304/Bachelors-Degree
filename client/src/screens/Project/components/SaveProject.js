import React, { useContext, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import { UserContext } from '../../../utils/UseUserContext'
import { v4 as uuidv4 } from 'uuid'

function SaveProject({ className, language, code, proj_title }) {
  const { id } = useParams()
  const history = useHistory()
  const [user,] = useContext(UserContext)
  const [title, setTitle] = useState(proj_title)

  useEffect(() => {
    setTitle(proj_title)
  }, [proj_title])

  const createProject = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
      const { data } = await axios.post(`/api/users/${user.uid}/projects`, { language, code, title, author: user._id }, { headers })
      history.push(`/project/${data._id}`)
    } catch (err) {
      saveOffline('post', uuidv4())
    }
  }

  const updateProject = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
      await axios.put(`/api/users/${user.uid}/projects/${id}`, { language, code, title, author: user._id }, { headers })

    } catch (err) {
      if (!err.response) {
        saveOffline('put', id)
      } else {
        const { error: errorMsg } = err.response.data
        if (errorMsg === 'you are not the owner') {
          alert('created a copy of project')
          createProject()
        }
      }
    }
  }

  const saveOffline = (method, offlineId) => {
    console.log(method, offlineId)
    let projects = localStorage.getItem('projects')
    const newProject = { language, code, title, author: user._id, method, offlineId }

    if (projects) {
      projects = JSON.parse(projects)
      const oldProject = projects.find(p => p.offlineId === offlineId)
      if (!oldProject) {
        projects.push(newProject)
      } else {
        projects = projects.map(p => p.offlineId === offlineId ? newProject : p)
      }
    } else {
      projects = [newProject]
    }

    alert('you are offline, saved it locally')
    localStorage.setItem('projects', JSON.stringify(projects))
  }

  const save = () => {
    if (!code) {
      alert("you didn't write any code!")
      return
    }

    if (id === 'new') {
      createProject()
    } else {
      updateProject()
    }
  }

  const handleChange = (e) => {
    setTitle(e.target.value)
  }

  return (
    <div className={className} >
      <div className='flex justify-center md:justify-start p-2 mb-2 items-center gap-4'>
        <input placeholder={title} className='rounded p-1' onChange={handleChange} />
        <div className='text-white text-xs ring-1 p-2 rounded ring-white cursor-pointer hover:bg-gray-300 ' onClick={save}>
          <FontAwesomeIcon icon='cloud' size='sm' /> Save project
        </div>
      </div>
    </div>
  )
}

export default SaveProject
