import { Redirect } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalMenuItem from "../EmojisModal/OpenModalMenuItem";
import { getAllFriendsThunk } from "../../store/friends";
import EmojisModal from "../EmojisModal/AllEmojisModal";
import { loadAllDmsThunk } from "../../store/private";
import "./FriendsList.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

export default function FriendsList() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);

  let currentUserId;
  if (currentUser) currentUserId = currentUser.id;

  const allFriends = useSelector((state) => state.friends);
  const friendsArr = Object.values(allFriends);

  const DMs = useSelector((state) => state.private.allDMs);
  const dmsArr = Object.values(DMs);
  console.log("what is dmsArr!!!!", dmsArr);

  useEffect(() => {
    dispatch(getAllFriendsThunk(currentUserId));
  }, [dispatch, currentUserId]);

  const handleFriendOptions = (e) => {
    e.preventDefault();
    window.alert("Friend Request Feature Coming Soon!");
  };

  const handleDM = (e) => {
    e.preventDefault();
    window.alert("Private Messages Feature Coming Soon!");
  };

  const handleOptions = (e) => {
    e.preventDefault();
    window.alert("More Options Feature Coming Soon!");
  };

  return (
    <div>
      <div className="friendslist-channel-container">
        <div className="friendslist-search-div">
          <input
            placeholder="Find or start a conversation"
            id="friendslist-search"
          ></input>
        </div>
        <div className="friendslist-channel-friendscontainer">
          <i className="fa-solid fa-user-group" />
          <div className="friendslist-channel-item"> Friends </div>
        </div>

        <div className="friendslist-channel-dm-container">
          <div className="friendslist-channel-dm"> Direct Messages </div>
          {dmsArr.map((dm) => {
            return (
              <>
                <div className="friendslist-dm-user-container">
                  <img
                    alt=""
                    src={
                      dm.user.id === currentUserId
                        ? dm.userTwo.prof_pic
                        : dm.user.prof_pic
                    }
                    className="friendslist-profpic"
                  />
                  <div className="friendslist-dm-username">
                    {" "}
                    {dm.user.id === currentUserId
                      ? dm.userTwo.username.split("#")[0]
                      : dm.user.username.split("#")[0]}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>

      <div className="friendslist-container">
        <div className="friendslist-header-container">
          <i className="fa-solid fa-user-group" />
          <div className="friendslist-friends"> Friends </div>
          <div className="friendslist-online"> Online </div>
          <div className="friendslist-all" onClick={handleFriendOptions}>
            {" "}
            All{" "}
          </div>
          <div className="friendslist-all" onClick={handleFriendOptions}>
            {" "}
            Pending{" "}
          </div>
          <div className="friendslist-all" onClick={handleFriendOptions}>
            {" "}
            Blocked{" "}
          </div>
          {/* <span className='friendslist-addfriend-button'> Add Friend </span> */}
        </div>
        <div className="friendslist-user-container-1">
          {" "}
          Online - {friendsArr.length}{" "}
        </div>
        {friendsArr.map((friend) => {
          return (
            <div
              className="friendslist-user-container"
              key={`friend${friend.id}`}
            >
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
                <div className="friendslist-tag">
                  {" "}
                  #{friend.username.split("#")[1]}{" "}
                </div>
              </div>

              <div className="friendslist-chat-icon">
                <div className="icon-hover" onClick={handleDM}>
                  {" "}
                  <i class="fa-solid fa-message" />{" "}
                </div>
                <div className="icon-hover" onClick={handleOptions}>
                  {" "}
                  <i class="fa-solid fa-ellipsis-vertical" />
                </div>
                <div className="icon-hover">
                  {" "}
                  <i class="fa-solid fa-message" />{" "}
                </div>
                <div className="icon-hover">
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
    </div>
  );
}
