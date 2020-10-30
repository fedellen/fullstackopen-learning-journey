import React, { useEffect, useState } from 'react'
import talkTo from './services/talkTo'
import Notification from './components/Notification'
import Person from './components/Person'

const SubmissionForm = ({ persons, addPerson, setPersons, sendNotif }) => {

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

    
    /*
    /* Removed feature in latest production build
    /*
    const existingPerson = persons.find( object => object['name'] === newName )

    if (existingPerson) {

      const message = `${newName} is already in the phonebook. Would you like to replace the old number with the new one?`

      if (window.confirm(message)) {
        talkTo.updatePeople(existingPerson.id, newPerson).then(response => {
          setPersons(persons.map(person => person.id !== existingPerson.id
            ? person
            : response
          ))
          sendNotif(`Updated number for ${newName}`, 'green')
        })
        .catch(error => {
          sendNotif(`Information for ${newName} has already been removed from the server.`, 'red')
          setPersons(persons.filter(n => n.id !== existingPerson.id))
        })
      }      
    } else {
      addPerson(newPerson)
    }
    */

    addPerson(newPerson)
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




const Filter = ({newFilter, handleFilter}) => (
  <div>
    filter show with name: <input value={newFilter} onChange={handleFilter}  />
  </div>
)

const App = () => {

  const [ persons, setPersons ] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')
  const [ alertMessage, setAlertMessage ] = useState(null)
  const [ messageColor, setMessageColor ] = useState('green')

    // Use Notification Component
  const message = (text, color) => {
    setMessageColor(color)
    setAlertMessage(text)
    setTimeout(() => setAlertMessage(null), 5000)
  }

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
      setPersons(persons.concat(response))
      showPeople = doFilter(newFilter) // Re-filter the content
      message(`added ${object.name} to the Phonebook`, 'green')
    })
  }  

  

  const handleDelete = id => {

      // Get the person
    const person = persons.find(n => n.id === id)
    const confirmMessage = `Are you sure you want to Delete ${person.name} from the Phonebook?`

      // Await browser confirmation
    if (window.confirm(confirmMessage)) {
      talkTo.deletePeople(id).then(response => {
        if (response.status === 204) {
          setPersons(persons.filter(i => i !== person))
          message(`${person.name} has been deleted from the Phonebook`, 'green')
        } else {
          message('Person could not be deleted.', 'red')
        }
      })
    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={alertMessage} color={messageColor} />
      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      <h3>Add a new number:</h3>
      <SubmissionForm persons={persons} addPerson={addPerson} setPersons={setPersons} sendNotif={message} />
      <h2>Numbers</h2>
      {showPeople.map((person, i) =>
        <Person
          key={i} 
          person={person}
          handleDelete={() => handleDelete(person.id)}
        />
      )}
    </div>
  )
}

export default App