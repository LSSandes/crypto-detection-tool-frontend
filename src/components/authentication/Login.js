import { TextField, Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Box } from "@mui/system";
import { auth } from "../../firebase";
import { CryptoState } from "../../CryptoContext";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ handleClose }) => {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    // Check if email or password is empty
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all fields",
        type: "error",
      });
      return;
    }
    //
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // result is an object
      // alert success
      setAlert({
        open: true,
        message: `login successfull. Welcome, ${result.user.email}`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };
  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        label="Enter your email"
        name="email"
        value={email}
        variant="outlined"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        fullWidth
      />

      <TextField
        label="Enter your password"
        name="password"
        type="password"
        value={password}
        variant="outlined"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{
          backgroundColor: "#EEBC1D",
        }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
