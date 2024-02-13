import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import OpenModalMenuItem from "./OpenModalMenuItem";
import GetAllEmojis from "./index";
// import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import "../EmojisModal/GetAllEmojis.css";

export default function EmojisModal({ props }) {
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
    <div className="emojis-modal-openmodalmenuitem">
      <div className="tooltip-wrap">
        <div className="addreaction-container">
          <i
            className="fa-solid fa-face-smile-beam open-emojis-modal-button"
            onClick={openMenu}
          />
          <i
            className="fa-solid fa-plus open-emojis-modal-button"
            onClick={openMenu}
          />
        </div>
        <div className="tooltip-content"> Add Reaction </div>
      </div>

      <div className={ulClassName} ref={ulRef}>
        <ul className="emojismodal-menu-allemojis">
          <GetAllEmojis props={props} />
        </ul>
      </div>
    </div>
  );
}
