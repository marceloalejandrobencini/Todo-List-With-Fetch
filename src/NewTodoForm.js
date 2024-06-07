import React, { useState } from "react";

export const NewTodoForm = ({ agregartodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    agregartodo(inputValue);
    setInputValue(''); 
  }; 

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Añadir nueva tarea"
      />
      <button type="submit" className="btn btn-success">Agregar</button>
    </form>
  );
};
