import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Container from "@mui/material/Container";

import { useTranslation } from "react-i18next";
//مكتبة لتنسيق التاريخ
import { format } from "date-fns";

export function Todo({ item, CompleteTodo, DeleteTodo, UpdateTodo }) {
  const { t, i18n } = useTranslation();
  return (
    <Container
      maxWidth="lg"
      sx={{
        mr: 2,
        direction: "rtl",
      }}
    >
      <Box
        key={item.id}
        component="section"
        sx={{
          position: "relative",
          display: "flex",
          width: "100%",
          p: 4,
          marginTop: 3,
          border: "1px dashed grey",
          borderRadius: 2,
          fontSize: 30,
          color: "white",
          bgcolor: "#1976d2",
          "&:hover": {
            bgcolor: "primary.dark",
            transition: "all 0.2s",
            boxShadow: "",
          },
        }}
      >
        <Grid container spacing={1} sx={{ width: "100%" }}>
          <Grid size={8}>
            <Typography
              component="div"
              variant="h5"
              textAlign="right"
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                color: "white",

                //     textDecoration: todo.icCompleted ? "line-through" : "none",
              }}
            >
              {item.Title}
            </Typography>
            <Typography
              variant="h6"
              component="div"
              textAlign="right"
              sx={{ color: "white" }}
            >
              {item.Details}
            </Typography>
          </Grid>
          <Grid
            sx={{ mb: 2 }}
            size={{ xs: 12, md: 4 }}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton
              size="large"
              aria-label="CheckIcon"
              sx={{
                color: item.isCompleted ? "white" : "green",
                background: item.isCompleted ? "green" : "white",
                "&:hover": {
                  bgcolor: "primary.light",
                },
              }}
              onClick={
                // handleCheckCilik(item.id, item.isCompleted);
                () => {
                  CompleteTodo(item.id, item.isCompleted);
                }
              }
            >
              {" "}
              <CheckIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="EditIcon"
              sx={{
                background: "white",
                "&:hover": {
                  bgcolor: "primary.light",
                },
              }}
              color="primary"
              onClick={
                // handleCheckCilik(item.id, item.isCompleted);
                () => {
                  UpdateTodo(item.id);
                }
              }
            >
              {" "}
              <EditIcon />
            </IconButton>{" "}
            <IconButton
              size="large"
              aria-label="Delete"
              color="secondary"
              sx={{
                background: "white",
                "&:hover": {
                  bgcolor: "primary.light",
                },
              }}
              onClick={
                // handleCheckCilik(item.id, item.isCompleted);
                () => {
                  DeleteTodo(item.id);
                }
              }
            >
              {" "}
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
        <Typography
          gutterBottom
          sx={{
            display: "block",
            position: "absolute",
            bottom: 0,
            left: 0,
            px: 1,

            fontSize: 12,
          }}
        >
          {t("Added on")}{" "}
          {format(new Date(item.TodoCreateTime), "yyyy-MM-dd HH:mm:ss")}
        </Typography>
      </Box>
    </Container>
  );
}
