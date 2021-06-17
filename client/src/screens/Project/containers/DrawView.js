import React, { useState, useRef, useEffect, useContext } from 'react'
import CanvasDraw from 'react-canvas-draw'
import axios from 'axios'
import Tesseract from 'tesseract.js'
import html2canvas from 'html2canvas'
import Submit from '../components/Submit'
import LanguageDropDown from '../../../components/LanguageDropDown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from '../../../components/Loader/Loader'
import { UserContext } from '../../../utils/UseUserContext'
import DragPoint from '../components/DragPoint'

function DrawView({ className, setCode, language, setLanguage }) {
  let canvas = useRef()
  const [loading, setLoading] = useState(false)
  const [user,] = useContext(UserContext)

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
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
        const { data } = await axios.post('/api/recognize', { language, base64Image }, { headers })
        setCode(prev => (prev + '\n' + data.code).trim())
        setLoading(false)

      } catch (err) {
        console.log(err)
        alert('request to server failed, will try to use a local solution')
        recognizeOffline(base64Image)
      }
    })
  }

  const recognizeOffline = async (base64Image) => {
    try {
      const worker = Tesseract.createWorker({
        langPath: '../../../utils/tesseract/lang',
      });
      await worker.load();
      await worker.loadLanguage('eng')
      await worker.initialize('eng')
      const { data: { text } } = await worker.recognize(base64Image);
      await worker.terminate();
      setCode(prev => (prev + '\n' + text.toLowerCase()).trim())

    } catch (err) {
      console.log(err)
      alert('some error occured, please try again!')

    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <DragPoint className='absolute right-0 top-2/4 transform translate-y z-50 md:hidden' />

      <div className={className + ' relative md:w-6/12'}>
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
          <div className='text-white cursor-pointer hover:text-gray-400' onClick={undo}>
            <FontAwesomeIcon icon='undo' size='2x' />
          </div>
          <div className='text-white cursor-pointer pr-2 hover:text-gray-400' onClick={clear}>
            <FontAwesomeIcon icon='trash-alt' size='2x' />
          </div>
        </div>

        <Submit onClick={submit} text='Convert into text!' />
      </div>
    </>
  )
}

export default DrawView
