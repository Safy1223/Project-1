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
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  // --- لا تغيير في المنطق البرمجي ---
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
      const updatedArray = [...arrayTodo, ...newTodos];
      setArrayTodo(updatedArray);
      setAllTodos(updatedArray);
      setTitle("");
      setDetails("");
    }
  };

  const handleCloseNotification = (event, reason) => {
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
          sx={{
            // تطبيق الاتجاه على الحقل نفسه
            direction: isRtl ? "rtl" : "ltr",
            // التأكد من أن النص داخل الحقل يبدأ من الاتجاه الصحيح
            "& .MuiInputBase-input": {
              textAlign: isRtl ? "right" : "left",
            },
          }}
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
          sx={{
            // تطبيق الاتجاه على الحقل نفسه
            direction: isRtl ? "rtl" : "ltr",
            // التأكد من أن النص داخل الحقل يبدأ من الاتجاه الصحيح
            "& .MuiInputBase-input": {
              textAlign: isRtl ? "right" : "left",
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          startIcon={
            !isRtl &&
            (loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <AddCircleOutlineIcon />
            ))
          }
          endIcon={
            isRtl &&
            (loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <AddCircleOutlineIcon />
            ))
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
