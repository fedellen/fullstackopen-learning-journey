import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, UPDATE_BORN } from '../queries'

const SetBirthYear = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateBorn] = useMutation(UPDATE_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = (e) => {
    e.preventDefault()

    updateBorn({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
            placeholder='Author Name'
          />
        </div>
        <div>
          <input
            value={born}
            type='number'
            onChange={({ target }) => setBorn(parseInt(target.value))}
            placeholder='Birth Year'
          />
        </div>
        <button type='submit'>set birth year</button>
      </form>
    </div>
  )
}

export default SetBirthYear
