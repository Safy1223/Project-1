import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import supabase from "../config/supabaseClient";
import { Link } from "react-router-dom";
//Icons
import Person2SharpIcon from "@mui/icons-material/Person2Sharp";
import PasswordIcon from "@mui/icons-material/Password";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import LogoutIcon from "@mui/icons-material/Logout";
//Icons
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

import { TodosContext } from "../context/TodoContext";
import { useContext } from "react";

import { useTranslation } from "react-i18next";
import i18next from "i18next";
import LanguageIcon from "@mui/icons-material/Language";
import HomeIcon from "@mui/icons-material/Home";
const drawerWidth = 240;

function SideNavigation(props) {
  ///--------Read Information User-------///
  const [username, Setusername] = useState("");
  const [userEmail, SetUserEmail] = useState("");
  const Navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        Setusername(user.user_metadata.full_name);
        SetUserEmail(user.email);
      }
    };
    fetchUser();
  }, []);
  ///--------Read Information User-------///

  //---------Logout-----/////
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error);
    } else {
      Navigate("/login");
    }
  };

  //---------Logout-----/////

  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  const handleUpdateClose = () => {
    setShowUpdateDialog(false);
  };

  //---------Reset Password-----/////
  const sendEmailToresetpassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/resetPassword",
    });
    if (error) {
      setShowUpdateDialog(false);
      alert(error.message);
    } else {
      setShowUpdateDialog(false);
      alert("A password reset link has been sent to your email.");
    }
  };

  //---------Reset Password-----/////

  /// ===== Read Table===///
  const { allTodos, setArrayTodo } = useContext(TodosContext);
  /// ===== Read Table===///

  const ShowTodosCompleted = () => {
    Navigate("/TodoList");
    const newTodos = allTodos.filter((t) => {
      return t.isCompleted;
    });
    setArrayTodo(newTodos);
  };

  const ShowTodosNotCompleted = () => {
    Navigate("/TodoList");
    const newTodos = allTodos.filter((t) => {
      return !t.isCompleted;
    });
    setArrayTodo(newTodos);
  };
  const ShowTodosAll = () => {
    Navigate("/TodoList");
    setArrayTodo(allTodos);
  };

  /////----------change language --------////
  const { t, i18n } = useTranslation();
  const [local, setLocale] = useState("ar");
  const handlelanguage = () => {
    if (local == "en") {
      setLocale("ar");
      //moment.locale("ar");
      i18n.changeLanguage("ar");
    } else {
      setLocale("en");
      //  moment.locale("en");
      i18n.changeLanguage("en");
    }
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        {" "}
        <Typography variant="h6">
          {t("Welcome")} <br />
          <b>{username}</b>
        </Typography>{" "}
      </Toolbar>

      <Divider />
      <List sx={{ mb: 3 }}>
        <ListItem>
          <ListItemButton
            onClick={() => {
              Navigate("/profile");
            }}
          >
            <ListItemIcon>
              <Person2SharpIcon />
            </ListItemIcon>

            <ListItemText>{t("Profile")}</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={() => {
              setShowUpdateDialog(true);
            }}
          >
            <ListItemIcon>
              <PasswordIcon />
            </ListItemIcon>

            <ListItemText>{t("Reset Password")}</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={() => {
              Navigate("/AhoutThat");
            }}
          >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText>{t("About that")}</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText onClick={handleLogout}>{t("Logout")}</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Typography component="div" variant="h5">
        {t("Todos")}
      </Typography>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton
            onClick={() => {
              ShowTodosCompleted();
            }}
          >
            <ListItemIcon>
              <CheckCircleIcon />
            </ListItemIcon>
            <ListItemText>{t("Completed")}</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={() => {
              ShowTodosNotCompleted();
            }}
          >
            <ListItemIcon>
              <DoNotDisturbIcon />
            </ListItemIcon>
            <ListItemText>{t("Not completed")}</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={() => {
              ShowTodosAll();
            }}
          >
            <ListItemIcon>
              <DensitySmallIcon />
            </ListItemIcon>
            <ListItemText>{t("All")}</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Dialog
        open={showUpdateDialog}
        keepMounted
        onClose={handleUpdateClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ fontSize: 30 }}>
          {"Do you want to change your password?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{ fontSize: 20 }}
          >
            After confirmation, check your email.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowUpdateDialog(false);
            }}
            sx={{ fontSize: 20 }}
          >
            No
          </Button>
          <Button
            sx={{ fontSize: 20 }}
            onClick={() => {
              sendEmailToresetpassword(userEmail);
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      ;
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <FormatListBulletedIcon />
            </IconButton>
            <IconButton onClick={handlelanguage}>
              {" "}
              <LanguageIcon />
            </IconButton>
            <IconButton
              sx={{ ml: 2 }}
              onClick={() => {
                Navigate("/TodoList");
              }}
            >
              <HomeIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            slotProps={{
              root: {
                keepMounted: true, // Better open performance on mobile.
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />

          <Outlet />
        </Box>
      </Box>
    </>
  );
}

SideNavigation.propTypes = {
  window: PropTypes.func,
};

export default SideNavigation;
