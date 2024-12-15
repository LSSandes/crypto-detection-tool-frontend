import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const TokenGraph = ({ tokenAddress }) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  const ALCH_API_KEY = "o1PIlhZ6EkQptJvpHrGifCeL1Hjjb-gx"; // Replace with your Alchemy API key

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const options = {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          data: {
            addresses: [{ network: "eth-mainnet", address: tokenAddress }],
          },
        };
        await axios(
          `https://api.g.alchemy.com/prices/v1/${ALCH_API_KEY}/tokens/by-address`,
          options
        ).then((response) => {
          const prices = response.data.data[0].prices[0]; // Adjust according to actual response structure
          const labels = new Date(prices.lastUpdatedAt).toLocaleDateString()
          const dataValues = prices.value;
          console.log("---price -->", response.data.data[0].prices[0]);
          setChartData({
            labels: labels,
            datasets: [
              {
                label: "Token Price",
                data: dataValues,
                fill: false,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
              },
            ],
          });
        });
      } catch (error) {
        console.error("Error fetching token data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ width: "80%"}}>
      <h2>Token Price Graph</h2>
      <Line
        data={chartData}
        options={{
          scales: {
            x: {
              grid: {
                color: "rgba(226, 215, 217, 0.81)", // Customize x-axis grid color
              },
            },
            y: {
              grid: {
                color: "rgba(212, 223, 231, 0.87)", // Customize y-axis grid color
              },
            },
          },
        }}
      />
    </div>
  );
};

export default TokenGraph;
