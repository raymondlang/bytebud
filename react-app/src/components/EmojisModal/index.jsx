import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import OpenModalMenuItem from "./OpenModalMenuItem";
import {
  getAllEmojisThunk,
  createReactionThunk,
  loadOneEmojiThunk,
  allEmojis,
} from "../../store/emojis";
import "./GetAllEmojis.css";

// to be put into message component
// const [showMenu, setShowMenu] = useState(false);
// const closeMenu = () => setShowMenu(false);

export default function GetAllEmojis() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  useEffect(() => {
    dispatch(getAllEmojisThunk());
  }, [dispatch]);

  const emojis = useSelector((state) => state.emoji.allEmojis);
  const emojisArr = Object.values(emojis);

  // const createReaction = (e, emojiId, messageId) => {
  //   // get create a reaction from the click
  //   // need to input messageId from message component
  //   let new_reaction = await dispatch(createReactionThunk(emojiId, messageId, userId))

  //   return new_reaction
  //   .then(closeModal)
  //   }

  // to handle clicking on an existing reaction to delete it
  // const deleteReaction = (reactionId) => {
  // let deleted_reaction = await dispatch(deleteReactionThunk(reactionId))

  // }

  const userId = useSelector((state) => state.session.user?.id);

  return (
    <div className="emoji-modal-container">
      <p>{String.fromCodePoint(0x1f354)}</p>
      {emojisArr.map((emoji) => {
        return (
          <div className="emoji-modal-emoji" value={emoji.id}>
            {String.fromCodePoint(emoji.url)}
          </div>
        );
      })}
    </div>
  );
}
