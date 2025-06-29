import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Card, Stack, TextField } from "@mui/material";
import supabase from "../config/supabaseClient";
import { useState, useContext } from "react";
import { TodosContext } from "../context/TodoContext";
import { useTranslation } from "react-i18next";
export default function AddTodos() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState({ message: "", severity: "success" });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  ///----- Add Todo -------/////
  const { arrayTodo, setArrayTodo, allTodos, setAllTodos } =
    useContext(TodosContext);
  const [AddNewTodos, setAddNewTodos] = useState({
    Title: "",
    Details: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!AddNewTodos.Title.trim()) {
      setSnack({ message: t("Address required"), severity: "error" });
      setOpen(true);
      return;
    }
    const { data: Todos, error } = await supabase
      .from("Todos")
      .insert([
        {
          Title: AddNewTodos.Title,
          Details: AddNewTodos.Details,
          isCompleted: false,
        },
      ])
      .select();
    if (error) {
      setSnack({ message: t("Error while adding"), severity: "error" });
      console.error(error);
      setOpen(true);
    } else {
      setSnack({ message: t("Added successfully"), severity: "success" });
      setArrayTodo([...arrayTodo, ...Todos]);
      setAllTodos([...allTodos, ...Todos]);
      setAddNewTodos({
        Title: "",
        Details: "",
      });
      setOpen(true);
    }
  };
  return (
    <Card variant="outlined" sx={{ minWidth: 275, p: 2 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label={t("Title")}
            variant="outlined"
            fullWidth
            value={AddNewTodos.Title}
            onChange={(e) =>
              setAddNewTodos({ ...AddNewTodos, Title: e.target.value })
            }
          />
          <TextField
            label={t("Details")}
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={AddNewTodos.Details}
            onChange={(e) =>
              setAddNewTodos({ ...AddNewTodos, Details: e.target.value })
            }
          />
          <Button
            type="submit"
            sx={{ fontSize: 22 }}
            variant="contained"
            color="primary"
          >
            {t("Add a new todo")}
          </Button>
        </Stack>
      </form>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={snack.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Card>
  );
}
