import React, { useState, useRef, useEffect } from 'react'
import CanvasDraw from 'react-canvas-draw'
import axios from 'axios'
import html2canvas from 'html2canvas'
import Submit from '../components/Submit'
import LanguageDropDown from '../components/LanguageDropDown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from '../../../components/Loader/Loader'

function DrawView({ className, setCode, language, setLanguage }) {
  const [loading, setLoading] = useState(false)
  let canvas = useRef()

  const keyboardListener = ((event) => {
    if (event.ctrlKey && event.key === 'z') {
      undo()
    }
  })

  useEffect(() => {
    document.addEventListener('keydown', keyboardListener, false)
    return () => {
      document.removeEventListener('keydown', keyboardListener, false)
    }
  }, [])

  const undo = () => {
    canvas.undo()
  }

  const clear = () => {
    canvas.clear()
  }

  const submit = () => {
    if (loading) {
      alert('Wait for task to finish loading!')
      return
    }

    html2canvas(canvas.canvasContainer).then(async (canvas) => {
      const base64Image = canvas.toDataURL('image/jpeg')
      setLoading(true)

      try {
        const headers = {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.J17JYU9weVb9fVBqmhS5JZjEdzgjOAvz-21uuO7Eg4w',
          'Content-Type': 'application/json'
        }
        // const { data } = await axios.post('/api/recognize', { language, base64Image }, { headers })
        //todo: remove ^
        await new Promise(r => setTimeout(r, 5 * 1000))
        const data = { code: 'console.log("draw")' }
        setCode(prev => (prev + '\n' + data.code).trim())
      } catch (err) {
        console.log(err)
        alert('request failed, try again in 2 minutes!')
      }

      setLoading(false)
    })
  }

  return (
    <div className={className + ' relative'}>
      <Loader isVisible={loading} className='absolute inset-center z-50' />

      <div className='h-96'>
        <CanvasDraw
          style={{ border: '2px solid black', backgroundColor: 'white' }}
          ref={canvasDraw => (canvas = canvasDraw)}
          onChange={null}
          brushRadius={2}
          brushColor={'#444'}
          lazyRadius={0}
          hideGrid={true}
          canvasWidth={'100%'}
          canvasHeight={'100%'}
          disabled={false}
          imgSrc={''}
          saveData={null}
          immediateLoading={true}
          hideInterface={true}
          className='h-screen'
        />
      </div>

      <div className='w-full mt-2 flex p-2 pt-0 pb-0 gap-8 items-center'>
        <LanguageDropDown className='flex-1' language={language} setLanguage={setLanguage} />
        <div className='text-white cursor-pointer hover:text-gray-400' onClick={clear}>
          <FontAwesomeIcon icon='undo' size='2x' />
        </div>
        <div className='text-white cursor-pointer pr-2 hover:text-gray-400' onClick={clear}>
          <FontAwesomeIcon icon='trash-alt' size='2x' />
        </div>
      </div>

      <Submit onClick={submit} text='Convert into text!' />
    </div>
  )
}

export default DrawView
