import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { AppBar } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";

const AuthModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { setAlert } = CryptoState();

  //   const [value, setValue] = React.useState(0);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const buttonStyles = {
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1rem",
    width: 85,
    height: 40,
    backgroundColor: "#EEBC1D",
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    p: 2,
    color: "white",
  };

  const googleStyles = {
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20,
  };

  // Google
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up successfull, Welcome ${res.user.email}`,
          type: "success",
        });
        handleClose();
      })
      .catch((err) => {
        setAlert({
          open: true,
          message: err.message,
          type: "error",
        });
      });
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen} style={buttonStyles}>
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AppBar
            position="static"
            style={{ backgroundColor: "transparent", color: "white" }}
          >
            <Tabs
              // The value variable will be 0 if we press login and 1 for signup.
              value={value}
              variant="fullWidth"
              onChange={handleChange}
              style={{ borderRadius: 10 }}
            >
              <Tab label="Login" />
              <Tab label="SignUp" />
            </Tabs>

            {/* Switching tabs for login and signup */}
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}

            <Box style={googleStyles}>
              <span>OR</span>
              <GoogleButton
                style={{
                  width: "100%",
                  outline: "none",
                }}
                onClick={signInWithGoogle}
              />
            </Box>
          </AppBar>
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModal;
