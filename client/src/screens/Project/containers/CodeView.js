import React, { useEffect, useState } from 'react'
import FocusLock from 'react-focus-lock'
import axios from 'axios'
import LanguageDropDown from '../components/LanguageDropDown'
import Loader from '../../../components/Loader/Loader'
import Submit from '../components/Submit'

function CodeView({ className, code, setCode, language, setLanguage, setOutput }) {
  const [localCode, setLocalCode] = useState(code)
  const [recentTypedCode, setRecentTypedCode] = useState(code)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const updateLocalCode = setTimeout(() => {
      setLocalCode(recentTypedCode)
    }, 5000)

    return () => clearTimeout(updateLocalCode)
  }, [recentTypedCode])

  useEffect(() => {
    setLocalCode(code)
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
    setLoading(true)
    setLocalCode(recentTypedCode)
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
          className=' whitespace-pre-wrap bg-white p-4 m-2 mt-0 h-full flex flex-col'
        >
          {localCode}
        </code>
      </FocusLock>
      <LanguageDropDown className='ml-2' language={language} setLanguage={setLanguage} />

      <Submit onClick={handleRun} text='Run it!' />
    </div >
  )
}

export default CodeView
