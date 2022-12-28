import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, IconButton, Paper, Toolbar } from "@material-ui/core";
import { Typography } from "@mui/material";

import { TextInput } from "./TextInput.js";
import { MessageLeft, MessageRight } from "./Message";
import { userChatFindAction } from "../../../action/userAction";
import useSocket from "../../../costumHook/useSocket.io";

import { useDispatch, useSelector } from "react-redux";
import { userMsgToAdminAction } from "../../../action/adminAction.js";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: "100%",
      height: "80vh",
      maxWidth: "500px",
      maxHeight: "700px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
    },
    paper2: {
      width: "80vw",
      maxWidth: "500px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
    },
    container: {
      width: "100%",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      overflowY: "scroll",
      height: "calc( 100% - 80px )",
    },
  })
);

export default function UserChatSection() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isOnline, setOnline] = useState(false);

  const { userChatFind } = useSelector((state) => {
    return state.userChatFind;
  });

  const { userChatSubmit } = useSelector((state) => {
    return state.userChatSubmit;
  });

  const { userNewMsg } = useSelector((state) => {
    return state.userMsgToAdmin;
  });

  useEffect(() => {
    dispatch(userChatFindAction());
  }, [userChatSubmit, userNewMsg]);
  // useEffect(() => {
  //   const handleOnline = () => {
  //     setOnline(true);
  //   };
  //   const handleOffline = () => {
  //     setOnline(false);
  //   };

  //   window.addEventListener("online", handleOnline);
  //   // window.addEventListener("offline", handleOffline);

  //   return () => {
  //     // window.addEventListener("online", handleOnline);
  //      
  //   };
  // }, []);


  // browser store
  let adminExit = localStorage.getItem("loginInfo")
    ? JSON.parse(localStorage.getItem("loginInfo"))
    : null;

  let Name = adminExit.isUserExist.name;

  // socket-io
  const socket = useSocket((socket) => {
    socket.on("chat", (data) => {
      dispatch(userMsgToAdminAction(data._id));
    });
    socket.on("connect_error", (data) => {
      console.log(data, "errrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    });
  });

  return (
    <>
      <AppBar
        position="static"
        style={{
          backgroundImage: "linear-gradient(to right, #c95ad0 , #8870e8)",
        }}
      >
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img
              src="chatLogo.png"
              sx={{
                // display: { xs: "none", md: "flex" },
                mr: 1,
              }}
              style={{ width: "100px" }}
            />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Chat
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <Paper className={classes.paper} zDepth={2}>
          <Paper id="style-1" className={classes.messagesBody}>
            {userChatFind &&
              userChatFind.message.map((data, index) => {
                return data.messageOwner == "user" ? (
                  <MessageLeft
                    key={index}
                    message={data.textChat}
                    timestamp={data.time}
                    photoURL=""
                    displayName={Name}
                    avatarDisp={true}
                  />
                ) : (
                  <MessageRight
                    message={data.textChat}
                    timestamp={data.time}
                    photoURL=""
                    displayName="Admin"
                    avatarDisp={true}
                  />
                );
              })}
          </Paper>
          <TextInput />
        </Paper>
      </div>
    </>
  );
}
