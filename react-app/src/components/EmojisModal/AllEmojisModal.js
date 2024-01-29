import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import OpenModalMenuItem from "./OpenModalMenuItem";
import GetAllEmojis from "./index";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import "../EmojisModal/GetAllEmojis.css";

export default function EmojisModal({ messageId }) {
  const [showMenu, setShowMenu] = useState(false);
  const closeMenu = () => setShowMenu(false);

  const ulRef = useRef();
  // const dispatch = useDispatch()
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      setShowMenu(false);
      // if (!ulRef.current.contains(e.target)) {
      // }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const ulClassName = "emojismodal-openmodalmenu" + (showMenu ? "" : " hidden");

  return (
    <div className={"emojis-modal-openmodalmenuitem"}>
      <button onClick={openMenu} className="open-emojis-modal-button">
        <i className="fas fa-use  r-circle" />
      </button>
      <div className="tooltip-content">Add Reaction</div>
      <ul className={ulClassName} ref={ulRef}>
        <div>
          <GetAllEmojis />
        </div>
      </ul>
      {/*
      <div class="tooltip-wrap">
      <div className='emojis-list-item-container'>
        <li className='emojismodalitem' onClick={onClick}>{itemText}</li>
      </div>
      <div class="tooltip-content">
          Add Reaction
      </div>
    </div> */}
      <OpenModalMenuItem
        itemText="Reactions"
        onItemClick={closeMenu}
        className="emojis-modal-button"
        modalComponent={<GetAllEmojis messageId />}
      />
    </div>
  );
}
