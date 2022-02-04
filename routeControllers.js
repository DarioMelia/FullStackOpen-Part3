const persons = require("./persons.json");

exports.home = (req,res) =>{res.send("<h1>Hello World</h1>")}

exports.info = (req,res) =>{
    const numberOfPeople = persons.length;
    const infoPage = `<h1>Phone Book has info for ${numberOfPeople} people</h1>
                    <h3>${new Date()}</h3>`
    res.send(infoPage)
}