import React from "react";
import { Typography, AppBar } from "@material-ui/core";
import VideoPlayer from "./components/VideoPlayer";
import Notifications from "./components/Notifications";
import Options from "./components/Options";
import { makeStyles } from "@material-ui/core/styles";
import Home from "./screens/Home";

import Login from "./screens/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Call from "./screens/Call";
const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 100px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "600px",
    border: "2px solid black",

    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  image: {
    marginLeft: "15px",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));
function App() {
  const user = localStorage.getItem("userInfo");
  const classes = useStyles();
  return (
    // <div className={classes.wrapper}>
    //   <AppBar position="static" className={classes.appBar}>
    //     <Typography variant="h2" align="center">
    //       Video chat
    //     </Typography>
    //   </AppBar>
    //   <VideoPlayer />

    //   <Options>
    //     <Notifications />
    //   </Options>
    // </div>
    // <Home />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/call" element={<Call />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
