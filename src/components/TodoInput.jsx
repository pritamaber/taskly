// src/components/TodoInput.jsx
import React, { useState } from "react";

// Component for input field and add button
const TodoInput = ({ onAdd }) => {
  const [todo, setTodo] = useState(""); // State to store current input

  // Handle the Add button click
  const handleAdd = () => {
    if (todo.trim() !== "") {
      onAdd(todo.trim()); // Send todo to parent
      setTodo(""); // Clear input field
    }
  };

  return (
    <div className="flex items-center gap-3 mt-6 max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Add a new task..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="flex-1 px-4 py-2 rounded-xl shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
      <button
        onClick={handleAdd}
        className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl transition shadow-md"
      >
        Add
      </button>
    </div>
  );
};

export default TodoInput;
