import React from "react";
const Form = ({ onSubmit, onChange, newName, newNum }) => (
  <form onSubmit={onSubmit}>
    <div>
      <Input label="name" type="text" onChange={onChange} value={newName} />
      <br />
      <Input label="number" type="number" onChange={onChange} value={newNum} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);
const Input = ({ label, type, onChange, value }) => {
  return (
    <>
      {label}: <input type={type} onChange={onChange} value={value} />
    </>
  );
};

export default Form;
