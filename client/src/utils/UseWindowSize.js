//inspired by
//https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
import { useLayoutEffect, useState } from 'react'

export default function useWindowSize() {
  const [size, setSize] = useState([0, 0])
  const [isMobile, setIsMove] = useState(false)

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
      setIsMove(window.innerWidth < 768)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return {
    size,
    isMobile
  }
}