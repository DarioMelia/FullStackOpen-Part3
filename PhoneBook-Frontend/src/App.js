import React, { useState, useEffect} from "react";
import "./index.css";

// %%% API %%%
import perServ from "./services/persons";

// %%% COMPONENTS %%%
import Form from "./components/Form";
import NumbersDis from "./components/NumberDis";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filter, setFilter] = useState("");
  const [notMsg, setNotMsg] = useState(null);
  const [isErr, setIsErr] = useState(false);
  
  useEffect(getPeople, []);
  

  let numsToShow = persons.filter((num) =>
    num.name.toLowerCase().includes(filter.toLowerCase())
  );

  // %% EVENT HANDLERS %%
  const onChange = (e) =>
    e.target.getAttribute("data-type") === "text"
      ? setNewName(e.target.value)
      : setNewNum(e.target.value);

  const onFilterChange = (e) => setFilter(e.target.value);

  const onSubmit = async(e) => {
    e.preventDefault();
    nameExists().then(exists=>{
      exists? changeNumber() : createNewPerson();
    }).catch(err=>{
      console.error(err)
          setIsErr(true)
          setNotMsg(`Person was already added from somewhere else`)
          resetNot()
    }) 
  };
  
  const delEntryOf = (id) => {
    const objToDel = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${objToDel.name}?`)) {
      perServ
        .deleteEntry(id)
        .then((res) => {
          setIsErr(false)
          setNotMsg(`"${objToDel.name}" was succesfully deleted from server`)
          resetNot()
          setPersons(persons.filter((p) => p.id !== id))})
        .catch((err) => {
          console.log(err)
          setIsErr(true)
          setPersons(persons.filter((p) => p.id !== id))
          setNotMsg(`Information of ${objToDel.name} has already been removed from server`)
          resetNot()
        });
    }
  };

  // %% HELPER FUNCS %%
  function getPeople() {
    perServ
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
      .catch((err) => console.log(err));
  }
  function createNewPerson() {
    const newObj = { name: newName, number: newNum };
    perServ
      .create(newObj)
      .then((returnedObj) => {
        setPersons(persons.concat(returnedObj));
        resetInputs();
        setIsErr(false)
        setNotMsg(`Added ${returnedObj.name}`)
        resetNot();
      })
      .catch((err) => {
        console.log(err)
        setIsErr(true)
        setNotMsg(err.response.data.error)
        resetNot();
      });
  }
  function changeNumber() {
    const currentPerson = persons.find((p) => p.name.toLowerCase() === newName.toLowerCase());
    const changeYes = window.confirm(`${currentPerson.name} is already added to the phone book, replace the old number with a newOne?`);
    const updated = { ...currentPerson, number: newNum };
    if (changeYes) {
      perServ
        .update(updated, currentPerson.id)
        .then((returnObj) =>{
          setPersons(persons.map((p) => (p.id === returnObj.id ? returnObj : p)))
          setIsErr(false)
          setNotMsg(`Updated ${returnObj.name}'s number`);
          resetNot();
          resetInputs();
        })
        .catch((err) =>{
          console.log(err)
          setIsErr(true)
          setNotMsg(err.response.data.error)
          resetNot();
        })
    }
    
  }

  function resetInputs() {
    setNewName("");
    setNewNum("");
  }
  function resetNot(){
    setTimeout(()=>setNotMsg(null),5000)
  }

  const nameExists = () => {
    return perServ.getAll().then(persons =>{
      setPersons(persons)
      return persons.find((el) => el.name.toLowerCase() === newName.toLowerCase())
    })
     };

  // %% RETURN JSX %%
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={notMsg} isErr={isErr}/>
      <Form
        onSubmit={onSubmit}
        onChange={onChange}
        newName={newName}
        newNum={newNum}
      />
      <NumbersDis
        persons={numsToShow}
        filter={filter}
        onFilterChange={onFilterChange}
        delEntryOf={delEntryOf}
      />
    </div>
  );
};

export default App;
