import React, { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import MessageItem from "../MessageItem";
import { getChannelMessages } from "../../store/message";
import "./ChannelMessages.css";

function ChannelMessages({ formMessages }) {
  const currUser = useSelector((state) => state.session.user);
  const channel = useSelector((state) => state.channels.oneChannel);

  const allMessages = useSelector((state) => state.messages.messages);
  // allMessages starts as null, use conditional to avoid putting undefined in Object.values
  const { serverId, channelId } = useParams();

  const dispatch = useDispatch();

  //populate store with channelMessages on render and when channel.id/allMessages changes
  useEffect(() => {
    if (channel) {
      dispatch(getChannelMessages(channelId));
    } else {
      return null;
    }
  }, [dispatch, channelId, allMessages]);

  // return null if can't get channel until next render
  if (!channel) return null;

  // allMessages starts as null, use conditional to avoid putting undefined in Object.values
  let allMessagesArr;
  if (allMessages !== null) {
    allMessagesArr = Object.values(allMessages);
  }
  if (!allMessagesArr) {
    return null;
  }

  formMessages = formMessages.filter(
    (message) => message.userId !== currUser.id
  );

  console.log("allMessagesArr", allMessagesArr);

  return (
    <div className="channel-messages-container">
      {allMessagesArr.map((message) => {
        return (
          <div key={`message${message.id}`} className="message-item-container">
            <div className="message-item">
              <MessageItem message={message} />
            </div>
          </div>
        );
      })}
      {formMessages.map((message, ind) => {
        return (
          <div key={ind} className="message-item-container">
            <div className="message-item">
              <MessageItem message={message} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChannelMessages;
