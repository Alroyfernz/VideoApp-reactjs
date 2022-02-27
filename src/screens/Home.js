import React, { useState, useEffect, useRef, useContext } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { MdOutlineVideoCall } from "react-icons/md";
import "./Home.scss";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { FaMicrophone } from "react-icons/fa";
import { BsCameraVideo, BsCameraVideoOff } from "react-icons/bs";
import {
  MdInfoOutline,
  MdOutlinePeopleAlt,
  MdOutlineChat,
  MdCallEnd,
  MdOutlineScreenShare,
} from "react-icons/md";
import { FaRegClosedCaptioning } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  Spinner,
  useDisclosure,
  button,
  MenuDivider,
} from "@chakra-ui/react";
import { BsKeyboard } from "react-icons/bs";
import { SocketContext } from "../SocketContext";
const Home = () => {
  const [showCall, setShowCall] = useState(false);
  const navigation = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const [isJoin, setIsJoin] = useState(false);
  const [user, setUser] = useState(null);
  const [showSpinner, setSpin] = useState(false);
  const callIdRef = useRef(null);
  const [showMod, setMod] = useState(false);
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
  const { callAccepted, setName, callUser, stream, me, userVideo, myVideo } =
    useContext(SocketContext);
  console.log(myVideo);
  // if (myVideo) localStorage.setItem("myVideo", JSON.stringify(myVideo));
  const handleCall = () => {
    setShowCall(true);
    console.log("how tf called?");
    console.log(callIdRef?.current.value);
    // if (callIdRef?.current.value == "") return;
    callUser(callIdRef?.current.value);
    setSpin(false);
    console.log(callAccepted, "accepted? from home");
    if (callAccepted) {
      setSpin(false);
      navigation("/call");
    }
  };
  useEffect(() => {
    validateDate();
    const getUser = async () => {
      // fetch("http://localhost:8000/login/success", {
      //   method: "GET",
      //   credentials: "include",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //     "Access-Control-Allow-Credentials": "true",
      //   },
      // })
      //   .then((response) => {
      //     if (response.status === 200) return response.json();
      //     throw new Error("authentication has been failed!");
      //   })
      //   .then((resObject) => {
      //     setUser(resObject.user);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      const res = await axios.get("http://localhost:8000/login/success", {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("userData", JSON.stringify(res.data.user));
        // setName(res.data.user.)
        setUser(res.data.user);
        setName(res?.data.user.displayName);
        console.log(user);
      }
    };
    getUser();
    if (localStorage.getItem("userData") == null) {
      console.log("bruh zaina");
      navigation("/login");
    }
  }, [navigation]);

  return (
    <>
      <Navbar />
      <div className="heroSection">
        <div
          style={{
            display: showCall ? "flex" : "none",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
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
                  alroy is trying to join...
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button colorScheme="red" ref={cancelRef} onClick={onClose}>
                    Reject
                  </Button>
                  <Button ml={3}>Accept</Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
          <div className="copyId">
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
          <div className="videoContainer">
            <video
              ref={myVideo}
              playinline
              autoPlay
              muted
              style={{
                borderRadius: 9,
                display: !showCall ? "none" : "block",
              }}
            />
            <video
              playinline
              src="https://youtu.be/5qap5aO4i9A"
              autoPlay
              muted
            />
          </div>
          <div className="bottomNavigation">
            <div className="time">
              <h3>
                {hr}:{min} {isPm} | gdb-vm-cu
              </h3>
            </div>
            <div className="options">
              <div className="iconsMain">
                <FaMicrophone
                  className="optionsIcons"
                  stlye={{ fontSize: 16 }}
                />
              </div>
              <div className="iconsMain">
                <BsCameraVideo className="optionsIcons" />
              </div>
              <div className="iconsMain">
                <FaRegClosedCaptioning className="optionsIcons" />
              </div>
              <div className="iconsMain">
                <MdOutlineScreenShare className="optionsIcons" />
              </div>
              <div className="iconsMain">
                <HiDotsVertical className="optionsIcons" />
              </div>
              <div className="endCall">
                <MdCallEnd
                  style={{ color: "#fff", fontSize: 20 }}
                  onClick={() => {
                    setShowCall(false);
                  }}
                />
              </div>
            </div>
            <div className="right">
              <MdInfoOutline className="rightIcons" />
              <MdOutlinePeopleAlt className="rightIcons" />

              <MdOutlineChat className="rightIcons" />
            </div>
          </div>
        </div>

        <div
          className="heroWrapper"
          style={{ display: showCall ? "none" : "flex" }}
        >
          <div className="heroLeft">
            <h1>
              Premium video calling <br />
              Now free for everyone
            </h1>
            <p>
              We re-engineered the service we built for secure business
              meetings, Google Meet, to make it free and available for all.
            </p>
            <div className="bottomButtons">
              <button
                className="createMeet"
                onClick={() => {
                  setShowCall(true);
                }}
              >
                <MdOutlineVideoCall className="video" />
                <a>new meeting</a>
              </button>

              <div className="inputWrapper">
                <div className="inputMeeting" style={{ width: "70%" }}>
                  <BsKeyboard className="keyboard" />
                  <input
                    type="text"
                    placeholder="Enter a code"
                    onFocus={() => {
                      setIsJoin(true);
                    }}
                    ref={callIdRef}
                    onBlur={() => {
                      setIsJoin(false);
                    }}
                  />
                </div>
                <button
                  className="joinBtn"
                  onClick={handleCall}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="heroRight">
            <div className="rightWrapper">
              <div>
                <img
                  src="https://www.gstatic.com/meet/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg"
                  alt=""
                />
                <h3>Get a code you can share</h3>
                <p>
                  Click{" "}
                  <span style={{ fontWeight: 500, color: "#000" }}>
                    New meeting{" "}
                  </span>{" "}
                  to get a code which you can ahre with the people you want to
                  meet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
