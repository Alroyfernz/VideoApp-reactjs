import React, { useContext, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { BsCameraVideo, BsCameraVideoOff } from "react-icons/bs";
import { FaRegClosedCaptioning } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { SocketContext } from "../SocketContext";
import { MdContentCopy } from "react-icons/md";
import { CgClose } from "react-icons/cg";
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
  const { call, callAccepted, myVideo, userVideo, stream, name, callEnded } =
    useContext(SocketContext);
  console.log(myVideo);
  const secondUser = "null";
  const [hideVideo, setHideVideo] = useState(false);
  return (
    <section className="callSection">
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
                12345
                <MdContentCopy style={{ color: "#fff", fontSize: 18 }} />
              </div>
            </div>
          </div>
        </div>
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
          <div
            className="iconsMain"
            onClick={() => {
              setCloseId(!closeId);
            }}
          >
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
