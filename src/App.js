import React, {useState, useEffect} from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorStyle, setErrorStyle] = useState('errorBad')


  // GET 
  useEffect(() => {
    personService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleRemove = (id) => {
    if(window.confirm(`are you sure you want to delete this person?`)) {
      personService
        .remove(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
        .catch(error => {
          setErrorMessage(`person ${persons.find(id)} has already been removed from the server`)
          setErrorStyle = 'errorBad'
          setTimeout(() => {setErrorMessage(null)}, 5000)
          setPersons(persons.filter(n => n.id !== id))
        })
        // doesn't re-render after deleting, but it does delete correctly.
    } else {
      return
    }
      
  }

  const addPerson = (event) => {
    event.preventDefault() // prevent default action (reloading of page)

    // check if they are already (in the array
    if (persons.find(person => person.name === newName)) {
      if(window.confirm(`${newName} is already added to the phonebook, do you want to replace them?`)) {
        // TRUE, so replace with personService.update()
        const currentPerson = persons.find(person => person.name === newName)

        const personObject = {
          name: newName,
          number: newNumber
        }
        personService
          .update(currentPerson.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== currentPerson.id ? person : returnedPerson))
          })
          .catch(error => {
            setErrorMessage(`person ${personObject.name} has preemptively been removed from the server, oopsies`)
            setErrorStyle('errorBad')
            setPersons(persons.filter(n => n.id !== currentPerson.id))
            setNewName('')
            setNewNumber('')
            setTimeout(() => {setErrorMessage(null)}, 5000)
          })
        return
      } else {
        return
      }
    }
    // they aren't, so continue
    const personObject = {
      name: newName,
      number: newNumber
      // not necessary to hard code an ID for some reason
    }
    // POST
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))

        setErrorMessage(`${returnedPerson.name} was added to phone book`)
        setErrorStyle('errorGood')
        setTimeout(() => {setErrorMessage(null)}, 5000) // so it just shows for a bit

        setNewName('')
        setNewNumber('')
      })

  }

  return (
    <div>
      <h2>phonebook</h2>
      <Notification message={errorMessage} style={errorStyle} />
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h2>add a new numero</h2>´
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
                  newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons people={persons} filter={search} handleRemove={handleRemove}/>
    </div>
  )
}

export default App