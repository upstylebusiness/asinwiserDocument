import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

// navbar
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import { useDispatch, useSelector } from "react-redux";
import {
  AdminFindAction,
  chatShowAction,
  chatStarClickAction,
  searchForMessageAction,
  submitNewMessageAction,
  userMsgToAdminAction,
} from "../../action/adminAction";
import useSocket from "../../costumHook/useSocket.io";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "96vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
});

const Chat = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [chatValue, setChatValue] = useState([]);
  const [chatMessage, setChatMessage] = useState([]);
  const [textChat, setTextChat] = useState("");
  const [userName, setUserName] = useState({ name: "", image: "" });
  const [isDisplay, setIsDisplay] = useState("none");

  const { findAdmin } = useSelector((state) => {
    return state.AdminFind;
  });

  const { findSearch } = useSelector((state) => {
    return state.searchForMessage;
  });

  const { findChat } = useSelector((state) => {
    return state.chatStarClick;
  });

  const { submitMessage } = useSelector((state) => {
    return state.submitNewMessage;
  });

  const { chatShowSection } = useSelector((state) => {
    return state.chatShow;
  });

  const { userNewMsg } = useSelector((state) => {
    return state.userMsgToAdmin;
  });
  // console.log(chatMessage,"*********************************************/**/*/*/");
  useEffect(() => {
    if (findChat && findChat !== undefined && findChat !== null) {
      console.log(
        findChat,
        "*********************************************/**/*/*/"
      );
      setChatMessage(findChat);
    }
  }, [findChat]);

  useEffect(() => {
    if (userNewMsg && userNewMsg !== undefined && userNewMsg !== null) {
      setChatMessage(userNewMsg);
    }
  }, [userNewMsg]);

  useEffect(() => {
    dispatch(AdminFindAction());
    dispatch(chatShowAction());
  }, []);

  useEffect(() => {
    if (chatShowSection) {
      setChatValue(chatShowSection);
    }
  }, [chatShowSection]);

  useEffect(() => {
    if (findSearch) {
      setChatValue(findSearch);
    } else if (chatShowSection) {
      setChatValue(chatShowSection);
    } else if (userNewMsg) {
      setChatValue(userNewMsg);
    }
  }, [findSearch, submitMessage, userNewMsg]);

  useEffect(() => {
    if (submitMessage) {
      dispatch(chatStarClickAction(submitMessage.userId));
    }
  }, [submitMessage]);

  // submitMessageClick
  const submitMessageClick = (userId) => {
    dispatch(submitNewMessageAction(userId, textChat));
    setTextChat("");
  };

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
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid
          item
          md={3}
          xs={12}
          className={classes.borderRight500}
          sx={{
            display: {
              md: "none",
              xs: isDisplay == "none" ? "block" : "none",
              sm: isDisplay == "none" ? "block" : "none",
            },
          }}
        >
          <List style={{ height: "auto" }}>
            <ListItem button key={`${findAdmin && findAdmin._id}`}>
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText
                primary={`${findAdmin && findAdmin.firstName}`}
              ></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              onChange={(e) => {
                if (e.target.value && e.target.value !== "") {
                  dispatch(searchForMessageAction(e.target.value));
                } else {
                  setChatValue([]);
                  dispatch(chatShowAction());
                }
              }}
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider />
          <List
            style={{
              height: "69.7vh",
              overflowY: "scroll",
            }}
            sx={{ width: { xs: "100%", sm: "100%" } }}
          >
            {chatValue.map((data) => {
              return (
                <ListItem
                  button
                  key={data._id}
                  onClick={() => {
                    setChatMessage([]);
                    setUserName({ name: data.name, image: data.image });
                    setIsDisplay("block");
                    dispatch(chatStarClickAction(data._id));
                  }}
                >
                  <ListItemIcon>
                    <Avatar
                      alt="Remy Sharp"
                      src={`${data.image !== "" ? data.image : ""}`}
                    />
                  </ListItemIcon>
                  <ListItemText primary={data.name}>{data.name}</ListItemText>
                  <ListItemText secondary="online" align="right"></ListItemText>
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid
          item
          md={9}
          xs={12}
          sx={{ display: { md: "none", xs: isDisplay, sm: isDisplay } }}
        >
          <AppBar position="static" style={{ backgroundColor: "#6f7cc2" }}>
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    {/* <img
                  src="chatLogo.png"
                  sx={{
                    // display: { xs: "none", md: "flex" },
                    mr: 1,
                  }}
                  style={{ width: "100px" }}
                /> */}
                    <ArrowBackOutlinedIcon />
                  </IconButton>
                </Box>
                <img
                  src="chatLogo.png"
                  sx={{
                    // display: { xs: "none", md: "flex" },
                    mr: 1,
                  }}
                  style={{ width: "100px" }}
                />

                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                  style={{ marginLeft: "15px" }}
                >
                  {userName.name && userName.name}
                </Typography>
                <Box sx={{ flexGrow: 1 }}></Box>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open">
                    <IconButton sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src={`${userName.image !== "" ? userName.image : ""}`}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
          {chatMessage &&
          chatMessage.length !== 0 &&
          chatMessage !== undefined ? (
            chatMessage.map((data) => {
              return (
                <List key={data._id} className={classes.messageArea}>
                  {data.message &&
                    data.message.length !== 0 &&
                    data.message.map((chat) => {
                      return chat.messageOwner == "admin" ? (
                        <ListItem>
                          <Grid container>
                            <Grid item xs={12}>
                              <ListItemText
                                align="right"
                                primary={chat.textChat}
                              ></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                              <ListItemText
                                align="right"
                                secondary={chat.time}
                              ></ListItemText>
                            </Grid>
                          </Grid>
                        </ListItem>
                      ) : chat.messageOwner == "user" ? (
                        <ListItem>
                          <Grid container>
                            <Grid item xs={12}>
                              <ListItemText
                                align="left"
                                primary={chat.textChat}
                              ></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                              <ListItemText
                                align="left"
                                secondary={chat.time}
                              ></ListItemText>
                            </Grid>
                          </Grid>
                        </ListItem>
                      ) : (
                        <ListItem key="3">
                          <Grid container>
                            <Grid item xs={12}>
                              <ListItemText
                                align="right"
                                primary="Start your chat!"
                              ></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                              <ListItemText
                                align="right"
                                secondary="10:30"
                              ></ListItemText>
                            </Grid>
                          </Grid>
                        </ListItem>
                      );
                    })}

                  {/* <ListItem key="3">
                    <Grid container>
                      <Grid item xs={12}>
                        <ListItemText
                          align="right"
                          primary="Cool. i am good, let's catch up!"
                        ></ListItemText>
                      </Grid>
                      <Grid item xs={12}>
                        <ListItemText
                          align="right"
                          secondary="10:30"
                        ></ListItemText>
                      </Grid>
                    </Grid>
                  </ListItem> */}
                </List>
              );
            })
          ) : (
            <img
              src=""
              sx={{
                // display: { xs: "none", md: "flex" },
                mr: 1,
              }}
              style={{
                marginTop: "20px",
                width: "100%",
                height: "auto",
                backgroundColor: "#6f7cc2",
              }}
            />
          )}

          <Divider />
          {chatMessage &&
          chatMessage.length !== 0 &&
          chatMessage !== undefined ? (
            chatMessage.map((data) => {
              return (
                <Grid container style={{ padding: "20px" }}>
                  <Grid item xs={11}>
                    <TextField
                      value={textChat}
                      onChange={(e) => {
                        setTextChat(e.target.value);
                      }}
                      id="outlined-basic-email"
                      label="Type Something"
                      fullWidth
                    />
                  </Grid>
                  <Grid xs={1} align="right">
                    {textChat && (
                      <Fab color="primary" aria-label="add">
                        <SendIcon
                          onClick={() => submitMessageClick(data.userId)}
                        />
                      </Fab>
                    )}
                  </Grid>
                </Grid>
              );
            })
          ) : (
            <img
              src="chatLogo.png"
              sx={{
                // display: { xs: "none", md: "flex" },
                mr: 1,
              }}
              style={{ width: "100px" }}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
