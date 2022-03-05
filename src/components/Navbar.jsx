import React, { useEffect, useState } from "react";
import "./navbar.scss";
import { RiSettings3Fill } from "react-icons/ri";
import { BsCameraVideo } from "react-icons/bs";
import { FiHelpCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { BsChatSquareText } from "react-icons/bs";
const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const navigate = useNavigate();
  const user = localStorage.getItem("userData");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState(0);
  const [day, setDay] = useState("");
  const [isPm, setIsPm] = useState("AM");
  const [hr, setHr] = useState(0);
  const [min, setMin] = useState(0);
  const validateDate = () => {
    var today = new Date();
    setDate(today.getDate());
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

    switch (today.getMonth() + 1) {
      case 1:
        setMonth("Jan");
        break;

      case 2:
        setMonth("Feb");
        break;
      case 3:
        setMonth("Mar");
        break;
      case 4:
        setMonth("Apr");
        break;

      case 5:
        setMonth("May");
        break;
      case 6:
        setMonth("Jun");
        break;
      case 7:
        setMonth("Jul");
        break;
      case 8:
        setMonth("Aug");
        break;
      case 9:
        setMonth("Sep");
        break;
      case 10:
        setMonth("Oct");
        break;
      case 11:
        setMonth("Nov");
        break;
      case 12:
        setMonth("Dec");
        break;
      default:
        setMonth("");
    }
    switch (today.getDay() + 1) {
      case 1:
        setDay("Mon");
        break;
      case 2:
        setDay("Tue");
        break;
      case 3:
        setDay("Wed");
        break;
      case 4:
        setDay("Thur");
        break;
      case 5:
        setDay("Fri");
        break;
      case 6:
        setDay("Sat");
        break;

      default:
        setDay("Sun");
    }
  };
  useEffect(() => {
    validateDate();
  }, []);
  return (
    <div className="navContainer">
      <div className="navWrapper">
        <div className="logoLeft">
          <BsCameraVideo className="logoMain" />
          <span>Anymeet</span>
        </div>
        <div
          className="sectionRight"
          style={{ width: user == null ? "unset" : "40%" }}
        >
          {user == null ? (
            <button className="loginBtn">Login to continue</button>
          ) : (
            <>
              {" "}
              <div className="date">
                {hr}:{min} {isPm} •{month},{day} {date}
                <div className="icons">
                  <BsChatSquareText className="chat" />
                  <FiHelpCircle className="help" />
                  <RiSettings3Fill className="setting" />
                </div>
              </div>
              <div className="avatar">
                <Menu>
                  <MenuButton as={Button} style={{ backgroundColor: "white" }}>
                    <img
                      src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=199"
                      alt="avatar"
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        localStorage.removeItem("userData");
                        navigate("/login");
                      }}
                    >
                      Log out
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </>
          )}
        </div>

        <FaBars className="mobileIcon" ref={btnRef} onClick={onOpen} />

        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />

            <DrawerBody style={{ display: "grid", alignItems: "center" }}>
              <Button
                onClick={() => {
                  localStorage.removeItem("userData");
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default Navbar;
