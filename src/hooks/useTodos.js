// src/hooks/useTodos.js
import { useEffect, useState } from "react";
import { databases, ID, Permission, Role } from "../appwrite/appwriteConfig";
import { useAuth } from "../context/AuthContext";

// ✅ Load from your .env file
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID_TODOS;

// ✅ Log missing config early
if (!DATABASE_ID || !COLLECTION_ID) {
  console.error("❌ Missing Appwrite config:", { DATABASE_ID, COLLECTION_ID });
}

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const { user } = useAuth();

  // ✅ Fetch todos for current user
  const fetchTodos = async () => {
    try {
      if (!user) return;

      const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);

      const userTodos = res.documents
        .filter((doc) => doc.$permissions.includes(`read("user:${user.$id}")`))
        .map((doc) => ({
          id: doc.$id,
          text: doc.text,
          isDone: doc.isDone,
        }));

      setTodos(userTodos);
    } catch (error) {
      console.error("❌ Fetch Error:", error);
    }
  };

  // ✅ Add new todo
  const addTodo = async (text) => {
    try {
      if (!user) return;

      const newDoc = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        { text, isDone: false },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );

      setTodos((prev) => [
        { id: newDoc.$id, text: newDoc.text, isDone: newDoc.isDone },
        ...prev,
      ]);
    } catch (error) {
      console.error("❌ Add Error:", error);
    }
  };

  // ✅ Delete todo
  const deleteTodo = async (id) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("❌ Delete Error:", error);
    }
  };

  // ✅ Update text of todo
  const updateTodo = async (id, newText) => {
    try {
      const updated = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id,
        { text: newText }
      );

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, text: updated.text } : todo
        )
      );
    } catch (error) {
      console.error("❌ Update Error:", error);
    }
  };

  // ✅ Toggle done/undone
  const toggleDone = async (id, currentState) => {
    try {
      const updated = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id,
        { isDone: !currentState }
      );

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, isDone: updated.isDone } : todo
        )
      );
    } catch (error) {
      console.error("❌ Toggle Error:", error);
    }
  };

  // ✅ Fetch todos when user logs in
  useEffect(() => {
    fetchTodos();
  }, [user]);

  return { todos, addTodo, deleteTodo, updateTodo, toggleDone };
};

export default useTodos;
