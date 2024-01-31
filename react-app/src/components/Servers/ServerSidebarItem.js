import React, { useState, useEffect, useRef } from "react";
import Redirect from "react-router-dom";
import "./ServerSidebar.css";
import ContextMenu from "../ContextMenu";

const ServersSidebarItem = ({ mainRef, server }) => {
  let names = server.name.split(" ");
  let serverName = [];
  for (let name of names) {
    serverName.push(name[0]);
  }
  serverName = serverName.join("");
  let className = "";
  let hasImage = false;

    const closeMenu = (e) => {
        if (!mainRef.current.contains(e.target)) {
            mainRef.current.classList.remove('visible')
        }

     const [clicked, setClicked] = useState(false);
    const [points, setPoints] = useState({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        const handleClick = () => setClicked(false);
        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);

  if (server.server_picture === "image.url" || server.server_picture === "") {
    // server.server_picture = 'https://i.redd.it/6jupfeilyhx71.jpg'
    className = "server-sidebar-no-img-icon";
  } else {
    className = "server-sidebar-icon";
    hasImage = true;
  }

  const handleClick = (e) => {
    if (e.type === "contextmenu") {
      e.preventDefault();
      const { clientX: mouseX, clientY: mouseY } = e;
      console.log(mouseX, mouseY);

      mainRef.current.style.top = `${mouseY}px`;
      mainRef.current.style.left = `${mouseX}px`;

      console.log(mainRef.current.style.left);

      mainRef.current.classList.add("visible");
      console.log(mainRef);
    }
  };

  return (
    // each item will redirect to channel component
    <>
      <div
        className={className}
        onClick={handleClick}
        onContextMenu={handleClick}
      >
        {hasImage ? (
          <img src={server.server_picture} alt="preview"></img>
        ) : (
          <p>{serverName}</p>
        )}
      </div>
      <ContextMenu server={server} top={points.y} left={points.x} />
    </>
  );
};
export default ServersSidebarItem;
