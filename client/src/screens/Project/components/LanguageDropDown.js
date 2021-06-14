import React, { useState, useEffect } from 'react'
import axios from 'axios'

function LanguageDropDown({ className, setLanguage }) {
  const [languagesList, setLanguagesList] = useState([])

  useEffect(() => {
    (async function () {
      const { data } = await axios.get('/api/languages').catch()
      setLanguagesList(data.languages)
    })()
  }, [])

  const handleChange = (e) => {
    setLanguage(e.target.value)
  }

  return (
    <select
      onChange={handleChange}
      name="languages"
      className={`rounded p-2 ${className}`}
    >
      {
        languagesList.map(language =>
          <option key={language} value={language}>{language}</option>
        )
      }
    </select>
  )
}

export default LanguageDropDown
