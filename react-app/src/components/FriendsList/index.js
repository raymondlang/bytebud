import { Redirect } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalMenuItem from "../EmojisModal/OpenModalMenuItem";
import { getAllFriendsThunk } from "../../store/friends";
import "./FriendsList.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

export default function FriendsList() {
  const dispatch = useDispatch();

  //   const redirect = async (e) => {
  //     e.preventDefault();
  //     history.push("/emojis/test");
  //   };

  const [showMenu, setShowMenu] = useState(false);
  const closeMenu = () => setShowMenu(false);

  //   // const allFriends = useSelector(state => state.friends)
  //   const currentUserId = useSelector((state) => state.session.user.id);
  const allFriends = useSelector((state) => state.friends);
  const friendsArr = Object.values(allFriends);
  //   useEffect(() => {
  //     dispatch(getAllFriendsThunk(currentUserId));
  //   });

  return (
    <div className="friendslist-container">
      <div className="friendslist-header-container">
        <span className="friendslist-friends"> Friends </span>
        <span className="friendslist-pending"> Pending </span>
        <span className="friendslist-addfriend-button"> Add Friend </span>
      </div>
      {friendsArr.map((friend) => {
        return (
          <div className="friendslist-user-container" key={friend.id}>
            <span className="friendslist-profile-image">DEFAULT IMG! </span>
            <span className="friendslist-username">
              {" "}
              username: {friend.username.split("#")[0]}{" "}
            </span>
            {/* on hover it should show their tag */}
          </div>
        );
      })}
      {/* <button onClick={handleLogout}> Logout </button> */}
    </div>
  );
}
