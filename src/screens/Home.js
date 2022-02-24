import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { MdOutlineVideoCall } from "react-icons/md";
import "./Home.scss";
import axios from "axios";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { BsKeyboard } from "react-icons/bs";
const Home = () => {
  const navigation = useNavigate();
  const [isJoin, setIsJoin] = useState(false);
  const [user, setUser] = useState(null);

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
        setUser(res.data.user);

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
              <a href="/call">
                <button className="createMeet">
                  <MdOutlineVideoCall className="video" />
                  new meeting
                </button>
              </a>
              <div className="inputWrapper">
                <div
                  className="inputMeeting"
                  style={{ width: isJoin ? "70%" : "100%" }}
                >
                  <BsKeyboard className="keyboard" />
                  <input
                    type="text"
                    placeholder="Enter a code"
                    onFocus={() => {
                      setIsJoin(true);
                    }}
                    onBlur={() => {
                      setIsJoin(false);
                    }}
                  />
                </div>
                <button
                  className="joinBtn"
                  style={{ display: isJoin ? "block" : "none" }}
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
