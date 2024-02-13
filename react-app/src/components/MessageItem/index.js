import React from "react";
import "./MessageItem.css";
import "./Reaction.css";
import { useSelector, useDispatch } from "react-redux";
import { createReactionThunk, deleteReactionThunk } from "../../store/message";
import EmojisModal from "../EmojisModal/AllEmojisModal";
import { useParams } from "react-router-dom";

function MessageItem({ message }) {
  const dispatch = useDispatch();

  let currentServer = useSelector((state) => state.server.currentServer);
  // let allServers = useSelector(state => state.server.allUserServers);
  let { serverId, channelId } = useParams();

  let serverMembersArr;
  if (!currentServer) return null;
  serverMembersArr = currentServer[serverId]["members"];
  // normalize serverMembers to allow for keying to get sending user
  let serverMembers = {};
  serverMembersArr.forEach((member) => {
    serverMembers[member.id] = member;
  });

  // get the sending user from normalized serverMembers
  let user = serverMembers[message.userId];

  // get the session user
  let sessionUser = useSelector((state) => state.session.user);
  let sessionUserId;
  if (sessionUser) {
    sessionUserId = sessionUser.id;
  }

  let messageTimestampDate = new Date(message.timestamp)
    .toISOString()
    .slice(0, 10);
  let messageTimestampTime = new Date(message.timestamp)
    .toISOString()
    .slice(11, 16);
  let messageTimestamp = `${messageTimestampDate} ${messageTimestampTime}`;

  let reactionsArr = Object.values(message.reactions);

  let messageId = message.id;
  let props = { messageId, sessionUserId };
  let emojiId;

  // if a reaction is not yours you can click on a reaction to add one
  const addReaction = async (sessionUserId, messageId, emojiId) => {
    // console.log('#TRACKADD add reaction running')
    let addedReaction = await dispatch(
      createReactionThunk(sessionUserId, messageId, emojiId)
    );
    // console.log('#TRACKADDuserId from add reaction function in messageItem', userId)
    return addedReaction;
  };

  // if a reaction is yours, you can click on a reaction and delete it

  const deleteReaction = async (reactionId, messageId) => {
    let deleted_reaction = await dispatch(
      deleteReactionThunk(reactionId, messageId)
    );
    return deleted_reaction;
  };

  // if the reaction with that emoji already exists, and it's not yours, only increase the count and highlight
  let emojisCount = {};

  reactionsArr.map((reaction) => {
    if (emojisCount[reaction.emojiURL] === undefined) {
      emojisCount[reaction.emojiURL] = 1;
    } else {
      emojisCount[reaction.emojiURL] += 1;
      // emojisCount[reaction.emojiURL]['users'].push(reaction.userId)
    }
  });

  // console.log('emojiscount arr', Object.values(emojisCount)

  // reactionsArr.map((reaction) => console.log(userId === reaction.userId))
  return (
    <div className="message-item">
      <div className="message-left-and-center">
        <div className="message-left-side">
          <img
            className="message-profile-pic"
            src={`${user.prof_pic}`}
            alt={`${user.username.slice(0, -5)} Profile Pic`}
          />
        </div>
        <div className="message-center">
          <div className="message-sender">
            <p className="message-username">{user.username.slice(0, -5)}</p>
            <p className="message-timestamp">{messageTimestamp}</p>
          </div>
          <div className="message-content">
            <p>{message.content}</p>
          </div>
          <div className="reactions-container">
            {reactionsArr.map((reaction) => {
              return (
                <div>
                  {reaction.userId === user.id ? (
                    <div
                      className="user-emoji-reaction"
                      key={`${reaction.id}`}
                      onClick={() => {
                        deleteReaction(reaction.id, messageId);
                      }}
                    >
                      <p className="emojis-emojichar">
                        {" "}
                        {String.fromCodePoint(reaction.emojiURL)}
                      </p>
                      <p className="emojis-count"> 1 </p>
                    </div>
                  ) : (
                    <div
                      className="other-user-reaction"
                      key={`${reaction.id}`}
                      onClick={() => {
                        addReaction(reaction.emojiId, messageId, userId);
                      }}
                    >
                      <p className="emojis-emojichar">
                        {" "}
                        {String.fromCodePoint(reaction.emojiURL)}
                      </p>
                      <p className="emojis-count">
                        {" "}
                        {emojisCount[reaction.emojiURL]}{" "}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="message-right-side">
        <EmojisModal props={props} />
      </div>
    </div>
  );
}
export default MessageItem;
