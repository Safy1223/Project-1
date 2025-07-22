// src/Page/SideNavigation.js

import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { useTranslation } from "react-i18next";

// MUI Components
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";

// MUI Icons
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import PasswordIcon from "@mui/icons-material/Password";
import InfoIcon from "@mui/icons-material/Info";

const DRAWER_WIDTH = 250;

// ===================================================================
// 1. Custom Hook to manage User Data and Authentication
// ===================================================================
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const sendResetPasswordEmail = async () => {
    if (!user) return;
    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${window.location.origin}/resetPassword`,
    });
    if (error) {
      // You should use a toast notification here instead of alert
      alert(error.message);
    } else {
      alert("A password reset link has been sent to your email.");
    }
  };

  return { user, loading, handleLogout, sendResetPasswordEmail };
};

// ===================================================================
// 2. Main Layout Component
// ===================================================================
export default function SideNavigation(props) {
  const { window } = props;
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, loading, handleLogout, sendResetPasswordEmail } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLanguageToggle = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  const handleConfirmResetPassword = () => {
    sendResetPasswordEmail();
    setResetDialogOpen(false);
  };

  // Drawer content JSX
  const drawerContent = (
    <div>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          py: 2,
        }}
      >
        <Avatar sx={{ width: 64, height: 64, mb: 1, bgcolor: "primary.main" }}>
          {user?.user_metadata?.full_name?.[0].toUpperCase()}
        </Avatar>
        <Typography variant="h6" noWrap>
          {user?.user_metadata?.full_name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {user?.email}
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/TodoList")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={t("Home")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/profile")}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={t("Profile")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setResetDialogOpen(true)}>
            <ListItemIcon>
              <PasswordIcon />
            </ListItemIcon>
            <ListItemText primary={t("Reset Password")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/AhoutThat")}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={t("About that")} />
          </ListItemButton>
        </ListItem>
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon color="error" />
            </ListItemIcon>
            <ListItemText primary={t("Logout")} sx={{ color: "error.main" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          display: "flex",
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
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              alignItems: "flex-start",
              display: "flex",
            }}
          >
            {t("Todo App")}
          </Typography>
          <Tooltip title={t("Toggle Language")}>
            <IconButton color="inherit" onClick={handleLanguageToggle}>
              <LanguageIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      {/* chrom */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
      {/* Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { sm: `${DRAWER_WIDTH}px`, xs: 0 },
          backgroundColor: "#f9fafb",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>

      {/* Reset Password Confirmation Dialog */}
      <Dialog open={resetDialogOpen} onClose={() => setResetDialogOpen(false)}>
        <DialogTitle fontWeight="bold">{t("Reset Password")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t(
              "Are you sure you want to send a password reset link to your email?"
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setResetDialogOpen(false)}>
            {t("Cancel")}
          </Button>
          <Button
            onClick={handleConfirmResetPassword}
            variant="contained"
            autoFocus
          >
            {t("Send Link")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
