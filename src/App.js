import "./App.css";
import Header from "./components/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CoinPage from "./pages/CoinPage";
import { styled } from "@mui/system";
import Alert from "./components/Alert";
import Visualization_table from "./pages/Visualization";

function App() {
  const MyComponent = styled("div")({
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
    padding: 8,
    borderRadius: 4,
  });

  // const classes = useStyles()
  return (
    <>
      <BrowserRouter>
        <MyComponent>
          <Header />
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/coins/:id" element={<CoinPage />} />
            <Route exact path="/visualization" element={<Visualization_table/>} />
          </Routes>
        </MyComponent>
        <Alert/>
      </BrowserRouter>
    </>
  );
}

export default App;
