let persons = require("../persons.json");

exports.getPersons = (req,res)=>{
    res.send(JSON.stringify(persons))
}
exports.getPerson = (req,res)=>{
    const person = persons.find(p => p.id === Number(req.params.id));
    res.send(JSON.stringify(person))
}