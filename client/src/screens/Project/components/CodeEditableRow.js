import React from 'react'

function EditableRow({ code, idx, updateCode }) {

  const handleChange = (e) => {
    const newCodeText = e.currentTarget.textContent
    updateCode(idx, newCodeText)
  }

  return (
    <div contentEditable onInput={handleChange} suppressContentEditableWarning={true}>
      {code}
    </div>
  )
}

export default EditableRow