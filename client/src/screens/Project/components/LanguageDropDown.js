import React, { useState, useEffect } from 'react'
import axios from 'axios'

function LanguageDropDown({ className, setLanguage, language }) {
  const [languagesList, setLanguagesList] = useState([])

  useEffect(() => {
    setLanguagesList([]);
    (async function () {
      const { data } = await axios.get('/api/languages').catch()
      const selectedLanguage = language || 'javascript'
      setLanguagesList(data.languages.sort((e1, e2) => {
        if (e1 === selectedLanguage) return -1
        if (e2 === selectedLanguage) return 1
        return 0
      }))
    })()
  }, [language])

  const handleChange = (e) => {
    setLanguage(e.target.value)
  }

  return (
    <select
      onChange={handleChange}
      name='language'
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
