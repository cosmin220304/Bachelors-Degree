import React, { useEffect, useState } from 'react'
import FocusLock from 'react-focus-lock';
import axios from 'axios';

function CodeView({ className, code, setCode }) {
  const [localCode, setLocalCode] = useState(code)
  const [recentTypedCode, setRecentTypedCode] = useState(code)

  useEffect(() => {
    const updateLocalCode = setTimeout(() => {
      setLocalCode(recentTypedCode)
    }, 2500)

    return () => clearTimeout(updateLocalCode)
  }, [recentTypedCode])

  const todo = (e) => {
    if (e.key === 'Enter') {
      document.execCommand('insertLineBreak')
      e.preventDefault()
    }
    if (e.keyCode === 9) {
      document.execCommand('insertHTML', false, '&#009');
      e.preventDefault()
    }
  }

  useEffect(() => {
    const editText = document.getElementById('edit-text')
    editText.addEventListener('keydown', todo)
    return () => editText.addEventListener('keydown', todo)
  }, [])

  const handleChange = (e) => {
    const len = e.currentTarget.textContent.length
    setRecentTypedCode(e.currentTarget.innerText)
  }

  const handleRun = (e) => {
    console.log(localCode)
    axios.post("adadasdasd", { localCode })
  }

  return (
    <div className={className}>
      <FocusLock>
        <code id='edit-text' contentEditable onInput={handleChange} suppressContentEditableWarning
          className=' whitespace-pre-wrap bg-white p-4 m-2 mt-0 h-full flex flex-col'
        >
          {localCode}
        </code>
      </FocusLock>
      <div onClick={handleRun}
        className='bg-green-500 italic font-bold text-white p-4 m-2 rounded cursor-pointer grid place-items-center'
      >
        Run it!
      </div>
    </div >
  )
}

export default CodeView
