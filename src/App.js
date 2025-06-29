import "./App.css";
import { Route, Router, Link, Routes, useLocation } from "react-router-dom";
import Login from "./Page/Login";
import Sign from "./Page/Sign Up";
import SideNavigation from "./Page/SideNavigation";
import Profile from "./Page/Profile";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProtectedRouter from "./Page/ProtectedRouter";
import ResetPassword from "./Page/ResetPassword";
import TodoList from "./Page/TodoList";
import AboutThat from "./Page/AboutThat";
import { TodosContext, TodosProvider } from "./context/TodoContext";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./config/supabaseClient";
const theme = createTheme({
  palette: {
    primary: {
      main: "#4dabf5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

function App() {
  const location = useLocation();
  const Navigate = useNavigate();
  const { setAllTodos, setArrayTodo } = useContext(TodosContext);
  /// ===== Read Table===///
  useEffect(() => {
    const readData = async () => {
      const { data: Todos, error } = await supabase.from("Todos").select("*");

      if (error) {
        alert(error.message);
      } else {
        setArrayTodo(Todos);
        setAllTodos(Todos);
        if (!location.pathname.includes("resetPassword")) {
          Navigate("/TodoList");
        }
      }
    };
    console.log(setArrayTodo);
    readData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/SignUp" element={<Sign />} />

          <Route
            path="/"
            element={
              <ProtectedRouter>
                <SideNavigation />
              </ProtectedRouter>
            }
          >
            <Route
              path="profile"
              element={
                <ProtectedRouter>
                  <Profile />
                </ProtectedRouter>
              }
            />
            <Route path="TodoList" element={<TodoList />} />
            <Route path="resetPassword" element={<ResetPassword />}></Route>
            <Route
              path="AhoutThat"
              element={
                <ProtectedRouter>
                  <AboutThat />
                </ProtectedRouter>
              }
            />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
