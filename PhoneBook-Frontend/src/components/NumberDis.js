import React from "react";
const NumbersDis = ({ persons, filter, onFilterChange,delEntryOf }) => {
  const gnrtNums = () =>
    persons.map((person) => <NumberItm key={person.name} person={person} delEntry={delEntryOf} />);

  return (
    <>
      <h2>Numbers</h2>
      <Filter
        type={"name"}
        filter={filter}
        onFilterChange={onFilterChange}
      ></Filter>
      {gnrtNums()}
    </>
  );
};
const NumberItm = ({ person,delEntry }) => (
  <p>
    {person.name} {person.number} <button onClick={() => delEntry(person.id)}>delete</button>
  </p>
);
const Filter = ({ type, filter, onFilterChange }) => (
  <>
    filter by {type}: <input value={filter} onChange={onFilterChange} />
  </>
);

export default NumbersDis;
