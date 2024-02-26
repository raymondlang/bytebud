import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./SplashPage.css";
import backgroundTop from "../../static/SplashPage/splash-top-background.jpg";
import byteBudLogoWhite from "../../static/SplashPage/bytebud-logo-white.png";
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

  const handleDemoLogin1 = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password")).catch(async (res) => {
      const errData = await res.json();
      console.log(errData);
    });
  };

  function handleRayLinkedIn() {
    window.open("https://www.linkedin.com/in/raymondlang/", "_blank");
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
                className="bytebud-logo-white"
                src={byteBudLogoWhite}
                alt="bytebud white logo"
              />
              <h3 className="bytebud-logo-text">ByteBud</h3>
            </div>
            <div className="splash-top-nav-center">
              <button className="demo-login-button" onClick={handleDemoLogin1}>
                Demo User 1 Log In
              </button>
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
            <p className="imagine-text">IMAGINE A PLACE...</p>
            <p className="where-you-can-text">
              ...where you can belong to a school club, a gaming group, or a
              worldwide art community. Where just you and a handful of friends
              can spend time together. A place that makes it easy to talk every
              day and hang out more often.
            </p>
            <button className="splash-open-button" onClick={handleLoginClick}>
              Launch ByteBud 👾
            </button>
          </div>
        </div>
        <div className="splash-middle">
          <p className="meet-developers-text">Meet the Developer</p>
          <div className="devs-container">
            <button
              className="portfolio-button raymond-button"
              onClick={() => window.open("https://raymondlang.com/", "_blank")}
            >
              <div className="dev-container raymond-container">
                <p className="dev-name-text raymond-text">Raymond Lang</p>
                <div className="dev-social-media-container">
                  <button
                    className="portfolio-button raymond-button"
                    onClick={handleRayPortfolio}
                  >
                    <i
                      className="fa-brands fa-linkedin raymond-text"
                      onClick={handleRayLinkedIn}
                    ></i>
                  </button>
                  <button
                    className="github-button raymond-button"
                    onClick={handleRayGithub}
                  >
                    <i className="fa-brands fa-github raymond-text"></i>
                  </button>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="splash-bottom">
          <div className="tech-stack-container">
            <p className="tech-stack-text">IMAGINE A TECH STACK</p>
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
