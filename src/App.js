import React, {useState} from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'meg davis', id: 1, number: '732-672-9280'},
    {name: 'grep', id: 2, number: '666-666-6666'},
    {name: 'malcolm', id: 3, number: '440-idk-loll'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setPersonsToShow(persons.filter(person => person.name.includes(event.target.value)))
  }

  const addPerson = (event) => {
    event.preventDefault()

    // check if they are already in the array
    if (persons.find(element => element.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      return 
    }

    // they aren't, so continue
    const personObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber
    }
    // also want to add them to the personsToShow if they fulfill search metric
    if(personObject.name.includes(search)) {
      setPersonsToShow(personsToShow.concat(personObject))
      setPersons(persons.concat(personObject))
    } else {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>phonebook</h2>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h2>add a new numero</h2>´
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
                  newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons people={personsToShow} />
    </div>
  )
}

export default App