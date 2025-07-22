// src/Page/AboutThat.js

import React from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Typography,
  Container,
  Paper,
  Divider,
  Chip,
  Stack,
} from "@mui/material";

// استيراد الأيقونات
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CodeIcon from "@mui/icons-material/Code";
import SchoolIcon from "@mui/icons-material/School";

export default function AboutThat() {
  const { t, i18n } = useTranslation();

  const technologies = [
    "React",
    "Supabase",
    "Material UI",
    "React Router",
    "i18next",
  ];

  // دالة بسيطة للتبديل بين اللغات
  const translate = (enText, arKey) => {
    return i18n.language === "ar" ? t(arKey) : enText;
  };

  // تحديد اتجاه النص بناءً على اللغة الحالية
  const textDirection = i18n.language === "ar" ? "rtl" : "ltr";

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 4, backgroundColor: "transparent" }}>
        {/* 1. المقدمة */}
        <Box mb={4} sx={{ direction: textDirection }}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            gutterBottom
          >
            {translate("A Modern Task Management Solution", "about.main_title")}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {translate(
              "This is a full-stack application designed to demonstrate core web development principles, from user authentication to real-time data management.",
              "about.main_subtitle"
            )}
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* 2. الميزات الأساسية */}
        <Box mb={4} sx={{ direction: textDirection }}>
          <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
            <CheckCircleOutlineIcon color="primary" />
            <Typography variant="h5" component="h2" fontWeight="bold">
              {translate("Key Functionality", "about.features_title")}
            </Typography>
          </Stack>
          <Typography variant="body1" color="text.secondary" sx={{ pl: 4.5 }}>
            {translate(
              "The application provides a complete user workflow, including secure registration and login, profile management, and full CRUD (Create, Read, Update, Delete) operations for tasks. Users can track their progress by marking tasks as complete, ensuring a seamless and productive experience.",
              "about.features_desc"
            )}
          </Typography>
        </Box>

        {/* 3. التقنيات المستخدمة */}
        <Box mb={4} sx={{ direction: textDirection }}>
          <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
            <CodeIcon color="primary" />
            <Typography variant="h5" component="h2" fontWeight="bold">
              {translate("Technology Stack", "about.tech_title")}
            </Typography>
          </Stack>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, pl: 4.5 }}>
            {technologies.map((tech) => (
              <Chip key={tech} label={tech} variant="outlined" />
            ))}
          </Box>
        </Box>

        {/* 4. الهدف التعليمي */}
        <Box sx={{ direction: textDirection }}>
          <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
            <SchoolIcon color="primary" />
            <Typography variant="h5" component="h2" fontWeight="bold">
              {translate("Technical Showcase", "about.learning_title")}
            </Typography>
          </Stack>
          <Typography variant="body1" color="text.secondary" sx={{ pl: 4.5 }}>
            {translate(
              "This project serves as a practical demonstration of my ability to build modern, component-based user interfaces with React, manage application state effectively using Context API, and integrate with backend services like Supabase for authentication and database operations. It showcases a solid understanding of front-end architecture and user-centric design.",
              "about.learning_desc"
            )}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
