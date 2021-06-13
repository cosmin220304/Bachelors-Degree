import React, { useState, useEffect } from 'react'
import axios from 'axios'

function DropDown({ className, changeHandler }) {
  const [languages, setLanguage] = useState([])

  useEffect(() => {
    (async function () {
      const { data } = await axios.get('/api/languages').catch()
      setLanguage(data.languages)
    })()
  }, [])

  return (
    <select
      onChange={changeHandler}
      name="languages"
      className={`rounded p-2 ${className}`}
    >
      {
        languages.map(language =>
          <option key={language} value={language}>{language}</option>
        )
      }
    </select>
  )
}

export default DropDown
