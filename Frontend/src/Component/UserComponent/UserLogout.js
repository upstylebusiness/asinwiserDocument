// import { Button } from "antd";
import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function UserLogout() {
  const navigate = useNavigate();
  //logoutClick
  const logoutClick = () => {
    localStorage.getItem("loginInfo")
      ? localStorage.removeItem("loginInfo")
      : localStorage.removeItem("loginInfo");
    navigate("/login");
  };
  return (
    <div>
      <Button
        aria-label="delete"
        size="small"
        variant="contained"
        color="primary"
        style={{
          height: "50px",
          marginTop: "10px",
          backgroundImage: "linear-gradient(to right, #c95ad0 , #8870e8)",
          border: "none",
          color: "white",
          padding: "0px 35px",
          textAlign: "center",
          textDecoration: "none",
          display: "inline-block",
          fontSize: "16px",
          justifyItems: "center",
          float: "right",
          marginLeft: "5px",
          width: "180px",
          display: "inline-block",
        }}
        onClick={logoutClick}
      >
        Logout
      </Button>
    </div>
  );
}

export default UserLogout;
