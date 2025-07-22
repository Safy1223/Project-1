import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  Divider,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

export default function Sign() {
  const [ErrorPassword, SetErrorPassword] = useState({
    ErrorPass: "",
    IscompleteInputs: true,
  });
  const [Inputsign, setInputSign] = useState({
    full_name: "",
    email: "",
    password: "",
    ConfirmPassword: "",
    Birth_of_day: "",
  });

  async function handlesignUP() {
    const { data, error } = await supabase.auth.signUp({
      email: Inputsign.email,
      password: Inputsign.password,
      options: {
        data: {
          full_name: Inputsign.full_name,
          Birth: Inputsign.Birth_of_day,
        },
      },
    });
    if (error) {
      alert(error);
    } else {
      alert("Check your email");
    }
  }

  useEffect(() => {
    if (
      Inputsign.full_name === "" ||
      Inputsign.email === "" ||
      Inputsign.Birth_of_day === "" ||
      Inputsign.password === "" ||
      Inputsign.ConfirmPassword === ""
    ) {
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
            <PersonAddAlt1Icon fontSize="large" />
          </Avatar>

          <Typography
            component="h1"
            variant="h5"
            fontWeight="bold"
            sx={{ mt: 1 }}
          >
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Sign up to continue.
          </Typography>

          <Stack spacing={2.5} sx={{ width: "100%" }}>
            <TextField
              required
              fullWidth
              label="Full Name"
              value={Inputsign.full_name}
              onChange={(event) => {
                setInputSign({ ...Inputsign, full_name: event.target.value });
              }}
            />
            <TextField
              required
              fullWidth
              type="email"
              label="Email"
              value={Inputsign.email}
              onChange={(event) => {
                setInputSign({ ...Inputsign, email: event.target.value });
              }}
            />
            <TextField
              required
              fullWidth
              label="Password"
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
              label="Confirm Password"
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
            <TextField
              required
              fullWidth
              label="Date of Birth"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={Inputsign.Birth_of_day}
              onChange={(event) => {
                setInputSign({
                  ...Inputsign,
                  Birth_of_day: event.target.value,
                });
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
            onClick={handlesignUP}
            disabled={ErrorPassword.IscompleteInputs}
          >
            Sign Up {/* تم تغيير النص ليكون مناسبًا */}
          </Button>

          <Divider sx={{ width: "100%", my: 1 }} />

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "#1976d2",
                fontWeight: "bold",
              }}
            >
              Login
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
