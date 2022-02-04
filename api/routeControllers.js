
const dbHandlers = require("../mongo/dbHandlers");
let persons;

exports.getPersons = (req,res)=>{
    dbHandlers.getPersonsDb().then(result => {
        persons = [...result];
        res.send(JSON.stringify(result))
    })
}
exports.getPerson = (req,res)=>{
    const id = req.params.id;
    dbHandlers.getPersonDb(id).then(person =>{
        if(!person)res.status(404).end()
        res.send(JSON.stringify(person))
    })
}
exports.deletePersons = (req,res) => {
    const id = req.params.id;
    dbHandlers.deletePersonDb(id).then(delPerson =>{
        console.log(`${delPerson.name} was deleted from phonebook`)
        res.status(204).end()
    }).catch(err => {
        console.log(err);
        res.status(404).end()
    })
    
}

exports.addPerson = (req,res)=>{
    const{name,number} = req.body;
    if(!name){
        return res.status(404).json({
            error: "Name missing"
        })
    }
    if(!number){
        return res.status(404).json({
            error: "Number missing"
        })
    }
    if(nameExists(name)){
        return res.status(409).json({
            error: "Name already exists"
        })
    }
    const newPerson = {name,number}
    
    dbHandlers.addPersonDb(newPerson).then(person =>{
        persons = persons.concat(person);
        res.status(201).json(person)
    });
    
}



// %%%%%%%%% HELPER FUNCTIONS %%%%%%%%%%%%%%

const nameExists = name =>{
    if(persons.find(p=>p.name === name)) return true
    return false
}
