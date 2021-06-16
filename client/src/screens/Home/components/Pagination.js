import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Pagination({ className, prevPage, pageNumber, nextPage }) {
  return (
    <div className={`${className} text-green-700 flex flex-wrap justify-center items-center gap-4 `}>
      <div onClick={prevPage} className='bg-green-100 text-center rounded-xl p-2 pr-16 shadow cursor-pointer'>
        <FontAwesomeIcon icon='caret-left' size='2x' />
      </div>
      <div className='text-black text-lg'>
        page {pageNumber + 1}
      </div>
      <div onClick={nextPage} className='bg-green-100 text-center rounded-xl p-2 pl-16 shadow cursor-pointer'>
        <FontAwesomeIcon icon='caret-right' size='2x' />
      </div>
    </div>
  )
}

export default Pagination
