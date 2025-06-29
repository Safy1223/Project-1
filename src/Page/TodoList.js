import supabase from "../config/supabaseClient";
import { useState, useEffect, use } from "react";
import { Todo } from "./Todo";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { Button, TextField } from "@mui/material";

import { TodosContext } from "../context/TodoContext";
import { useContext } from "react";
import AddTodos from "./AddTodos";

import { useTranslation } from "react-i18next";
export default function TodoList() {
  const { t, i18n } = useTranslation();
  /// ===== Read Table===///
  const { arrayTodo, setArrayTodo, setAllTodos } = useContext(TodosContext);
  /// ===== Read Table===///

  /// ===== TodoComplete Table===///
  async function handleCheckCilik(index, isCompleted) {
    alert(index);
    const { data, error } = await supabase
      .from("Todos")
      .update({ isCompleted: !isCompleted })
      .eq("id", index)
      .select();
    const newArray = (newArrayTodo) =>
      newArrayTodo.map((todo) =>
        todo.id == index ? { ...todo, isCompleted: !isCompleted } : todo
      );
    setArrayTodo(newArray);
    setAllTodos(newArray);
  }
  /// ===== TodoComplete Table===///

  /// ===== Delete Table===///
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteIdTodo, SetDeleteIdTodo] = useState(null);

  async function handleDeleteCilik() {
    const { error } = await supabase
      .from("Todos")
      .delete()
      .eq("id", deleteIdTodo);
    if (error) {
      alert(error.message);
      return;
    }
    const newArray = (newArrayTodo) =>
      newArrayTodo.filter((todo) => todo.id != deleteIdTodo);
    setArrayTodo(newArray);
    setAllTodos(newArray);
    setShowDeleteDialog(false);
  }

  const handleDeleteClose = () => {
    setShowDeleteDialog(false);
  };
  const handleDeleteOpen = (index) => {
    SetDeleteIdTodo(index);
    setShowDeleteDialog(true);
  };

  /// ===== Delete Table===///

  // Update Table  //
  const [updateIdTodo, SetUpdateIdTodo] = useState(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    Title: "",
    Details: "",
  });
  const handleUpdateClickOpen = (index) => {
    SetUpdateIdTodo(index);
    const Todo = arrayTodo.find((t) => t.id === index);
    if (Todo) {
      setUpdatedTodo({ Title: Todo.Title, Details: Todo.Details });
    }
    setShowUpdateDialog(true);
  };

  const handleUpdateClose = () => {
    setShowUpdateDialog(false);
  };

  async function handleUpdateAgree() {
    console.log(updateIdTodo);
    const { error } = await supabase
      .from("Todos")
      .update({ Title: updatedTodo.Title, Details: updatedTodo.Details })
      .eq("id", updateIdTodo)
      .select();
    if (error) {
      alert(error.message);
      return;
    }
    const newArray = (newArrayTodo) =>
      newArrayTodo.map((todo) =>
        todo.id == updateIdTodo
          ? { ...todo, Title: updatedTodo.Title, Details: updatedTodo.Details }
          : todo
      );
    setArrayTodo(newArray);
    setAllTodos(newArray);
    setShowUpdateDialog(false);
  }
  //////// Update Table  ///////

  const todosJSX = arrayTodo.map((t) => {
    return (
      <Todo
        key={t.id}
        item={t}
        CompleteTodo={handleCheckCilik}
        DeleteTodo={handleDeleteOpen}
        UpdateTodo={handleUpdateClickOpen}
      />
    );
  });
  return (
    <>
      <AddTodos />
      {todosJSX}
      {/* Dialog Delete */}
      <Dialog
        open={showDeleteDialog}
        keepMounted
        onClose={handleDeleteClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ fontSize: 30 }}>
          {t("Are you sure you want this assignment?")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{ fontSize: 20 }}
          >
            {t("You cannot undo the deletion once it is completed.")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ fontSize: 20 }} onClick={handleDeleteClose}>
            {t("No")}
          </Button>
          <Button sx={{ fontSize: 20 }} onClick={handleDeleteCilik}>
            {t("Yes")}
          </Button>
        </DialogActions>
      </Dialog>
      {/*///// Dialog Delete ////*/}

      {/* Dialog Update */}
      <Dialog
        open={showUpdateDialog}
        keepMounted
        onClose={handleUpdateClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ fontSize: 30 }}>
          {t("Are you sure you want this assignment?")}
        </DialogTitle>
        <DialogContent sx={{ fontSize: 20 }}>
          {t("Edit the todo")}
          <TextField
            autoFocus
            required
            margin="dense"
            label={t("Title")}
            fullWidth
            variant="standard"
            value={updatedTodo.Title}
            onChange={(event) => {
              setUpdatedTodo({ ...updatedTodo, Title: event.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            label={t("Details")}
            fullWidth
            variant="standard"
            value={updatedTodo.Details}
            onChange={(event) => {
              setUpdatedTodo({ ...updatedTodo, Details: event.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ fontSize: 20 }} onClick={handleUpdateClose}>
            {t("No")}
          </Button>
          <Button sx={{ fontSize: 20 }} onClick={handleUpdateAgree}>
            {t("Yes")}
          </Button>
        </DialogActions>
      </Dialog>

      {/*///// Dialog Update ////*/}
    </>
  );
}
