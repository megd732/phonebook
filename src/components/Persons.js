import React from 'react'
import personService from '../services/persons'

const Persons = ({people, filter, handleRemove}) => {

    return (
        <ul>
          {people
            .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
            .map(person => 
            <li key={person.id} className='person'>{person.name} {person.number} <button onClick={() => handleRemove(person.id)}>delete</button></li>)
          }
        </ul>
    )
}

export default Persons