import React, { useContext, useState, useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";
import { BsCameraVideo, BsCameraVideoOff } from "react-icons/bs";
import { FaRegClosedCaptioning } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { SocketContext } from "../SocketContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import { MdContentCopy } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import {
  MdInfoOutline,
  MdOutlinePeopleAlt,
  MdOutlineChat,
  MdCallEnd,
  MdOutlineScreenShare,
} from "react-icons/md";
import "./call.scss";
const Call = () => {
  const [closeId, setCloseId] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isPm, setIsPm] = useState("AM");
  const [hr, setHr] = useState(0);
  const [ans, setAns] = useState(false);
  const [min, setMin] = useState(0);
  const validateDate = () => {
    var today = new Date();

    setMin(today.getMinutes());
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    console.log(dateTime);
    if (today.getHours() > 12) {
      setIsPm("PM");
      const updateTime = today.getHours() - 12;
      setHr(updateTime);
    } else {
      setIsPm("AM");
      setHr(today.getHours());
    }
  };
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const {
    me,
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    leaveCall,
    name,
    callEnded,
    answerCall,
  } = useContext(SocketContext);
  console.log(myVideo);
  console.log(call.isReceivingCall);

  //   const secondUser = callAccepted;
  const [secondUser, setSecond] = useState(false);
  const navigation = useNavigate();
  const [hideVideo, setHideVideo] = useState(false);

  useEffect(() => {
    if (call.isReceivingCall && !callAccepted) {
      setIsOpen(true);
      console.log(callAccepted, "kelo re accept??");
      setSecond(callAccepted);
      console.log(userVideo);
    }
    validateDate();
  }, [call.isReceivingCall, callAccepted]);
  return (
    <section className="callSection">
      <video
        ref={userVideo}
        playinline
        autoPlay
        muted
        style={{
          width: "300px",
          height: "400px",
          display: "none",
        }}
      ></video>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Incoming call
            </AlertDialogHeader>

            <AlertDialogBody style={{ textTransform: "capitalize" }}>
              {call.name} is trying to join...
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} colorScheme="red" onClick={onClose}>
                Reject
              </Button>
              <Button
                ml={3}
                onClick={() => {
                  answerCall();
                  setSecond(true);
                }}
              >
                Accept
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <div className="callWrapper">
        <div className="copyId" style={{ opacity: closeId ? 0 : 1 }}>
          <div className="idWrapper">
            <div className="top">
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 400,
                  color: "#444",
                  textTransform: "capitalize",
                }}
              >
                Your meeting is ready
              </span>

              <span>
                <CgClose
                  onClick={() => {
                    setCloseId(!closeId);
                  }}
                  style={{ fontSize: 20, color: "#666", cursor: "pointer" }}
                />
              </span>
            </div>
            <div className="bottom">
              <span>Share this id with others you want in the meeting.</span>
              <div className="idBox">
                {me}
                <CopyToClipboard text={me}>
                  <MdContentCopy
                    style={{ color: "#fff", fontSize: 18, cursor: "pointer" }}
                  />
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </div>
        {!secondUser ? (
          <div className="mainUser">
            <img
              src="https://yt3.ggpht.com/ytc/AKedOLQMxO5ybJytpgAsgyYDiMw2lrUpVGo1YZddOKEljQ=s900-c-k-c0x00ffffff-no-rj"
              alt=""
              className="userAvatar"
              style={{ opacity: hideVideo ? 1 : 0 }}
            />

            <video
              playinline="true"
              ref={myVideo}
              autoPlay
              muted
              style={{
                width: "100%",
                height: "100%",
                display: hideVideo ? "none" : "flex",
              }}
            ></video>
            <span className="userName">{name}</span>
          </div>
        ) : (
          <section
            style={{
              width: "96%",
              height: "86%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <div className="mainUser" style={{ width: "48%" }}>
              <img
                src="https://yt3.ggpht.com/ytc/AKedOLQMxO5ybJytpgAsgyYDiMw2lrUpVGo1YZddOKEljQ=s900-c-k-c0x00ffffff-no-rj"
                alt=""
                className="userAvatar"
                style={{ opacity: hideVideo ? 1 : 0 }}
              />

              <video
                playinline="true"
                muted
                ref={myVideo}
                autoPlay
                style={{
                  width: "100%",
                  height: "100%",
                  display: hideVideo ? "none" : "flex",
                }}
              ></video>
              <span className="userName">{name}</span>
            </div>
            <div className="mainUser" style={{ width: "48%" }}>
              <img
                src="https://yt3.ggpht.com/ytc/AKedOLQMxO5ybJytpgAsgyYDiMw2lrUpVGo1YZddOKEljQ=s900-c-k-c0x00ffffff-no-rj"
                alt=""
                className="userAvatar"
                style={{ opacity: hideVideo ? 1 : 0 }}
              />

              <video
                playinline="true"
                ref={userVideo}
                autoPlay
                style={{
                  width: "100%",
                  height: "100%",
                  display: hideVideo ? "none" : "flex",
                }}
              ></video>
              <span className="userName">{call.name}</span>
            </div>
          </section>
        )}
      </div>
      <div className="bottomNavigation">
        <div className="time">
          <h3>
            {hr}:{min} {isPm} | gdb-vm-cu
          </h3>
        </div>
        <div className="options">
          <div className="iconsMain">
            <FaMicrophone className="optionsIcons" stlye={{ fontSize: 16 }} />
          </div>
          <div
            className="iconsMain"
            onClick={() => {
              setHideVideo(!hideVideo);
            }}
          >
            {hideVideo ? (
              <BsCameraVideoOff
                className="optionsIcons"
                style={{ color: "red" }}
              />
            ) : (
              <BsCameraVideo className="optionsIcons" />
            )}
          </div>
          <div className="iconsMain">
            <FaRegClosedCaptioning className="optionsIcons" />
          </div>
          <div className="iconsMain">
            <MdOutlineScreenShare className="optionsIcons" />
          </div>
          <div
            className="iconsMain"
            onClick={() => {
              setCloseId(!closeId);
            }}
          >
            <HiDotsVertical className="optionsIcons" />
          </div>
          <div
            className="endCall"
            onClick={() => {
              leaveCall();
              navigation("/");
            }}
          >
            <MdCallEnd style={{ color: "#fff", fontSize: 20 }} />
          </div>
        </div>
        <div className="right">
          <MdInfoOutline className="rightIcons" />
          <MdOutlinePeopleAlt className="rightIcons" />

          <MdOutlineChat className="rightIcons" />
        </div>
      </div>
    </section>
  );
};

export default Call;
