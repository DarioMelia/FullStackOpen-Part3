
const db = require("../mongo/dbHandlers");

let persons
exports.getPersons = (req,res)=>{
    db.getPersonsDb().then(result => {
        res.send(JSON.stringify(result))
    }).catch(err =>{
        console.error(err)
        res.status(500).json(err)
    })
}
exports.getPerson = (req,res,next)=>{
    const id = req.params.id;
    db.getPersonDb(id).then(person =>{
        if(!person)res.status(404).end()
        res.send(JSON.stringify(person))
    }).catch(err=>next(err))
}
exports.deletePersons = (req,res,next) => {
    const id = req.params.id;
    db.deletePersonDb(id).then(delPerson =>{
        console.log(`${delPerson.name} was deleted from phonebook`)
        res.status(204).json(delPerson)
    }).catch(err => next(err))   
}

exports.addPerson = (req,res,next)=>{
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
    nameExists(name).then(exists =>{
        if(exists){
            return res.status(409).json({
                error: "Name already exists"
            })
        }

    const newPerson = {name,number}
    
    db.addPersonDb(newPerson).then(person =>{
        res.status(201).json(person)
    }).catch(err=>next(err));
    })
   
    
    
}

exports.updatePerson=(req,res,next)=>{
    const id = req.params.id;
    const {name,number} = req.body;
    db.updatePersonDb(id,{name,number}).then(updatedPerson => {
        if(!updatedPerson)res.status(404).json({err:"Could'nt find the person"})
        res.status(200).json(updatedPerson)
    }).catch(err=>next(err))
}



// %%%%%%%%% HELPER FUNCTIONS %%%%%%%%%%%%%%

const nameExists = name =>{
    return db.findPersonByNameDb(name).then(person =>person).then(person =>{
        console.log("person:", person)
        if(person.length>0) return true
        return false
    })
    
}
