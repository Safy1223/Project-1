import { createContext } from "react";
import { useState } from "react";
export const TodosContext = createContext({});
export const TodosProvider = ({ children }) => {
  const [arrayTodo, setArrayTodo] = useState([]);
  const [allTodos, setAllTodos] = useState([]);
  return (
    <TodosContext.Provider
      value={{ arrayTodo, setArrayTodo, allTodos, setAllTodos }}
    >
      {children}
    </TodosContext.Provider>
  );
};
