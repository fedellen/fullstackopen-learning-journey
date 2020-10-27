import React, { useEffect, useState } from 'react'
import talkTo from './services/talkTo'

const SubmissionForm = ({persons, addPerson, setPersons}) => {

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

    const newPerson = { name: newName, number: newNumber }
    const existingPerson = persons.find( object => object['name'] === newName )

    if (existingPerson) {

      const message = `${newName} is already in the phonebook. Would you like to replace the old number with the new one?`

      if (window.confirm(message)) {
        talkTo.updatePeople(existingPerson.id, newPerson).then(response => {
          console.log(response)
          setPersons(persons.map(person => person.id !== existingPerson.id
            ? person
            : response
          ))
        })
      }      
    } else {
      addPerson(newPerson)
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


const Name = ({ person, handleDelete }) => (

  <div>
    <div>
      <div>Name: {person.name}</div>
      <div>Number: {person.number}</div>
      <button onClick={handleDelete}>Delete Person</button> 
      <br /><br />
    </div>
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

  

  const handleDelete = id => {

      // Get the person
    const person = persons.find(n => n.id === id)
    const confirmMessage = `Are you sure you want to Delete ${person.name} from the Phonebook?`

      // Await browser confirmation
    if (window.confirm(confirmMessage)) {
      talkTo.deletePeople(id).then(response => {
        response.status === 200 // Success status response code
          ? setPersons(persons.filter(i => i !== person))
          : alert('Person could not be deleted.')
      })
    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      <h3>Add a new number:</h3>
      <SubmissionForm persons={persons} addPerson={addPerson} setPersons={setPersons} />
      <h2>Numbers</h2>
      {showPeople.map((person, i) =>
        <Name
          key={i} 
          person={person}
          handleDelete={() => handleDelete(person.id)}
        />
      )}
    </div>
  )
}

export default App