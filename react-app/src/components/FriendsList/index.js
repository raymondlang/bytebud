import { Redirect } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalMenuItem from "../EmojisModal/OpenModalMenuItem";
import { getAllFriendsThunk } from "../../store/friends";
import "./FriendsList.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

export default function FriendsList() {
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
      <div className="friendslist-header-container">
        <i className="fa-solid fa-user-group" />
        <div className="friendslist-friends"> Friends </div>
        <NavLink exact to={`/channels/@me`} className="friendslist-all-link">
          <div className="friendslist-all"> All </div>
        </NavLink>
        <NavLink
          exact
          to={`/channels/@me/pending`}
          className="friendslist-all-link"
        >
          <div className="friendslist-all"> Pending </div>
        </NavLink>
        <NavLink
          exact
          to={`/channels/@me/add`}
          className="friendslist-add-link"
        >
          <div className="friendslist-all"> Add Friend </div>
        </NavLink>
      </div>
      <div className="emojis-modal-container"></div>
      <OpenModalMenuItem
        itemText="Emojis"
        onItemClick={closeMenu}
        className="emojis-modal-button"
      />
    </div>
  );
}
