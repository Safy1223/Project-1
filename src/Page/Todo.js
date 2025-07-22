// src/Page/Todo.js

// استيراد المكونات الأساسية
import { Typography, IconButton, Box, Stack } from "@mui/material";
import { useState } from "react";

// استيراد الأيقونات
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// استيراد مكتبة تنسيق التاريخ
import { format } from "date-fns";

// استيراد مكتبة الترجمة
import { useTranslation } from "react-i18next";
import i18next from "i18next";
export function Todo({ item, CompleteTodo, DeleteTodo, UpdateTodo }) {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        p: 1.5,
        borderRadius: 2,
        backgroundColor: isHovered ? "#ffffff" : "#f7f8fa", // خلفية بيضاء عند المرور
        boxShadow: isHovered ? "0px 4px 20px rgba(0, 0, 0, 0.06)" : "none",
        transition:
          "background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        mt: 1,
      }}
    >
      {/* أيقونة الإكمال */}
      <IconButton
        aria-label="complete task"
        onClick={() => CompleteTodo(item.id, item.isCompleted)}
        sx={{
          backgroundColor: item.isCompleted ? "success.main" : "grey.200",
          color: item.isCompleted ? "white" : "grey.700",
          "&:hover": {
            backgroundColor: item.isCompleted ? "success.dark" : "grey.300",
          },
        }}
      >
        <CheckIcon />
      </IconButton>

      {/* حاوية النصوص والتاريخ */}
      <Stack sx={{ flexGrow: 1 }} spacing={0.2}>
        <Typography
          variant="h6"
          sx={{
            direction: "rtl",
            fontWeight: 500,
            textDecoration: item.isCompleted ? "line-through" : "none",
            color: item.isCompleted ? "text.disabled" : "text.primary",
          }}
        >
          {item.Title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ direction: "rtl" }}
        >
          {item.Details}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ pt: 0.5, direction: i18next.language === "ar" ? "rtl" : "ltr" }}
        >
          {t("Added on")} {format(new Date(item.TodoCreateTime), "MMM d, yyyy")}
        </Typography>
      </Stack>

      {/* أزرار التحكم (تظهر عند المرور) */}
      <Box
        sx={{
          opacity: isHovered ? 1 : 0, // التحكم بالظهور
          transition: "opacity 0.2s ease-in-out",
        }}
      >
        <IconButton
          aria-label="edit task"
          size="small"
          onClick={() => UpdateTodo(item.id)}
          color="primary"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete task"
          size="small"
          onClick={() => DeleteTodo(item.id)}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
