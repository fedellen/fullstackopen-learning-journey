import React, { useState } from 'react'

const SubmissionForm = ({persons, addPerson}) => {

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
      addPerson(submitObject)
    }

    setNewName('')
    setNewNumber('')
  }

  return(
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
  )
}


const NameList = ({persons}) => (
  <div>
    {persons.map(name =>
      <div key={name.id} >
        {name.name} {name.number}
      </div>    
  )}
  </div>
)

const Filter = ({newFilter, handleFilter}) => (
  <div>
    filter show with name: <input value={newFilter} onChange={handleFilter}  />
  </div>
)

const App = () => {

  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',        number: "384-819-5555",   id: 0 },
    { name: 'Ada Lovelace',       number: '39-44-5323523',  id: 1 },
    { name: 'Dan Abramov',        number: '12-43-234345',   id: 2 },
    { name: 'Mary Poppendieck',   number: '39-23-6423122',  id: 3 }
  ]) 

  const [newFilter, setNewFilter] = useState('')


  const doFilter = (filterValue) => (
    persons.filter(el => el.name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1)
  )

  let showPeople = doFilter(newFilter)

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
    showPeople = doFilter(newFilter)
    console.log(showPeople);
  }

  const addPerson = (object) => {
    setPersons(persons.concat(object))
    showPeople = doFilter(newFilter)
    console.log(persons, showPeople);
  }  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      <h3>Add a new number:</h3>
      <SubmissionForm persons={persons} addPerson={addPerson} />
      <h2>Numbers</h2>
      <NameList persons={showPeople} />
    </div>
  )
}

export default App