import { Redirect } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalMenuItem from "../EmojisModal/OpenModalMenuItem";
import { getAllFriendsThunk } from "../../store/friends";
import EmojisModal from "../EmojisModal/AllEmojisModal";
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
        <i class="fa-solid fa-user-group" />
        <div className="friendslist-friends"> Friends </div>
        <div className="friendslist-all"> All </div>
        <span className="friendslist-addfriend-button"> Add Friend </span>
      </div>
      <div className="friendslist-user-container-1">
        {" "}
        Online - {friendsArr.length}{" "}
      </div>
      {friendsArr.map((friend) => {
        return (
          <div className="friendslist-user-container" key={friend.id}>
            <div className="friendslist-pic-username">
              <div>
                {" "}
                <img
                  className="friendslist-profile-image"
                  src={friend.prof_pic}
                  alt="profile_pic_user"
                />{" "}
              </div>
              <div className="friendslist-username">
                {" "}
                {friend.username.split("#")[0]}{" "}
              </div>
            </div>

            <div className="friendslist-chat-icon">
              <div>
                {" "}
                <i class="fa-solid fa-message" />{" "}
              </div>
              <div>
                {" "}
                <i class="fa-solid fa-ellipsis-vertical" />
              </div>
            </div>
            {/* on hover it should show their tag */}
          </div>
        );
      })}
      <EmojisModal />
      {/* <button onClick={handleLogout}> Logout </button> */}
    </div>
  );
}
