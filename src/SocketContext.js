import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const socket = io("http://localhost:8000");
const ContextProvider = ({ chlidren }) => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState(null);
  const [call, setCall] = useState({});
  const myVideo = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((response) => {
        setStream(response);
        myVideo.current.srcObject = response;
      })
      .catch((error) => {
        console.log(error);
      });
    socket.on("me", (id) => {
      setMe(id);
    });
    socket.on("callUser", ({ from, name: callerName, singal }) => {
      setCall({ isReceivedVall: true, from, name: callerName, singal });
    });
  }, []);
  const answerCall = () => {};

  const callUser = () => {};
  const leaveCall = () => {};
};
