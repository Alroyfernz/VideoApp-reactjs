import React from "react";
import "./Login.scss";
import Navbar from "../components/Navbar";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigation = useNavigate();

  if (localStorage.getItem("userInfo") != null) {
    navigation("/");
  }
  const google = async () => {
    window.open("https://any-meet.herokuapp.com/auth/google", "_self");

    navigation("/");
  };

  return (
    <>
      <Navbar />
      <div className="loginContainer">
        <div className="loginWrapper">
          <div className="left">
            <div className="leftWrapper">
              <h1>Video meetings in great quality for all.</h1>
              <p>
                We've revamped our Google Meet service to make business video
                meetings more secure <br />
                This service, which provides video meeting facility in good
                quality, can now be used by anyone on any device.
              </p>
              <button
                className="loginBtn"
                onClick={() => {
                  google();
                }}
              >
                <FcGoogle style={{ fontSize: 22, marginRight: 18 }} />
                Continue with google
              </button>
            </div>
          </div>
          <div className="right">
            <div className="rightWrapper">
              <img
                src="https://lh3.googleusercontent.com/g6WWfSMs3V0w2hhsaoc9myxQXmfO3IcRPwIsSo7nUJkNDHFb2JT4bffBiNH50_seojxYfC3AfBz8xNHd5k7tqXVsjRVvHGfJfAPx-zz8Lk7EQ0cPuA=rwu-v1-w1400"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
