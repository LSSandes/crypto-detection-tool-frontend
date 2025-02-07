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
import moment from "moment";

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
    localStorage.removeItem("tokens");
    axios
      .post("http://localhost:5000/api/tokens/all", {
        startDate: selectedStartDate,
        endDate: selectedEndDate,
      })
      .then((res) => {
        console.log(res.data);
        axios
          .post("http://localhost:5000/api/tokens/find", {
            results: res.data,
            startValue: selectedStartValue,
            endValue: selectedEndValue,
          })
          .then((res) => {
            console.log("--------found!----->", res.data);
            setTokensData(res.data);
            localStorage.setItem("tokens", JSON.stringify(res.data));
            setLoading(false);
            // setTokensData(res.data);
            setAlertText("Search results successfully!");
            setAlertOpen(true);
            setAlertStatus("success");
          });
      })
      .catch((error) => {
        console.log(error);
        setAlertText("Network error! Too many requests");
        setAlertOpen(true);
        setAlertStatus("warning");
      });
  };
  useEffect(() => {
    setTokensData(JSON.parse(localStorage.getItem("tokens")));
  }, [tokensData]);
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

  const formatTokenPrice = (value) => {
    if (value != 0) {
      const number = Number(value);
      const formattedValue = number.toFixed(18);
      const [integerPart, fractionalPart] = formattedValue.split(".");
      const leadingZerosCount = fractionalPart.match(/^0*/)[0].length - 1;
      const nonZeroDigits = fractionalPart.replace(/0/g, "").split("").join("");
      const formattedPrice = `$0.${fractionalPart}`;
      return {
        formattedPrice: "$0.0",
        leadingZerosCount,
        nonZeroDigits,
      };
    } else {
      return {
        formattedPrice: "$0",
        leadingZerosCount: "",
        nonZeroDigits: "",
      };
    }
  };
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div style={{ textAlign: "center", margin: "100px" }}>
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
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "80%",
                margin: "10px",
                flexDirection: window.innerWidth <= 1200 ? "column" : "row",
                gap: "30px",
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <h1
                  style={{
                    fontFamily: "inherit",
                    fontSize: "20px",
                    color: "white",
                  }}
                >
                  Start Date
                </h1>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={selectedStartDate}
                    onChange={handleStartDateChange}
                  />
                </LocalizationProvider>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <h1
                  style={{
                    fontFamily: "inherit",
                    fontSize: "20px",
                    color: "white",
                  }}
                >
                  End Date
                </h1>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={selectedEndDate}
                    onChange={handleEndDateChange}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "80%",
                margin: "20px",
                flexDirection: window.innerWidth <= 1200 ? "column" : "row",
                gap: "30px",
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <h1
                  style={{
                    fontFamily: "inherit",
                    fontSize: "20px",
                    color: "white",
                  }}
                >
                  Min Value
                </h1>
                <TextField
                  label="min ($)"
                  variant="standard"
                  type="number"
                  value={selectedStartValue}
                  onChange={(e) => setSelectedStartValue(e.target.value)}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <h1
                  style={{
                    fontFamily: "inherit",
                    fontSize: "20px",
                    color: "white",
                  }}
                >
                  Max Value
                </h1>
                <TextField
                  label="max ($)"
                  variant="standard"
                  type="number"
                  value={selectedEndValue}
                  onChange={(e) => setSelectedEndValue(e.target.value)}
                />
              </div>
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
                <TableHead style={{ backgroundColor: "rgb(51, 51, 51)" }}>
                  <TableRow>
                    {[
                      "Coin",
                      "Holders",
                      "Liquidity",
                      "Pair",
                      "Creation Date",
                      "Token Address",
                      "Pool Address",
                    ].map((head) => (
                      <TableCell
                        style={{
                          color: "white",
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
                          <TableCell align="center" style={{color: "rgb(206, 248, 255)"}}>{item.name}</TableCell>
                          <TableCell align="center" style={{color: "rgb(206, 248, 255)"}}>{item.holders}</TableCell>
                          <TableCell align="center">
                            {item.liquidity < 0.00001 ? (
                              <>
                                <span style={{ fontSize: "14px", color: "rgb(255, 172, 146)"}}>
                                  {
                                    formatTokenPrice(item.liquidity)
                                      .formattedPrice
                                  }
                                </span>
                                <span style={{ fontSize: "8px", color: "rgb(255, 172, 146)" }}>
                                  {
                                    formatTokenPrice(item.liquidity)
                                      .leadingZerosCount
                                  }
                                </span>
                                <span style={{ fontSize: "14px", color: "rgb(255, 172, 146)" }}>
                                  {
                                    formatTokenPrice(item.liquidity)
                                      .nonZeroDigits
                                  }
                                </span>
                              </>
                            ) : (
                              <span style={{fontSize: "14px", color: "rgb(206, 248, 255)"}}>{item.liquidity}</span>
                            )}
                          </TableCell>
                          <TableCell align="center" style={{color: "rgb(206, 248, 255)"}}>{item.symbol}</TableCell>
                          <TableCell align="center" style={{color: "rgb(206, 248, 255)"}}>
                            {moment(item.creationTime).format(
                              "MMM DD HH:mm:ss"
                            )}
                          </TableCell>
                          <TableCell align="center" style={{color: "rgb(206, 248, 255)"}}>
                            {item.token_address}
                          </TableCell>
                          <TableCell align="center" style={{color: "rgb(206, 248, 255)"}}>
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
        </div>
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
