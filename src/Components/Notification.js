import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { updateNotification } from "../Redux/Actions";

const Notification = (props) => {
    const {notification,dispatch} = props;
  // Handles notification close button
  const handleNotificationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    const newNotification = {
      ...notification,
      open: false,
    };
    dispatch(updateNotification(newNotification));
  };
  return (
    <div>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Alert onClose={handleNotificationClose} severity={notification.severity} sx={{ width: "100%" }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

const callback=(state)=>{
    console.log(state);
    return{
        ...state
    };
}
export default connect(callback)(Notification);
