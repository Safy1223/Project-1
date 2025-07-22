import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Stack,
  Avatar,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockResetIcon from "@mui/icons-material/LockReset";
export default function ResetPassword() {
  const Navigate = useNavigate();
  const [ErrorPassword, SetErrorPassword] = useState({
    ErrorPass: "",
    IscompleteInputs: true,
  });
  const [Inputsign, setInputSign] = useState({
    password: "",
    ConfirmPassword: "",
  });

  useEffect(() => {
    if (Inputsign.password === "" || Inputsign.ConfirmPassword === "") {
      SetErrorPassword({ ErrorPass: "", IscompleteInputs: true });
    } else if (Inputsign.password !== Inputsign.ConfirmPassword) {
      SetErrorPassword({
        ErrorPass: "Password does not match",
        IscompleteInputs: true,
      });
    } else {
      SetErrorPassword({ ErrorPass: "", IscompleteInputs: false });
    }
  }, [Inputsign]);

  const handleEditPassword = async () => {
    const { error } = await supabase.auth.updateUser({
      password: Inputsign.password,
    });
    if (error) {
      alert(error.message);
    } else {
      alert("Password updated successfully! You will be logged out.");
      await supabase.auth.signOut();
      Navigate("/login");
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box sx={{ bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100vh",
          py: 4,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main", width: 56, height: 56 }}>
            <LockResetIcon fontSize="large" />
          </Avatar>

          <Typography
            component="h1"
            variant="h5"
            fontWeight="bold"
            sx={{ mt: 1 }}
          >
            Reset Password
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Enter your new password below.
          </Typography>

          <Stack spacing={2.5} sx={{ width: "100%" }}>
            <TextField
              required
              fullWidth
              label="New Password"
              type={showPassword ? "text" : "password"}
              value={Inputsign.password}
              onChange={(event) => {
                setInputSign({ ...Inputsign, password: event.target.value });
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              required
              fullWidth
              label="Confirm New Password"
              type={showPassword ? "text" : "password"}
              value={Inputsign.ConfirmPassword}
              onChange={(event) => {
                setInputSign({
                  ...Inputsign,
                  ConfirmPassword: event.target.value,
                });
              }}
              error={!!ErrorPassword.ErrorPass}
              helperText={ErrorPassword.ErrorPass}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              boxShadow: "0 4px 14px 0 rgba(0, 118, 255, 0.39)",
            }}
            onClick={handleEditPassword}
            disabled={ErrorPassword.IscompleteInputs}
          >
            Change Password
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
