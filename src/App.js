import React, { useEffect, useState } from 'react'
import talkTo from './services/talkTo'

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

  const [ persons, setPersons ] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')

    // Populate initial Phonebook from server
  useEffect(() => {
    talkTo.getPeople().then(initialPersons => setPersons(initialPersons))
  }, [])

  
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
      // Add person to back end
    talkTo.addPeople(object).then(response => {
        // Merge to active hook Array
      setPersons(persons.concat(response))
        // Re-filter the content
      showPeople = doFilter(newFilter)
    })
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