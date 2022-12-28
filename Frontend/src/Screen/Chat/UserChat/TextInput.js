import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { userChatSubmitAction } from "../../../action/userAction";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapForm: {
      display: "flex",
      justifyContent: "center",
      width: "95%",
      margin: `${theme.spacing(0)} auto`,
    },
    wrapText: {
      width: "100%",
    },
    button: {
      //margin: theme.spacing(1),
    },
  })
);

export const TextInput = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [chatValue, setChatValue] = useState("");

  const submitClick = (e) => {
    e.preventDefault();
    
    dispatch(userChatSubmitAction(chatValue));
    setChatValue("");
  };
  return (
    <>
      <form
        className={classes.wrapForm}
        noValidate
        autoComplete="off"
        onSubmit={(e) => submitClick(e)}
      >
        <TextField
          id="standard-text"
          label="Enter your Message"
          className={classes.wrapText}
          //margin="normal"
          onChange={(e) => setChatValue(e.target.value)}
          value={chatValue}
        />
        {chatValue && chatValue.length !== 0 && (
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
          >
            <SendIcon />
          </Button>
        )}
      </form>
    </>
  );
};
