import { useState, useEffect } from 'react'
import contactService from './services/contacts'
import Notification from './services/Notification'

const Filter = ({ nameFilter, handleFilterChange }) => (
  <div>
    filter shown with
    <input value={nameFilter} onChange={handleFilterChange} />
  </div>
)

const ContactAdder = ({addNewContact, newName, newNumber, handleNameChange, handleNumberChange}) => (
  <div>
    <h2>add a new</h2>
    <form onSubmit={addNewContact}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
        <br />
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>
)

const ContactList = ({personsToShow, deleteContact}) => (
  <div>
    <h2>Numbers</h2>
    {personsToShow.map( person =>
      <div key={person.number}>
        {person.name} {person.number} -
        <button onClick={deleteContact(person.number)}>delete</button>
      </div>
    )}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationIsGood, setNotificationIsGood] = useState(true)

  useEffect(() => {
    contactService.getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const showNotification = (message, isGood, duration = 3.0) => {
    setNotificationMessage(message)
    setNotificationIsGood(isGood)
    setTimeout(() => {
      setNotificationMessage('')
    }, duration*1000)
  }

  const addNewContact = (event) => {
    event.preventDefault()

    const newPerson = { name: newName, number: newNumber, id: newNumber }
    const numberExists = persons.some(person => person.number === newNumber)

    if (numberExists) {
      const currentPerson = persons.find(p => p.number === newNumber)

      if (window.confirm(`Are you sure you want to replace ${currentPerson.name}`)) {
        contactService.update(newNumber, newPerson)
          .then(newPerson => {
            setPersons(persons.map(person => person.number !== newNumber ? person : newPerson))
            setNewName('')
            setNewNumber('')
            showNotification(`Replaced ${currentPerson.name} with ${newPerson.name}`, true)
          })
          .catch(error => {
            console.log(error.response.data)
            showNotification(error.response.data.error, false)
            setPersons(persons.filter(person => person !== currentPerson))
          })
      }
      return
    }

    contactService
      .create(newPerson)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${newPerson.name}`, true)
      })
      .catch(error => {
        console.log(error.response.data)
        showNotification(error.response.data.error, false)
      })
  }

  const deleteContact = number => () => {
    const personToDelete = persons.find(person => person.number === number)
    if (window.confirm(`Are you sure you want to delete ${personToDelete.name}?`)) {
      contactService.remove(number)
        .then(() => {
          setPersons(persons.filter(person => person !== personToDelete))
          showNotification(`Removed ${personToDelete.name}`, true)
        })
        .catch(error => {
          console.log(error.response.data)
          showNotification(error.response.data.error, false)
        })
    }  
  }

  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleFilterChange = event => setNameFilter(event.target.value)

  const personsToShow = persons.filter( person => person.name.includes(nameFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage}
        isGood={notificationIsGood}
        />
      <Filter
        nameFilter={nameFilter}
        handleFilterChange={handleFilterChange}
        />
      <ContactAdder
        addNewContact={addNewContact}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        />
      <ContactList
        personsToShow={personsToShow}
        deleteContact={deleteContact}
        />
      <div>debug: {newName}</div>
    </div>
  )

}

export default App