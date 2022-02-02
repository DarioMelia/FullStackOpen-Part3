let persons = require("./persons.json");

exports.getPersons = (req,res)=>{
    res.send(persons)
}