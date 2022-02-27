import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const socket = io("http://localhost:8000");
const ContextProvider = ({ children }) => {
  const [me, setMe] = useState("");
  const [name, setName] = useState("");
  const [stream, setStream] = useState(null);
  console.log("bruh from top zb!");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const myVideo = useRef();
  console.log(myVideo);
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((response) => {
        console.log(response);
        setStream(response);
        myVideo.current.srcObject = response;
        console.log(myVideo);
      })
      .catch((error) => {
        console.log(error);
      });
    socket.on("me", (id) => {
      setMe(id);
    });
    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);
  const answerCall = () => {
    console.log("answering call");
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });
    peer.on("stream", (currentStream) => {
      console.log(userVideo);
      console.log(currentStream);
      userVideo.current.srcObject = currentStream;
    });
    peer.signal(call.signal);

    connectionRef.current = peer;
    console.log(callAccepted, "kelo answer???");
  };

  const callUser = (id) => {
    console.log(id);
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      console.log(callAccepted);
      console.log("kelo re acc!!");
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };
  const leaveCall = () => {
    setCallEnded(true);
    console.log("cut the phone");
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
