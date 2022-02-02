const fs = require('fs');
const fileName = '../persons.json';
let persons = require(fileName);

exports.getPersons = (req,res)=>{
    res.send(JSON.stringify(persons))
}
exports.getPerson = (req,res)=>{
    const person = persons.find(p => p.id === Number(req.params.id));
    if(!person)res.status(404).end()
    res.send(JSON.stringify(person))
}
exports.deletePersons = (req,res) => {
    const id = Number(req.params.id);
    persons = persons.filter(p => p.id !== id);
    updateJSON(persons);
    res.status(204).end()

}



const updateJSON = (newPersons) =>{
    fs.writeFile("./persons.json", JSON.stringify(newPersons), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(newPersons));
        console.log('writing to ' + fileName);
      });
}
