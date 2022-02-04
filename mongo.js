const mongoose = require('mongoose')
const [nodeDir,currentDir,password,name,number] = process.argv;


if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const url = `mongodb+srv://DarioMelia:${password}@fullstackopen-dbs.yfgvb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name:String,
    number:String   
})
const Person = mongoose.model("Person", personSchema);

if(name){
    if(!number){
        console.log("Please enter a number after the name")
        mongoose.connection.close()
        return
    };
    const newPerson = new Person({name,number});
    newPerson.save().then(result =>{ 
        console.log(`Added ${name} with number: ${number} to phonebook`)
        mongoose.connection.close()
        return
    }).catch(err => console.log(err));
    if(!number)console.log("Please enter a number after the name");
}else{
    Person.find({}).then(result => {
        console.log("Phonebook:");
        result.forEach(({name,number}) => console.log(name,number))
        mongoose.connection.close()
        return
    }).catch(err => console.log(err))
}


