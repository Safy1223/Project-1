import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { Card } from "@mui/material";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";

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
    }
    alert("Check your email");
  }
  useEffect(() => {
    if (
      Inputsign.full_name == "" ||
      Inputsign.email == "" ||
      Inputsign.Birth_of_day == "" ||
      Inputsign.password == "" ||
      Inputsign.ConfirmPassword == ""
    ) {
      SetErrorPassword({ ErrorPass: "", IscompleteInputs: true });
    } else if (Inputsign.password != Inputsign.ConfirmPassword) {
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
          <InputLabel
            htmlFor="standard-adornment-password"
            sx={{ marginLeft: "5px" }}
          >
            Name
          </InputLabel>
          <Input
            type="text"
            name="name"
            id="standard-basic"
            value={Inputsign.full_name}
            onChange={(event) => {
              setInputSign({ ...Inputsign, full_name: event.target.value });
            }}
          />
        </FormControl>

        <FormControl>
          <InputLabel
            htmlFor="standard-adornment-password"
            sx={{ marginLeft: "5px" }}
          >
            Email
          </InputLabel>
          <Input
            // html input attribute
            type="email"
            variant="standard"
            id="standard-basic"
            value={Inputsign.email}
            onChange={(event) => {
              setInputSign({ ...Inputsign, email: event.target.value });
            }}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="standard-adornment-password">
            Password
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
            value={Inputsign.password}
            onChange={(event) => {
              setInputSign({ ...Inputsign, password: event.target.value });
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
              <InputAdornment position="end" sx={{ mb: 0.5 }}>
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
            value={Inputsign.ConfirmPassword}
            onChange={(event) => {
              setInputSign({
                ...Inputsign,
                ConfirmPassword: event.target.value,
              });
            }}
          />
          <InputLabel
            color="error"
            sx={{
              mt: 7.5,
            }}
          >
            {ErrorPassword.ErrorPass}
          </InputLabel>
        </FormControl>
        <FormControl>
          <InputLabel
            htmlFor="standard-adornment-password"
            sx={{ marginLeft: "5px" }}
          >
            Date of Birth
          </InputLabel>

          <Input
            type="date"
            value={Inputsign.Birth_of_day}
            onChange={(event) => {
              setInputSign({
                ...Inputsign,
                Birth_of_day: event.target.value,
              });
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
          onClick={handlesignUP}
          disabled={ErrorPassword.IscompleteInputs}
        >
          Sign In
        </Button>
        <Typography>
          have an account?
          <Link
            to="/login"
            sx={{ marginLeft: "5px", fontSize: "md", alignSelf: "felx-end" }}
          >
            Login
          </Link>
        </Typography>
      </Card>
    </>
  );
}
