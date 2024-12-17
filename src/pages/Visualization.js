import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  createTheme,
  TableContainer,
  ThemeProvider,
  Typography,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
} from "@mui/material";
import { Container } from "@mui/system";
import TokenGraph from "../components/Token_graph";
const Visualization_table = () => {
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
  const location = useLocation();
  const { tokenAddress, walletAddress, symbol } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/transactions/all/${tokenAddress}/${walletAddress}/${symbol}`
        );
        console.log("transactions---->", res.data);

        if (res.data) {
          setTransactions(res.data); // Set to empty array if undefined
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setTransactions([]); // Fallback to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tokenAddress, walletAddress, symbol]);
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4" style={{ margin: 18, fontFamily: "ui-serif" }}>
          Visualization by Alchemy API
        </Typography>
      </Container>
      <div style={{ display: "flex", justifyContent: "center", width: "90%" }}>
        <TokenGraph tokenAddress={tokenAddress} />
      </div>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <TableContainer component={Paper} style={{ width: "80%" }}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Creation Time", "Amount", "Status"].map((head) => (
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
                {transactions.length > 0 ? (
                  transactions.map((item) => {
                    return (
                      <TableRow key={item.name} style={rowStyle}>
                        {/* <TableCell align="center">{item.hash}</TableCell> */}
                        <TableCell align="center">{item.timestamp}</TableCell>
                        <TableCell align="center">{item.amount}</TableCell>
                        <TableCell align="center">{item.status}</TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <h1
                        style={{
                          color: "white",
                          fontFamily: "inherit",
                          fontSize: "20px",
                        }}
                      >
                        Aucune transaction
                      </h1>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </div>
    </ThemeProvider>
  );
};

export default Visualization_table;
