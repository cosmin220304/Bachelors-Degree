import React, { useState } from 'react'
import NoProjectsFoundArrow from './components/NoProjectsFoundArrow'
import CreateProjectButton from './components/CreateProjectButton'
import { v4 as uuidv4 } from 'uuid'
import NoProjectsCard from './components/NoProjectsCard'
import ProjectCard from './components/ProjectCard'
import date from 'date-and-time';

function Home() {
  const [projects, setProjects] = useState([
    {
      language: 'cpp',
      name: 'test',
      lastModified: date.format(new Date(), 'MMM D YYYY'),
      lastAccessed: date.format(new Date(), 'MMM D YYYY'),
    },
  ])

  return (
    <div className='text-gray-400 mt-8 relative h-64'>

      <div className='pl-8 pr-8 flex flex-wrap gap-8'>
        {projects.map(p => (
          <ProjectCard key={uuidv4()}
            name={p.name}
            language={p.language}
            lastModified={p.lastModified}
            lastAccessed={p.lastAccessed}
          />
        ))}
      </div>

      { projects.length === 0 && <NoProjectsCard className='grid place-items-center m-auto md:w-6/12' />}

      <div className='h-screen' />
      <div className='sticky bottom-4 right-4 flex flex-col'>
        {projects.length === 0 && <NoProjectsFoundArrow className='mr-24' />}
        <CreateProjectButton className='self-end' />
      </div>

    </div>
  )
}

export default Home
