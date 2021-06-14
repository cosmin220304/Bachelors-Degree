import React, { useEffect, useState } from 'react'
import FocusLock from 'react-focus-lock'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LanguageDropDown from '../components/LanguageDropDown'
import Loader from '../../../components/Loader/Loader'
import Submit from '../components/Submit'

function CodeView({ className, code, setCode, language, setLanguage, setOutput }) {
  const [recentTypedCode, setRecentTypedCode] = useState(code)
  const [loading, setLoading] = useState(false)

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
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.J17JYU9weVb9fVBqmhS5JZjEdzgjOAvz-21uuO7Eg4w',
      'Content-Type': 'application/json'
    }
    try {
      //const { data } = await axios.post('/api/compile', { code: recentTypedCode, language }, { headers })
      //todo remove this ^
      await new Promise(r => setTimeout(r, 2 * 1000))
      const data = { stdout: "3\n", stderr: "", error: null }
      setOutput(data)
    } catch {
      alert('request failed, try again in 2 minutes!')
    }
    setLoading(false)
  }

  return (
    <div className={className}>
      <Loader isVisible={loading} className='absolute inset-center z-10 text-white' />
      <FocusLock>
        <code id='edit-text' contentEditable onInput={handleChange} suppressContentEditableWarning
          className=' whitespace-pre-wrap bg-white p-4 m-2 mt-0 h-full flex flex-col'>
          {code}
        </code>
      </FocusLock>

      <div className='w-full flex p-2 pt-0 pb-0 gap-8 items-center'>
        <LanguageDropDown className='flex-1 cursor-pointer' language={language} setLanguage={setLanguage} />
        <div className='cursor-pointer' onClick={() => setCode(recentTypedCode)}>
          <FontAwesomeIcon icon='save' size='2x' color='white' />
        </div>
        <div className='pr-2 cursor-pointer' onClick={() => setCode('')}>
          <FontAwesomeIcon icon='trash-alt' size='2x' color='white' />
        </div>
      </div>

      <Submit onClick={handleRun} text='Run it!' />
    </div >
  )
}

export default CodeView
