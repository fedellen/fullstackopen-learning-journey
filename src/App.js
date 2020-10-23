import React, { useState } from 'react'

const App = () => {

  const [ persons, setPersons ] = useState([
    { 
      name: 'Arto Hellas',
      id: 0
    }
  ]) 

  const [ newName, setNewName ] = useState('')

  const handleSubmit = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    if (persons.find(object => object['name'] === newName)) {

      alert(`${newName} is already in the phonebook`)

    } else {
      const submitObject = {
        name: newName,
        id: persons.length + 1
      }
      setPersons(persons.concat(submitObject))
    }

    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName} >
        <div>
          name: <input value={newName} onChange={handleSubmit} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(name =>
        <div key={name.id} >
          {name.name}
        </div>    
      )}
    </div>
  )
}

export default App