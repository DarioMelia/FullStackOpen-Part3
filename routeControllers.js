const {getPersonsDb} = require('./mongo/dbHandlers')

exports.home = (req,res) =>{res.send('<h1>Hello World</h1>')}

exports.info = (req,res) =>{
    getPersonsDb().then(persons =>{
        if(!persons)res.status(404).json({error:'No entries in Phonebook'})
        const numberOfPeople = persons.length
        const infoPage = `<h1>Phone Book has info for ${numberOfPeople} people</h1>
                        <h3>${new Date()}</h3>`
        res.send(infoPage)
    }).catch(err=>{
        console.error(err)
        res.status(500).json(err)
    })
    
}