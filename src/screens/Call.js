import React, { useContext, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { BsCameraVideo, BsCameraVideoOff } from "react-icons/bs";
import { FaRegClosedCaptioning } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { SocketContext } from "../SocketContext";

import {
  MdInfoOutline,
  MdOutlinePeopleAlt,
  MdOutlineChat,
  MdCallEnd,
  MdOutlineScreenShare,
} from "react-icons/md";
import "./call.scss";
const Call = () => {
  const { call, callAccepted, myVideo, userVideo, stream, name, callEnded } =
    useContext(SocketContext);
  console.log(myVideo);
  const secondUser = null;
  const [hideVideo, setHideVideo] = useState(false);
  return (
    <section className="callSection">
      <div className="callWrapper">
        {secondUser == null ? (
          <div className="mainUser">
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
            <span className="userName">user name</span>
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
              />
              <span className="userName">user name</span>
            </div>
            <div className="mainUser" style={{ width: "48%" }}>
              <img
                src="https://yt3.ggpht.com/ytc/AKedOLQMxO5ybJytpgAsgyYDiMw2lrUpVGo1YZddOKEljQ=s900-c-k-c0x00ffffff-no-rj"
                alt=""
                className="userAvatar"
              />
              <span className="userName">user name</span>
            </div>
          </section>
        )}
      </div>
      <div className="bottomNavigation">
        <div className="time">
          <h3>7:43 pm | gdb-vm-cu</h3>
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
          <div className="iconsMain">
            <HiDotsVertical className="optionsIcons" />
          </div>
          <div className="endCall">
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
