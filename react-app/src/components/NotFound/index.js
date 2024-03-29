import React from "react";
import { useHistory } from "react-router-dom";
import "./NotFoundPageLoggedIn.css";
import notFoundGif from "../../static/NotFoundPage/discord-404.gif";
import byteBudLogoBlack from "../../static/NotFoundPage/byte-bud-logo-black.png";

function NotFound({ sessionUser }) {
  const history = useHistory();

  const returnHome = async (e) => {
    e.preventDefault();
    history.push("/");
  };

  if (sessionUser === null) {
    return null;
  } else {
    return (
      <>
        <div className="not-found-container">
          <div className="not-found-top">
            <button className="not-found-home-button" onClick={returnHome}>
              <img
                className="byte-bud-logo-black"
                src={byteBudLogoBlack}
                alt="byte bud white logo"
              />
              <h3 className="byte-bud-logo-text-black">ByteBud</h3>
            </button>
          </div>
          <img className="not-found-gif" src={notFoundGif} alt="not found" />
          <div className="not-found-text-container">
            <h2 className="wrong-turn-text">WRONG TURN?</h2>
            <p className="lost-text">
              You look lost, stranger. You know what helps when you’re lost? A
              piping hot bowl of noodles. Take a seat, we’re frantically at work
              here cooking up something good. Oh, you need something to read?
              These might help you:
            </p>
            <button className="return-button" onClick={returnHome}>
              Return to ByteBud
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default NotFound;
