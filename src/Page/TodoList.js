import supabase from "../config/supabaseClient";
import { useState, useContext } from "react";
import { TodosContext } from "../context/TodoContext";
import { Todo } from "./Todo";
import AddTodos from "./AddTodos";
import {
  Container,
  Typography,
  Box,
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Stack,
  ButtonGroup,
} from "@mui/material";
import { useTranslation } from "react-i18next";

function DeleteConfirmationDialog({ open, onClose, onConfirm }) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle fontWeight="bold">{t("Confirm Deletion")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t(
            "Are you sure you want to delete this task? This action cannot be undone."
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">
          {t("Cancel")}
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" autoFocus>
          {t("Delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
function UpdateTodoDialog({ open, onClose, onConfirm, todo, setTodo }) {
  const { t } = useTranslation();
  if (!todo) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontWeight="bold">{t("Edit Task")}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label={t("Title")}
            variant="outlined"
            value={todo.Title}
            onChange={(e) => setTodo({ ...todo, Title: e.target.value })}
          />
          <TextField
            label={t("Details")}
            variant="outlined"
            multiline
            rows={3}
            value={todo.Details}
            onChange={(e) => setTodo({ ...todo, Details: e.target.value })}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">
          {t("Cancel")}
        </Button>
        <Button onClick={onConfirm} variant="contained" autoFocus>
          {t("Save Changes")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default function TodoList() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  /// ===== Read Table===///
  const { arrayTodo, setArrayTodo, setAllTodos } = useContext(TodosContext);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [todoToUpdate, setTodoToUpdate] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("all");
  /// ===== Read Table===///

  /// ===== TodoComplete Table===///
  const handleComplete = async (id, isCompleted) => {
    const { error } = await supabase
      .from("Todos")
      .update({ isCompleted: !isCompleted })
      .eq("id", id);
    if (error) return;
    const newArray = arrayTodo.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo
    );
    setArrayTodo(newArray);
    setAllTodos(newArray);
  };

  /// ===== TodoComplete Table===///

  /// ===== Delete Table===///

  const handleDelete = async () => {
    if (!todoToDelete) return;
    const { error } = await supabase
      .from("Todos")
      .delete()
      .eq("id", todoToDelete.id);
    if (error) return;
    const newArray = arrayTodo.filter((todo) => todo.id !== todoToDelete.id);
    setArrayTodo(newArray);
    setAllTodos(newArray);
    setTodoToDelete(null);
  };

  /// ===== Delete Table===///

  // Update Table  //
  const handleUpdate = async () => {
    if (!todoToUpdate) return;
    const { error } = await supabase
      .from("Todos")
      .update({ Title: todoToUpdate.Title, Details: todoToUpdate.Details })
      .eq("id", todoToUpdate.id);
    if (error) return;
    const newArray = arrayTodo.map((todo) =>
      todo.id === todoToUpdate.id ? todoToUpdate : todo
    );
    setArrayTodo(newArray);
    setAllTodos(newArray);
    setTodoToUpdate(null);
  };
  //////// Update Table  ///////

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
      }}
    >
      <AddTodos />
      <Divider sx={{ my: 4 }} />
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            component="h5"
            fontWeight="bold"
            sx={{ p: 1 }}
          >
            {t("My Tasks")}
          </Typography>

          {/* مجموعة أزرار الفلترة */}
          <ButtonGroup variant="outlined" aria-label="Task filter button group">
            <Button
              onClick={() => setCurrentFilter("all")}
              variant={currentFilter === "all" ? "contained" : "outlined"}
            >
              {t("All")}
            </Button>
            <Button
              onClick={() => setCurrentFilter("completed")}
              variant={currentFilter === "completed" ? "contained" : "outlined"}
            >
              {t("Completed")}
            </Button>
            <Button
              onClick={() => setCurrentFilter("not_completed")}
              variant={
                currentFilter === "not_completed" ? "contained" : "outlined"
              }
            >
              {t("Not Completed")}
            </Button>
          </ButtonGroup>
        </Box>
        <Stack sx={{ direction: isRtl ? "rtl" : "ltr" }}>
          {/* قم بفلترة المصفوفة قبل عرضها */}
          {arrayTodo && arrayTodo.length > 0 ? (
            arrayTodo
              .filter((todo) => {
                if (currentFilter === "completed") return todo.isCompleted;
                if (currentFilter === "not_completed") return !todo.isCompleted;
                return true; // فلتر 'all'
              })
              .map((todo) => (
                <Todo
                  key={todo.id}
                  item={todo}
                  CompleteTodo={handleComplete}
                  DeleteTodo={() => setTodoToDelete(todo)}
                  UpdateTodo={() => setTodoToUpdate({ ...todo })}
                />
              ))
          ) : (
            <Typography
              color="text.secondary"
              sx={{ mt: 3, textAlign: "center" }}
            >
              {t("Your task list is empty. Add a new task to get started!")}
            </Typography>
          )}
        </Stack>
      </Box>

      <DeleteConfirmationDialog
        open={!!todoToDelete}
        onClose={() => setTodoToDelete(null)}
        onConfirm={handleDelete}
      />

      <UpdateTodoDialog
        open={!!todoToUpdate}
        onClose={() => setTodoToUpdate(null)}
        onConfirm={handleUpdate}
        todo={todoToUpdate}
        setTodo={setTodoToUpdate}
      />
    </Container>
  );
}
