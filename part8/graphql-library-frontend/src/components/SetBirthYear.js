import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, UPDATE_BORN } from '../queries'
import Select from 'react-select'

const SetBirthYear = ({ authors }) => {
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  const [updateBorn] = useMutation(UPDATE_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!authors) {
    return null
  }

  const options = authors.map((a) => {
    return {
      value: a.name,
      label: a.name
    }
  })

  const submit = (e) => {
    e.preventDefault()
    const name = selectedOption.value

    updateBorn({ variables: { name, born } })

    setBorn('')
  }

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <Select
            options={options}
            onChange={setSelectedOption}
            defaultValue={selectedOption}
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
