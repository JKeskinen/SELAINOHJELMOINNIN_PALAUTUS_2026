import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'
import PersonForm from '../components/PersonForm'
import Persons from '../components/Persons'
import Filter from '../components/Filter'
import Notification from '../components/Notification'
import Footer from '../components/Footer'



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')  
  const [infoMessage, setInfoMessage] = useState(null)  //Notification.jsx viestin näyttäminen.

 
  
useEffect(() => {
  axios
    .get('http://localhost:3001/api/persons')
    .then(response => {
      console.log(response.data)
      console.log(Array.isArray(response.data.persons))
      setPersons(response.data)
    })
}, [])


  
  // Välittää 'handleDelete'-funktion 
  // 'deletePerson'-propsina Persons-komponentille
  const handleDelete = (id, name) => {
    console.log('DELETE:', id, name)
    if (window.confirm(`Delete ${name} ?`)){
      axios
      .delete(`http://localhost:3001/api/persons/${id}`)
      .then(() => {
         // Asetetaan viesti ja tyyppi keltaiseksi
        setInfoMessage({ text: `Deleted ${name}`, type: 'warning' });
        
        setTimeout(() => setInfoMessage(null), 5000);
        
        setPersons(persons.filter(p => p.id !== id))
      })
   
    }
  }


  const addPerson = (event) => {
    event.preventDefault()
    console.log("addPerson")

    const personObject = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(
      person => person.name === newName
    )

    if (existingPerson) {
      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one ?`
      )) {
        axios
          .put(
            `http://localhost:3001/api/persons/${existingPerson.id}`,
            personObject
          )
          .then(response => {
            setPersons(
              persons.map(person =>
                person.id === existingPerson.id
                  ? response.data
                  : person
              )
            )

            setNewName('')
            setNewNumber('')
          })
      }

      return
    }
    // Luodaan henkilöolio, jonka nimi ja puhelinnumero saadaan tilamuuttujista

      axios.post('http://localhost:3001/api/persons',personObject)
      .then(response => {
        setInfoMessage({ text: `Added ${response.data.name}`, type: 'ok'})
        setTimeout(() => setInfoMessage(null), 5000)
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        
      })
      
  }

 
  const handleNameChange = (event) => {
    setNewName(event.target.value)
    //console.log(event.target.value) 
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }
    const personToShow = searchTerm === ''
    ? persons 
    : persons.filter(person=> {
      const nameMatch  = person.name.toLowerCase().includes(searchTerm.toLowerCase())
      const numberMatch = person.number.includes(searchTerm)
      
      return(
         nameMatch || numberMatch)
    })
  console.log(persons)
  console.log(Array.isArray(persons))



    // lisätty Persons deletePerson={handleDelete}

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Notification 
        message={infoMessage?.text} 
        type={infoMessage?.type} 
      />

      <Filter
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />

      <h3>Add new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons
        persons={personToShow}
        deletePerson={handleDelete}
      />
      <Footer/>
    </div>
  )

}

export default App