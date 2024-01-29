import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalMenuItem from "../EmojisModal/OpenModalMenuItem";
import { getAllFriendsThunk } from "../../store/friends";
import GetAllEmojis from "../EmojisModal";
import "../EmojisModal/GetAllEmojis.css";

export default function FriendsList() {
  const history = useHistory();
  const dispatch = useDispatch();

  const redirect = async (e) => {
    e.preventDefault();
    history.push("/emojis/test");
  };

  const [showMenu, setShowMenu] = useState(false);
  const closeMenu = () => setShowMenu(false);

  // const allFriends = useSelector(state => state.friends)
  const currentUserId = useSelector((state) => state.session.user.id);

  useEffect(() => {
    dispatch(getAllFriendsThunk(currentUserId));
  });

  return (
    <div>
      <h1> HELLO ! </h1>
      <div className="emojis-modal-container"></div>
      <OpenModalMenuItem
        itemText="Emojis"
        onItemClick={closeMenu}
        className="emojis-modal-button"
        modalComponent={<GetAllEmojis />}
      />
    </div>
  );
}
