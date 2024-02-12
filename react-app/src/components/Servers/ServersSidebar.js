import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServers } from "../../store/server";
import { NavLink } from "react-router-dom";
import ServersSidebarItem from "./ServerSidebarItem";
import "./ServerSidebar.css";
import OpenModalButton from "../OpenModalButton";
import CreateServerModal from "../ServerCreateModel";

const ServersSidebar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const mainRef = useRef();

  useEffect(() => {
    dispatch(getServers(user));
  }, [user, dispatch]);

  let servers = useSelector((state) => state.server.allUserServers);
  if (!servers) return null;
  servers = Object.values(servers);

  return (
    <div className="server-sidebar">
      {user !== null ? (
        <>
          <div className="server-sidebar">
            <ul className="server-sidebar-ul">
              <NavLink key="Direct Messages" to={"/channels/@me"}>
                <img
                  className="server-sidebar-icon"
                  src="https://i.redd.it/6jupfeilyhx71.jpg"
                  alt="preview"
                ></img>
              </NavLink>

              <div className="server-sidebar-server-group">
                {servers.map((server) => (
                  <NavLink
                    style={{ textDecoration: "none" }}
                    key={server.id}
                    to={`/channels/${server.id}/${server.channels[0].id}`}
                  >
                    <ServersSidebarItem mainRef={mainRef} server={server} />
                  </NavLink>
                ))}
              </div>

              <li
                style={{ listStyle: "none" }}
                className="server-sidebar-add-server-btn"
              >
                <OpenModalButton
                  buttonText="+"
                  modalComponent={<CreateServerModal />}
                />
              </li>
            </ul>
          </div>
          <div ref={mainRef} id="server-sidebar-context-menu">
            <div className="server-sidebar-context-menu-item">Option 1</div>
            <div className="server-sidebar-context-menu-item">Option 2</div>
            <div className="server-sidebar-context-menu-item">Option 3</div>
            <div className="server-sidebar-context-menu-item">Option 4</div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
    // return a ul of mapping each server to a sidebar item
  );
};

export default ServersSidebar;
