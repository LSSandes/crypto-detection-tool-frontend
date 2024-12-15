import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { HistoricalChart } from "../config/api";
import { chartDays } from "../config/data";
import Chart from 'chart.js/auto';
import {
  CircularProgress,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import SelectButton from "./SelectButton";

const CoinChart = (props) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(
      HistoricalChart(props.coin?.id, days, currency)
    );
    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  // console.log(props.coin?.id);
  // console.log(historicalData);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

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
  const containerStyle = {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    ...(isMdScreen && {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    }),
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={containerStyle}>
        {!historicalData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          ></CircularProgress>
        ) : (
          <>
            <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
                      : `${date.getHours()} : ${date.getMinutes()} AM`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price (past ${days} Days) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            ></Line>
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => {
                return (
                  <SelectButton
                    key={day.value}
                    onClick={() => {
                      setDays(day.value);
                    }}
                    selected={day.value === days}
                  >
                    {day.label}
                  </SelectButton>
                );
              })}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinChart;
