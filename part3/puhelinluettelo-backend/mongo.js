const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]


const url = `mongodb+srv://ponnisaku_db_user:${password}@cluster0.ztqrh8j.mongodb.net/phonebookApp?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, {family: 4})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (newName && newNumber) {

  const newPerson = new Person({
    name: newName,
    number: newNumber,
  })

  newPerson.save().then(result => {
    console.log(`Added ${newName} number ${newNumber} to phonebook`)
    
    mongoose.connection.close()
  })

  
}

else if (!newName && !newNumber) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })

    mongoose.connection.close()
  })
}

else {
  console.log('Invalid input parameters...')
}

/*
const person = new Person({
  name: 'Mango Master',
  number: 12345,
})

person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})

Person.find({}).then(result => {
  result.forEach(person => {
    console.log(person)
  })
  mongoose.connection.close()
})
*/
