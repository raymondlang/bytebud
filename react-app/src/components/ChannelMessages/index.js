import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import MessageItem from "../MessageItem";
import { getChannelMessages, clearMessages } from "../../store/message";
import "./ChannelMessages.css";

function ChannelMessages({ messages }) {
  // select data from the Redux store
  const currUser = useSelector((state) => state.session.user);
  const channel = useSelector((state) => state.channels.oneChannel);
  const allMessages = useSelector((state) => state.messages);
  if (messages?.channelId) allMessages[messages.id] = messages;
  const { channelId } = useParams();
  const dispatch = useDispatch();
  //populate store with channelMessages on render and when channel.id changes
  //trying to remove allMessages from dependency array (ADD BACK IN IF NEEDED)
  useEffect(() => {
    dispatch(getChannelMessages(channelId));
    // clear state every time channel Id changes
    return () => dispatch(clearMessages());
  }, [dispatch, channelId]);

  if (!allMessages) return null;
  const allMessagesArr = Object.values(allMessages);

  return (
    <div className="channel-messages-container">
      <div className="channel-messages-top">
        <div className="channel-icon-container">
          <h1 className="channel-icon">#</h1>
        </div>
        <h2 className="channel-messages-welcome">
          Welcome to #{channel.name}!
        </h2>
        <p className="channel-messages-start">
          This is the start of the #{channel.name} channel.
        </p>
      </div>
      <div id="scroller">
        {allMessagesArr.map((message) => {
          return (
            <div
              key={`message${message.id}`}
              className="message-item-container"
            >
              <MessageItem message={message} />
            </div>
          );
        })}
        <div id="anchor"></div>
      </div>
      {/* {formMessages.map((message, ind) => {
                return (
                    <div key={`formMessage${ind}`} className='message-item-container'>
                        <MessageItem message={message} />
                    </div>
                );
            })} */}
    </div>
  );
}
export default ChannelMessages;
