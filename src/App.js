import React, { useState } from 'react'

const App = () => {

  const [ persons, setPersons ] = useState([
    { 
      name: 'Arto Hellas',
      number: "384-819-5555",
      id: 0
    }
  ]) 

  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')

  const handleNumberSubmit = (event) => {
    setNewNumber(event.target.value)
  }

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
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(submitObject))
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName} >
        <div>
          name: <input value={newName} onChange={handleSubmit} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberSubmit} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(name =>
        <div key={name.id} >
          {name.name} {name.number}
        </div>    
      )}
    </div>
  )
}

export default App