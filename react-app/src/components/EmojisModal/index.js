import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import OpenModalMenuItem from "./OpenModalMenuItem";
import { getAllEmojisThunk } from "../../store/emojis";
import { createReactionThunk } from "../../store/message";
import "./GetAllEmojis.css";
import { io } from "socket.io-client";

// to be put into message component
// const [showMenu, setShowMenu] = useState(false);
// const closeMenu = () => setShowMenu(false);

export default function GetAllEmojis({ props: { messageId, sessionUserId } }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  useEffect(() => {
    dispatch(getAllEmojisThunk());
  }, [dispatch]);

  const emojis = useSelector((state) => state.emoji.allEmojis);
  const allEmojisArr = Object.values(emojis);

  //   useEffect(() => {
  //     // open socket connection
  //     // create websocket
  //     socket = io();

  //     // socket.on('subscribe', function(channel) {
  //     //     try{
  //     //       console.log('[socket]','join channel :', channel)
  //     //       socket.join(channel);
  //     //       socket.to(channel).emit('user joined', socket.id);
  //     //     }catch(e){
  //     //       console.log('[error]','join channel :',e);
  //     //       socket.emit('error','couldnt perform requested action');
  //     //     }
  //     // })

  //     socket.on("chat", (chat) => {
  //         setMessages(messages => [...messages, chat])
  //     })
  //     // when component unmounts, disconnect
  //     return (() => {
  //         socket.disconnect()
  //     })
  // }, []);

  const createReaction = async (emojiId, messageId, sessionUserId) => {
    let new_reaction = await dispatch(
      createReactionThunk(emojiId, messageId, sessionUserId)
    );
    // socket.emit("chat", new_reaction);
    return new_reaction;
  };

  // to handle clicking on an existing reaction to delete it
  // const deleteReaction = (reactionId) => {
  // let deleted_reaction = await dispatch(deleteReactionThunk(reactionId))

  // }

  //   const userId = useSelector((state) => state.session.user?.id);

  return (
    <div className="emojis-modal-container-container">
      <div className="emoji-modal-container">
        {allEmojisArr.map((emoji) => {
          return (
            <div
              className="emoji-modal-emoji"
              value={emoji.id}
              onClick={() => {
                createReaction(emoji.id, messageId, sessionUserId);
              }}
            >
              {String.fromCodePoint(emoji.url)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
