/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import './index.css'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import Success from './components/Success'
import UpdateFail from './components/UpdateFail'
import personService from './services/persons'

const Header = ({ title }) => <h2>{title}</h2>

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [personSearch, setNewSearch] = useState('')
  const [foundPerson, setPerson]  = useState('')
  const [successMsg, setSuccessMsg] = useState(null)
  const [updateFailMsg, setUpdateFailMsg] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const checkExists = (newPerson) => {
    if (persons.filter(person => person.name === newPerson.name).length > 0) {
      if(window.confirm(
        `${newPerson.name} is already added to the phonebook, 
        replace the old number with a new one?`
        )) {
          const currentPerson = persons.find(person => person.name === newPerson.name)
          const changedPerson = { ...currentPerson, number: newPerson.number}
          personService
            .updatePerson(changedPerson.id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
              setNewName('')
              setNewNum('')
            })
            .catch(error => {
              setUpdateFailMsg(error.response.data.error)
              setTimeout(() => {
                setUpdateFailMsg(null)
              }, 5000)
            })
      }
      return true
    } else {
      return false
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    let failedCreate = false
    const personObj = {
      name: newName,
      number: newNum
    }
    if (!checkExists(personObj)) {
      personService
        .create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNum('')
        })
        .catch(error => {
          failedCreate = true
          setUpdateFailMsg(error.response.data.error)
          setTimeout(() => {
            setUpdateFailMsg(null)
          }, 5000)
          console.log(error.response.data.error)
          return
        })
        .then(() => {
          if (failedCreate === false) {
            setSuccessMsg(`Added ${personObj.name}`)
            setTimeout(() => {
              setSuccessMsg(null)
            }, 5000)
          }
        })
    }

    console.log('button clicked', event.target)
  }

  const filterSearch = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
    const searchedPerson = event.target.value.toLowerCase()
    const foundPerson = persons.filter(person => person.name.toLowerCase() === searchedPerson)
    if (foundPerson.length > 0) {
      setPerson(`${foundPerson[0].name } ${foundPerson[0].number}`)
    } else {
      setPerson('')
    }
    
  }

  const changeName = (event) => {
    setNewName(event.target.value)
  }

  const changeNum = (event) => {
    setNewNum(event.target.value)
  }

  const deletePersonOf = id => {
    console.log(`this will delete the person at id#: ${id}`)
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`delete ${personToDelete.name}`)) {
      personService
      .deletePerson(id)
      .then(() => {
        const personsCopy = [...persons]
        setPersons(personsCopy.filter(person => person.id !== id))
      })
    }
  }
  
  return (
    <div>
      <Header title="Phonebook"/>
      <UpdateFail message={updateFailMsg} />
      <Success message={successMsg} />
      <Filter value={personSearch} onChange={filterSearch} person={foundPerson}/>
      <Header title="add a new person"/>
      <Form onSubmit={addPerson} nameValue={newName} onChangeName={changeName} numValue={newNum} onChangeNum={changeNum}/>
      <Header title="Numbers"/>
      <Persons people={persons} deletePersonOf={deletePersonOf}/>
    </div>
  )
}

export default App