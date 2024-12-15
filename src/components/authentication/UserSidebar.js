import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { CryptoState } from "../../CryptoContext";
import { Avatar, Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { numberWithCommas } from "../banner/Carousel";
import {AiFillDelete} from 'react-icons/ai'
import { doc, setDoc } from "firebase/firestore";
import {db} from '../../firebase'

export default function UserSidebar() {
  const [state, setState] = React.useState({ right: false });

  const containerStyle = {
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospace",
  };
  const profileStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%",
  };

  const pictureStyle = {
    width: 200,
    height: 200,
    cursor: "pointer",
    objectFit: "contain",
    backgroundColor: "#EEBC1D",
  };
  
  const logoutStyles = {
    height: "8%",
    width: "100%",
    marginTop: 20,
    cursor: "pointer",
    backgroundColor: "#EEBC1D",
  };
  
  const watchlistStyles = {
    flex: 1,
    width: "100%",
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "scroll",
  };
  
  const coinStyles = {
    padding: 10,
    borderRadius: 5, 
    color: "black",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#EEBC1D",
    boxShadow: "0 0 3px black"
  }

  //   getting the user from the context
  const { user, setAlert, watchList, coins, symbol } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout successfull!",
    });
    toggleDrawer();
  };

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user?.uid);
    try {
      // if there is something in the watchlist, it is going to append it, else add single coin coin.id
      await setDoc(
        coinRef,
        {
          coins: watchList.filter((watch) => {
            return watch !== coin?.id;
          }),
        },
        { merge: "true" }
      );

      // set alert that coin has been added
      setAlert({
        open: true,
        message: `${coin?.name} removed to the watchlist`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };


  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* This avatar is for user image on the header. */}
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
            src={user.photoURL}
            alt={user.displaName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div style={containerStyle}>
              <div style={profileStyle}>
                <Avatar
                  style={pictureStyle}
                  src={user.photoURL}
                  alt={user.displaName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displaName || user.email}
                </span>
                <div style={watchlistStyles}>
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    Watchlist
                  </span>
                  {coins.map((coin) => {
                    if(watchList.includes(coin.id)){
                      return (
                        <div style={coinStyles}>
                          {/* coin name */}
                          <span>
                            {coin.name}
                          </span>
                          {/* coin price */}
                          <span style={{
                            display:"flex",
                            gap: 8,
                          }}>
                            {symbol}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <AiFillDelete
                            style={{cursor:"pointer"}}
                            fontSize="16"
                            onClick = {() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
              {/* button for log out */}
              <Button variant="contained" style={logoutStyles} onClick={logOut}>
                Logout
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
