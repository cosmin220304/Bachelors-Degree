//https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
import React, { useLayoutEffect, useState } from 'react'

export default function useWindowSize() {
  const [size, setSize] = useState([0, 0])
  const [isMobile, setIsMobile] = useState([0, 0])

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
      if (window.innerWidth < 768) {
        document.body.classList.remove('special_background')
        setIsMobile(true)
      }
      else {
        document.body.classList.add('special_background')
        setIsMobile(false)
      }
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return [isMobile, size.innerWidth, size.innerHeight]
}
