// src/components/TodoItem.jsx
import React, { useState } from "react";

const TodoItem = ({ todo, onDelete, onEdit, onSave, isEditing, onToggle }) => {
  const [editedText, setEditedText] = useState(todo.text);

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center mb-2 max-w-xl mx-auto">
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={() => onToggle(todo.id, todo.isDone)}
          className="w-5 h-5 accent-purple-500"
        />
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="flex-1 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        ) : (
          <span
            className={`flex-1 ${
              todo.isDone ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="space-x-2 flex-shrink-0">
        {isEditing ? (
          <button
            onClick={() => onSave(todo.id, editedText)}
            className="text-green-500 hover:text-green-600"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => onEdit(todo.id)}
            className="text-blue-500 hover:text-blue-600"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
