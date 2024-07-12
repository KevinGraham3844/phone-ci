/* eslint-disable react/prop-types */

const Number = ({ person, deletePerson }) => {
    return (
      <li className="person">{person.name} {person.number}
      <button onClick={deletePerson} id={person.name}>delete</button>
      </li>
    )
  }


const Persons = ({ people, deletePersonOf }) => {
    return (
      <ul>
        {people.map(person =>
          <Number 
            key={person.id} 
            person={person}
            deletePerson={() => deletePersonOf(person.id)}  
          />
          )}
      </ul>
    )
  } 

  export default Persons