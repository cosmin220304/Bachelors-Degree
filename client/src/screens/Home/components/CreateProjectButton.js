import React from 'react'
import { Link } from 'react-router-dom'

function CreateProjectButton({ className }) {
  return (
    <Link to='/project' className={className}>
      <svg width='94' height='94' viewBox='0 0 94 94' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g filter='url(#filter0_d)'>
          <circle cx='47' cy='43' r='43' fill='#DB324D' />
          <path d='M47 19.4193V66.5806' stroke='#A62639' stroke-width='10' />
          <path d='M23.4194 43L70.5807 43' stroke='#A62639' stroke-width='10' />
        </g>
        <defs>
          <filter id='filter0_d' x='0' y='0' width='94' height='94' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'>
            <feFlood flood-opacity='0' result='BackgroundImageFix' />
            <feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' />
            <feOffset dy='4' />
            <feGaussianBlur stdDeviation='2' />
            <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
            <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow' />
            <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow' result='shape' />
          </filter>
        </defs>
      </svg>
    </Link>
  )
}

export default CreateProjectButton
