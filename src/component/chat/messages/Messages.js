import React, { forwardRef } from "react";
import './Messages.css'
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";



const Message = forwardRef(
  (
    { id, contents: { timestamp, displayName, email, photo, message, uid } },
    ref
  ) => {
    const user = useSelector(selectUser);
    return (
      <div
        ref={ref}
        className={`messages ${user.email === email && "message__sender"}`}
      >
        <Avatar src={photo} className="message__photo" />
        <p>{message}</p>
        <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
      </div>
    );
  }
);

export default Message;


