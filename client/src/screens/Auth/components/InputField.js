import React from 'react'

function InputField({ error, name, changeHandler }) {
  if (error) {
    return (
      <div>
        <div>{name}</div>
        <input
          type="text"
          name={name}
          label={name}
          className='ring-1 ring-red-500 p-2 rounded-sm'
          onChange={changeHandler}
        />
        <div className='text-red-500'> {name} is required! </div>
      </div>
    )
  }

  return (
    <div>
      <div>{name}</div>
      <input
        name={name}
        label={name}
        placeholder={name}
        className='ring-1 ring-gray-300 p-2 rounded-sm'
        onChange={changeHandler}
      />
    </div>
  )
}

export default InputField
