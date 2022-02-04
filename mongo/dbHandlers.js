const Person = require("./models/person");

exports.getPersonsDb = () =>{
    return Person.find({}).then(result => result);
}

exports.getPersonDb = id =>{
    return Person.findById(id).then(person => person);
}

exports.addPersonDb = ({name,number}) =>{
   const newPerson = new Person({
       name,
       number
   })
   return newPerson.save().then(person=>person)
}

exports.deletePersonDb = id =>{
    return Person.findByIdAndDelete(id).then(res => res)
}