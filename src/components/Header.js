import React, { useState } from "react";
import { display, styled } from "@mui/system";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Container,
  Typography,
  Toolbar,
  Select,
  MenuItem,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import AuthModal from "./authentication/AuthModal";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import UserSidebar from "./authentication/UserSidebar";
import "./style.css";
const Header = () => {
  const navigate = useNavigate();

  // Importing the context API
  const { currency, setCurrency, user } = CryptoState();
  console.log(currency);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  const TextHeading = styled(Typography)({
    color: "gold",
    fontSize: "2rem",
    fontWeight: "bold",
    cursor: "pointer",
    textAlign: "center"
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <TextHeading
              onClick={() => {
                navigate("/");
              }}
              variant="h6"
            >
              Jeff Detection Tool
            </TextHeading>
            <div style={{display: "flex", flex: '1', justifyContent: "center"}}>
              <NavLink exact to="/" className="nav-link">
                PROJECT DETECTION
              </NavLink>
              <NavLink to="/about" className="nav-link">
                VISUALIZATION
              </NavLink>
              <NavLink to="/wallet" className="nav-link">
                WALLET TRACKING
              </NavLink>
              <NavLink to="/contact" className="nav-link">
                NEW PROJECTS
              </NavLink>
            </div>
            {/* <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
              onChange={(e) => {
                setCurrency(e.target.value);
              }}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select> */}
            {/* AuthModal component for login or signup*/}
            {user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
