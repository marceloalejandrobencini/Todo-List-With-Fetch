import React from "react";

export function TodoItem({ title, completed, id, toggleTodo, deleteTodo }) {
  return (
    <li>
      <div style={{ textDecoration: completed ? "line-through" : "none" }}>
        {title}
      </div>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTodo(id)}
      />
      <button  className="btn btn-danger" onClick={() => deleteTodo(id)}>
        Eliminar
      </button>
    </li>
  );
}