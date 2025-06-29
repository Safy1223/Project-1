import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { Card } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
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
    if (Inputsign.password == "" || Inputsign.ConfirmPassword == "") {
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

  const handleEditPassword = async () => {
    const { error } = await supabase.auth.updateUser({
      password: Inputsign.password,
    });
    if (error) {
      alert(error.message);
    } else {
      alert("Done");
      await supabase.auth.signOut();
      Navigate("/login");
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <>
      <div>
        <Typography variant="h4">
          <b>Change Password</b>
        </Typography>
      </div>
      <Card
        sx={{
          background: "#ffffff",
          color: "black",
          boxShadow: 8,
          width: 400,
          mx: "auto", // margin left & right
          my: 6, // margin top & bottom
          py: 9, // padding top & bottom
          px: 2, // padding left & right
          display: "flex",
          flexDirection: "column",
          gap: 4,
          borderRadius: "12px",
          maxWidth: 545,
          height: 350,
        }}
        variant="outlined"
      >
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

        <Button
          sx={{
            mt: 1,
            fontSize: "15px " /* margin top */,
            bgcolor: "primary",
          }}
          variant="contained"
          onClick={handleEditPassword}
          disabled={ErrorPassword.IscompleteInputs}
        >
          Change
        </Button>
      </Card>
    </>
  );
}
