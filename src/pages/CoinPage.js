import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import {
  ThemeProvider,
  LinearProgress,
  useMediaQuery,
  createTheme,
} from "@mui/material";
import CoinChart from "../components/CoinChart";
import Coin_Info from "../components/Coin_Info";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });

  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const containerStyles = {
    display: "flex",
    ...(isMdScreen && {
      flexDirection: 'column', 
      alignItems: 'center',
    }),
    marginTop: 50,
  };

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <ThemeProvider theme={theme}>
      <div style={containerStyles}>
        {/* Coin Info */}
        <Coin_Info coin = {coin}/>
        {/* Chart */}
        <CoinChart coin = {coin}/>
      </div>
    </ThemeProvider>
  );
};

export default CoinPage;
