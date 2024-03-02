import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./SplashPage.css";
import backgroundTop from "../../static/SplashPage/splash-top-background.jpg";
import byteBudLogoWhite from "../../static/SplashPage/byte-bud-logo-white.png";
import { login } from "../../store/session";

function SplashPage() {
  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLoginClick = async (e) => {
    e.preventDefault();
    history.push("/login");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    history.push(`/register`);
  };

  function handleRayLinkedIn() {
    window.open("https://www.linkedin.com/in/raymond-lang/", "_blank");
  }

  function handleRayGithub() {
    window.open("https://github.com/raymondlang", "_blank");
  }

  function handleRayPortfolio() {
    window.open("https://raymondlang.com/", "_blank");
  }

  if (sessionUser) return <Redirect to="/channels/@me" />;

  return (
    <>
      <div className="splash-container">
        <div className="splash-top">
          <img
            className="splash-top-background"
            src={backgroundTop}
            alt="splash top background"
          />
          <div className="splash-top-nav">
            <div className="splash-top-nav-left">
              <img
                className="byte-bud-logo-white"
                src={byteBudLogoWhite}
                alt="byte bud white logo"
              />
              <h3 className="byte-bud-logo-text">ByteBud</h3>
            </div>

            <div className="splash-top-nav-right">
              <button
                className="splash-login-button signup"
                onClick={handleSignup}
              >
                Sign Up
              </button>
              <button
                className="splash-login-button"
                onClick={handleLoginClick}
              >
                Log In
              </button>
            </div>
          </div>
          <div className="splash-top-center">
            <p className="imagine-text">imagine a place...</p>
            <p className="where-you-can-text">
              ...where you can belong to a school club, a gaming group, or a
              worldwide art community. where just you and a handful of friends
              can spend time together. a place that makes it easy to talk every
              day and hang out more often. somewhere you can go with just a
              click of a button.
            </p>
            <button className="splash-open-button" onClick={handleLoginClick}>
              Launch ByteBud 👾
            </button>
          </div>
        </div>
        <div className="splash-middle">
          <p className="meet-developers-text">meet the developer.</p>
          <div className="devs-container">
            <button
              className="portfolio-button ray-button"
              onClick={handleRayPortfolio}
            >
              <div className="dev-container ray-container">
                <p className="dev-name-text ray-text">Ray Lang</p>
                <div className="dev-social-media-container">
                  <button
                    className="linkedin-button"
                    onClick={handleRayLinkedIn}
                  >
                    <i className="fa-brands fa-linkedin ray-text"></i>
                  </button>
                  <button className="github-button" onClick={handleRayGithub}>
                    <i className="fa-brands fa-github ray-text"></i>
                  </button>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="splash-bottom">
          <div className="tech-stack-container">
            <p className="tech-stack-text">THE TECH STACK</p>
            <div className="technologies">
              <ul className="tech-list">
                <li className="tech-type">Frontend</li>
                <li className="tech-item">JavaScript</li>
                <li className="tech-item">React</li>
                <li className="tech-item">Redux</li>
                <li className="tech-item">HTML5</li>
                <li className="tech-item">CSS3</li>
              </ul>
              <ul className="tech-list">
                <li className="tech-type">Backend</li>
                <li className="tech-item">Python</li>
                <li className="tech-item">Flask</li>
                <li className="tech-item">SQLAlchemy</li>
                <li className="tech-item">PostgreSQL</li>
                <li className="tech-item">Socket.io</li>
              </ul>
              <ul className="tech-list">
                <li className="tech-type">Deployment</li>
                <li className="tech-item">Render</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SplashPage;
