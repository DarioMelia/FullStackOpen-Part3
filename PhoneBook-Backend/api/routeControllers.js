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

exports.addPerson = (req,res)=>{
    const{name,number} = req.body;
    if(!name){
        return res.status(404).json({
            error: "name missing"
        })
    }
    const newPerson = {
        id: Math.floor(Math.random() * (100000 - 4) + 4).toString(),
        name,
        number
    }
    persons = persons.concat(newPerson);
    updateJSON(persons);
    res.status(201).json(newPerson)
}



const updateJSON = (newPersons) =>{
    fs.writeFile("./persons.json", JSON.stringify(newPersons), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(newPersons));
        console.log('writing to ' + fileName);
      });
}
