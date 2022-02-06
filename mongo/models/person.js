require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL).then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
})

const personSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true,
      minlength:[3,'Name has to be at least 3 characters long, got "{VALUE}"']
    },
    number:{
      type:String,
      validate: {
        validator: function(v) {
          return /\d{2,3}-\d{5,}/.test(v)
        },
        message: props => `${props.value} is not a valid phone number!`
      },
      minlength:[8,'Number has to be at least 8 nums long.']
    }  
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', personSchema)