import React from "react";
import { Typography, AppBar } from "@material-ui/core";
import VideoPlayer from "./components/VideoPlayer";
import Notifications from "./components/Notifications";
import Options from "./components/Options";
import { makeStyles } from "@material-ui/core/styles";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const user = localStorage.getItem("userInfo");
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
