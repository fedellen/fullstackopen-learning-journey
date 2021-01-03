import React from 'react'

const Note = ({ note, toggleImportanceOf }) => {

  const label = note.important
    ? 'Make Not Imporant' : 'Make Important'

  return(
    <li className='note' >
      <span>{note.content}</span>
      <button onClick={toggleImportanceOf} >{label}</button>
    </li>
  )
}

export default Note