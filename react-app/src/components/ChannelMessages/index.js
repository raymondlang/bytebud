import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import MessageItem from "../MessageItem";
import { getChannelMessages, clearMessages } from "../../store/message";
import "./ChannelMessages.css";

function ChannelMessages({ msg }) {
  // select data from the Redux store
  const currUser = useSelector((state) => state.session.user);
  const channel = useSelector((state) => state.channels.oneChannel);
  const allMessages = useSelector((state) => state.messages);
  const { channelId } = useParams();
  const dispatch = useDispatch();
  //populate store with channelMessages on render and when channel.id changes
  //trying to remove allMessages from dependency array (ADD BACK IN IF NEEDED)
  useEffect(() => {
    dispatch(getChannelMessages(channelId));
    // clear state every time channel Id changes
    return () => dispatch(clearMessages());
  }, [dispatch, channelId]); //allMessages

  // memoize the array of all messages to prevent unnecessary re-renders
  if (msg?.channelId) allMessages[msg.id] = msg;
  const allMessagesArr = useMemo(() => {
    if (allMessages) return Object.values(allMessages);

    return [];
  }, [allMessages]);

  // memoize the array of form messages to prevent unnecessary re-renders
  //   const formMessagesArr = useMemo(() => {
  //     if (formMessages)
  //       return formMessages.filter((message) => message.userId !== currUser.id);

  //     return [];
  //   }, [formMessages, currUser]);

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
