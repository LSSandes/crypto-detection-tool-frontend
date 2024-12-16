import axios from "axios";
import { CryptoState } from "../CryptoContext";
import React, { useState, useEffect } from "react";
import {
  createTheme,
  TableContainer,
  TextField,
  ThemeProvider,
  Typography,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { Container, style } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./banner/Carousel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Coins_table = () => {
  const navigate = useNavigate();
  const { currency, symbol, coins, fetchCoins } = CryptoState();
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });
  const rowStyle = {
    backgroundColor: "#16171a",
    fontFamily: "Montserrat",
    "&:hover": {
      backgroundColor: "#131111",
    },
    cursor: "pointer",
  };
  const [tokensData, setTokensData] = useState();
  const [loading, setLoading] = useState(false);
  const handleSearch = () => {
    setLoading(true);
    localStorage.removeItem('tokens');
    axios
      .post("https://crypto-detection-tool-backend.onrender.com/api/tokens/all", {
        startDate: selectedStartDate,
        endDate: selectedEndDate,
      })
      .then((res) => {
        console.log(res.data);
        axios
          .post("https://crypto-detection-tool-backend.onrender.com/api/tokens/find", {
            results: res.data,
            startValue: selectedStartValue,
            endValue: selectedEndValue,
          })
          .then((res) => {
            console.log("--------found!----->", res.data);
            setTokensData(res.data);
            localStorage.setItem('tokens',JSON.stringify(res.data));
            setLoading(false);
            // setTokensData(res.data);
            setAlertText("Search results successfully!");
            setAlertOpen(true);
            setAlertOpen("success");
          });
      })
      .catch((error) => {
        console.log(error);
        setAlertText("Network error! Too many requests");
        setAlertOpen(true);
        setAlertOpen("warning");
      });
  };
  useEffect(() => {
    setTokensData(JSON.parse(localStorage.getItem('tokens')));
  }, [tokensData])
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedStartValue, setSelectedStartValue] = useState(0);
  const [selectedEndValue, setSelectedEndValue] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertStatus, setAlertStatus] = useState("success");
  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };
  const handleClick = (tokenAddress, walletAddress, symbol) => {
    const dataTransfer = {
      tokenAddress: tokenAddress,
      walletAddress: walletAddress,
      symbol: symbol,
    };
    navigate("/visualization", { state: dataTransfer });
  };
  console.log("----------------------->", tokensData);
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center"}}>
          <Typography
            variant="h4"
            style={{ margin: 18, fontFamily: "ui-serif" }}
          >
            Cryptocurrency prices by Dextools.io
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "80%",
                margin: "10px",
              }}
            >
              <h1
                style={{
                  color: "white",
                  fontSize: "20px",
                  fontStyle: "-moz-initial",
                  width: "35%",
                }}
              >
                Ages du projet en jours: entre
              </h1>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={selectedStartDate}
                  onChange={handleStartDateChange}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={selectedEndDate}
                  onChange={handleEndDateChange}
                />
              </LocalizationProvider>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "80%",
                margin: "20px",
              }}
            >
              <h1
                style={{
                  color: "white",
                  fontSize: "20px",
                  fontStyle: "-moz-initial",
                  width: "35%",
                }}
              >
                Liqquidite entre
              </h1>
              <TextField
                label="min"
                variant="standard"
                type="number"
                style={{ width: "20%" }}
                value={selectedStartValue}
                onChange={(e) => setSelectedStartValue(e.target.value)}
              />
              <TextField
                label="max"
                variant="standard"
                type="number"
                stype={{ width: "20%" }}
                value={selectedEndValue}
                onChange={(e) => setSelectedEndValue(e.target.value)}
              />
            </div>
            <Button
              variant="outlined"
              style={{ width: "40%", margin: "20px" }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
          <TableContainer component={Paper}>
            {loading ? (
              <LinearProgress style={{ backgroundColor: "gold" }} />
            ) : (
              <Table>
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                  <TableRow>
                    {[
                      "Coin",
                      "Holders",
                      "Liquidity",
                      "Exchange",
                      "Pair",
                      "Creation Date",
                      "Token Address",
                      "Pool Address",
                    ].map((head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "ui-serif",
                        }}
                        key={head}
                        align={"center"}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tokensData &&
                    tokensData?.map((item) => {
                      return (
                        <TableRow
                          key={item.name}
                          style={rowStyle}
                          onClick={() =>
                            handleClick(
                              item.token_address,
                              item.pool_address,
                              item.symbol
                            )
                          }
                        >
                          <TableCell align="center">{item.name}</TableCell>
                          <TableCell align="center">{item.holders}</TableCell>
                          <TableCell align="center">{item.liquidity}</TableCell>
                          <TableCell align="center">N/A</TableCell>
                          <TableCell align="center">{item.symbol}</TableCell>
                          <TableCell align="center">
                            {item.creationTime}
                          </TableCell>
                          <TableCell align="center">
                            {item.token_address}
                          </TableCell>
                          <TableCell align="center">
                            {item.pool_address}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          {!tokensData && (
            <h1
              style={{ color: "white", fontFamily: "inherit", fontSize: "20" }}
            >
              Aucun jeton, veuillez rechercher les jetons que vous souhaitez.
            </h1>
          )}
        </Container>
      </ThemeProvider>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alertOpen}
        autoHideDuration={5000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertStatus}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertText}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Coins_table;
