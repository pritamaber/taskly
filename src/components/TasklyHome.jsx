// src/components/TasklyHome.jsx
import React, { useState } from "react";
import Header from "./Header";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import useTodos from "../hooks/useTodos";

const TasklyHome = () => {
  const { todos, addTodo, deleteTodo, updateTodo, toggleDone } = useTodos();
  const [editingId, setEditingId] = useState(null);

  const startEdit = (id) => setEditingId(id);
  const saveEdit = (id, newText) => {
    updateTodo(id, newText);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100">
      <Header />
      <main className="px-4 py-8">
        <TodoInput onAdd={addTodo} />
        <div className="mt-6 space-y-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onEdit={startEdit}
              onSave={saveEdit}
              isEditing={editingId === todo.id}
              onToggle={toggleDone}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default TasklyHome;
