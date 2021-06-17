import React, { useContext, useEffect, useState } from 'react'
import FocusLock from 'react-focus-lock'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LanguageDropDown from '../../../components/LanguageDropDown'
import Loader from '../../../components/Loader/Loader'
import Submit from '../components/Submit'
import { UserContext } from '../../../utils/UseUserContext'

function CodeView({ className, code, setCode, language, setLanguage, setOutput }) {
  const [recentTypedCode, setRecentTypedCode] = useState(code)
  const [loading, setLoading] = useState(false)
  const [user,] = useContext(UserContext)

  useEffect(() => {
    const updateCode = setTimeout(() => {
      setCode(recentTypedCode)
    }, 2500)

    return () => clearTimeout(updateCode)
  }, [recentTypedCode])

  useEffect(() => {
    setRecentTypedCode(code)
  }, [code])

  const whiteSpaceEventListener = (e) => {
    if (e.key === 'Enter') {
      document.execCommand('insertLineBreak')
      e.preventDefault()
    }
    if (e.keyCode === 9) {
      document.execCommand('insertHTML', false, '&#009')
      e.preventDefault()
    }
  }

  useEffect(() => {
    const editText = document.getElementById('edit-text')
    editText.addEventListener('keydown', whiteSpaceEventListener)
    return () => editText.addEventListener('keydown', whiteSpaceEventListener)
  }, [])

  const handleChange = (e) => {
    setRecentTypedCode(e.currentTarget.innerText)
  }

  const handleRun = async () => {
    if (loading) {
      alert('Wait for task to finish loading!')
      return
    }
    if (code === '') {
      alert('No code to run!')
      return
    }

    setLoading(true)
    setCode(recentTypedCode)
    const headers = {
      'Authorization': `Bearer ${user.token}`,
      'Content-Type': 'application/json'
    }
    try {
      const { data } = await axios.post('/api/compile', { code: recentTypedCode, language }, { headers })
      setOutput(data)
    } catch {
      alert('request failed, try again later!')
    }
    setLoading(false)
  }

  return (
    <div className={className + ' md:w-6/12'}>
      <Loader isVisible={loading} className='absolute inset-center z-10 text-white' />
      <code id='edit-text' contentEditable onInput={handleChange} suppressContentEditableWarning
        className=' whitespace-pre-wrap bg-white p-4 m-2 mt-0 h-full flex flex-col'>
        {code}
      </code>

      <div className='w-full flex p-2 pt-0 pb-0 gap-8 items-center'>
        <LanguageDropDown className='flex-1' language={language} setLanguage={setLanguage} />
        <div className='cursor-pointer hover:text-gray-400' onClick={() => setCode(recentTypedCode)}>
          <FontAwesomeIcon icon='save' size='2x' color='white' />
        </div>
        <div className='pr-2 cursor-pointer hover:text-gray-400' onClick={() => setCode('')}>
          <FontAwesomeIcon icon='trash-alt' size='2x' color='white' />
        </div>
      </div>

      <Submit onClick={handleRun} text='Run it!' />
    </div >
  )
}

export default CodeView
