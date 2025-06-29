import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Card } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [inputInfo, setInputInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  async function handleSignIn() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: inputInfo.email,
      password: inputInfo.password,
    });
    if (error) {
      alert("Invalid login information");
    } else {
      navigate("/TodoList");
    }
  }

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <>
      <Card
        sx={{
          background: "#ffffff",
          color: "black",
          boxShadow: 8,
          width: 400,
          mx: "auto", // margin left & right
          my: 15, // margin top & bottom
          py: 5, // padding top & bottom
          px: 2, // padding left & right
          display: "flex",
          flexDirection: "column",
          gap: 3,
          borderRadius: "12px",
        }}
        variant="outlined"
      >
        <div>
          <Typography variant="h4">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body-sm">Sign in to continue.</Typography>
        </div>
        <FormControl>
          <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
          <Input
            // html input attribute
            name="email"
            type="email"
            value={inputInfo.email}
            onChange={(event) => {
              setInputInfo({ ...inputInfo, email: event.target.value });
            }}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="standard-adornment-password">
            Confirm Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            value={inputInfo.password}
            onChange={(event) => {
              setInputInfo({ ...inputInfo, password: event.target.value });
            }}
          />
        </FormControl>
        <Button
          sx={{
            mt: 1,
            fontSize: "15px " /* margin top */,
            bgcolor: "primary",
          }}
          variant="contained"
          onClick={handleSignIn}
        >
          Log in
        </Button>
        <Typography>
          Don&apos;t have an account?
          <Link
            to="/SignUp"
            sx={{ marginLeft: "5px", fontSize: "md", alignSelf: "felx-end" }}
          >
            Sign Up
          </Link>
        </Typography>
      </Card>
    </>
  );
}
