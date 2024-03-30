import React, { useState, useEffect } from 'react';
import './App.css';
import { NewTodoForm } from './NewTodoForm';
import { TodoList } from './TodoList';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = () => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/marcelobencini', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data) && data.length === 0) {
       
        console.log('No hay tareas.');
      } else if (Array.isArray(data)) {
        const tareasTransformadas = data.map(({ label, done, id }) => ({
          title: label, 
          completed: done, 
          id: id
        }));
        setTodos(tareasTransformadas);
      }
    })
    .catch(error => console.log(error));
  };

  const synctodos = (todosParaSincronizar) => {
    return fetch('https://playground.4geeks.com/apis/fake/todos/user/marcelobencini', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todosParaSincronizar.map(todo => ({ label: todo.title, done: todo.completed })))
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Falló la sincronización de las tareas');
      }
      return response.json();
    })
    .then(() => {
      cargarTareas(); 
    })
    .catch(error => console.error('Problemas con todo', error));
  };

  const agregartodo = (title) => {
    if (!title.trim()) return;
    
    const nuevoToDo = { title: title, completed: false };
    const todosActualizados = [...todos, nuevoToDo];
    synctodos(todosActualizados);
  };

  const toggleTodo = (id) => {
    const todosActualizados = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    synctodos(todosActualizados);
  };

  const deleteTodo = (id) => {
    const todosActualizados = todos.filter(todo => todo.id !== id);
    synctodos(todosActualizados);
  };

  const deleteAllTodo = () => {
    synctodos([]).then(() => {
      setTodos([]); 
    }).catch(error => {
      console.error('Error al borrar todas las tareas:', error);
    });
  };

  return (
    <>
      <NewTodoForm agregartodo={agregartodo} />
      <h1 className='header'>Lista de Tareas:</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <button className='borrar-todo' onClick={deleteAllTodo}>
        Borrar todas las Tareas
      </button>
    </>
  );
};

export default App;
