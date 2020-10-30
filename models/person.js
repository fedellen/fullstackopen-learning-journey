const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {    
    console.log('Server is now connected to MongoDB')  
  })  
  .catch((error) => {    
    console.log('There was an error connecting to MongoDB:', error.message)  
  })
  
const personSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
    unique: true,
    minlength: 3 
  },
  number: { 
    type: String, 
    required: true,
    minlength: 8 
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)