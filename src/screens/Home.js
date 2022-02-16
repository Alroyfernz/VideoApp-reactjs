import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { MdOutlineVideoCall } from "react-icons/md";
import "./Home.scss";

import { BsKeyboard } from "react-icons/bs";
const Home = () => {
  const [isJoin, setIsJoin] = useState(false);

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
              <button className="createMeet">
                <MdOutlineVideoCall className="video" />
                new meeting
              </button>
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
