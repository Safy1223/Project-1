import { useState, useContext } from "react";
import supabase from "../config/supabaseClient";
import { TodosContext } from "../context/TodoContext";
import {
  Button,
  Stack,
  TextField,
  Snackbar,
  Alert,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { useTranslation } from "react-i18next";

export default function AddTodos() {
  const { t } = useTranslation();
  const { arrayTodo, setArrayTodo, allTodos, setAllTodos } =
    useContext(TodosContext);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  ///----- Add Todo -------/////

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setNotification({
        message: t("Title is required"),
        severity: "error",
        open: true,
      });
      return;
    }
    setLoading(true);
    const { data: newTodos, error } = await supabase
      .from("Todos")
      .insert([{ Title: title, Details: details, isCompleted: false }])
      .select();
    setLoading(false);
    if (error) {
      setNotification({
        message: t("Error adding task"),
        severity: "error",
        open: true,
      });
    } else {
      setNotification({
        message: t("Task added successfully"),
        severity: "success",
        open: true,
      });
      // تحديث الحالة في السياق (Context)
      const updatedArray = [...arrayTodo, ...newTodos];
      setArrayTodo(updatedArray);
      setAllTodos(updatedArray);
      // إعادة تعيين حقول الإدخال
      setTitle("");
      setDetails("");
    }
  };
  const handleCloseNotification = (event, reason) => {
    //منع الإغلاق إذا كان المستخدم قد نقر خارج الإشعار، مما يعني أنه ربما كان يريد إبقاءه مفتوحًا.
    if (reason === "clickaway") {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
        {t("Add a New Task")}
      </Typography>
      <Stack spacing={2}>
        <TextField
          label={t("Task Title")}
          variant="filled"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        <TextField
          label={t("Details")}
          variant="filled"
          fullWidth
          multiline
          rows={2}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          disabled={loading}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          startIcon={
            loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <AddCircleOutlineIcon />
            )
          }
          disabled={loading}
        >
          {loading ? t("Adding...") : t("Add Task")}
        </Button>
      </Stack>

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
