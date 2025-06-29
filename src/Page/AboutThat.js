import React from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material";

const AboutThat = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ p: 2 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            About This App
          </Typography>
          <Typography
            variant="h6"
            sx={{ display: "flex", justifyContent: "flex-start" }}
          >
            This application is task management system built with React. It
            allows users to:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Add Todos and Edit and Delete" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Mark them as completed or not completed" />
            </ListItem>
            <ListItem>
              <ListItemText primary="View task details" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Manage profile and reset password" />
            </ListItem>
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography
            sx={{ display: "flex", justifyContent: "flex-start" }}
            variant="h6"
            gutterBottom
          >
            Technologies Used
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="React" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Supabase" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Material UI" />
            </ListItem>
            <ListItem>
              <ListItemText primary="React Router" />
            </ListItem>
            <ListItem>
              <ListItemText primary="i18next to manage localizations" />
            </ListItem>
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography
            sx={{ display: "flex", justifyContent: "flex-start" }}
            variant="h6"
            gutterBottom
          >
            Purpose
          </Typography>
          <Typography
            sx={{ display: "flex", justifyContent: "flex-start" }}
            variant="body1"
          >
            This project was created as part of my learning journey in React. It
            helped me practice:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Authentication" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Routing" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Component Design" />
            </ListItem>
            <ListItem>
              <ListItemText primary="State Management" />
            </ListItem>
          </List>

          <Divider sx={{ my: 2 }} />
        </Paper>
      </Box>
    </Container>
  );
};

export default AboutThat;
