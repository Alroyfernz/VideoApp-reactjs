import React, { useState, useEffect, useRef, useContext } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { MdOutlineVideoCall } from "react-icons/md";
import "./Home.scss";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigation = useNavigate();
  const [isJoin, setIsJoin] = useState(false);
  const [user, setUser] = useState(null);
  const [showSpinner, setSpin] = useState(false);
  const callIdRef = useRef(null);
  const [showMod, setMod] = useState(false);
  const { callAccepted, setName, callUser, stream, userVideo, myVideo } =
    useContext(SocketContext);
  console.log(myVideo);
  // if (myVideo) localStorage.setItem("myVideo", JSON.stringify(myVideo));
  const handleCall = () => {
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

  if (showSpinner) {
    return (
      <div
        className="spinner"
        style={{
          display: showSpinner ? "flex" : "none",
          backgroundColor: "rgba(173, 216, 230, 0.1)",
          flexDirection: "column",
          width: "100vw",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="grau.500"
          size="xl"
        />
        <h1
          style={{ fontSize: 18, textTransform: "capitalize", marginTop: 10 }}
        >
          wait until you are admitted...
        </h1>
      </div>
    );
  } else {
    return (
      <>
        <Navbar />
        <div className="heroSection">
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Video preview</ModalHeader>
              <ModalCloseButton />
              <ModalBody></ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant="ghost">Secondary Action</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <video
            ref={myVideo}
            playinline
            autoPlay
            muted
            style={{
              width: "300px",
              height: "400px",
              display: "none",
            }}
          />
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
          />
          <div className="heroWrapper">
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
                <button className="createMeet">
                  <MdOutlineVideoCall className="video" />
                  <a href="/call">new meeting</a>
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
  }
};

export default Home;
