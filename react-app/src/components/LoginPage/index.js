import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./LoginForm.css";

function LoginPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(email, password));
    } catch (err) {
      setErrors([err.message]);
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="login-box">
          <div className="login-headings">
            <span className="login-title">Welcome back!</span>
            <span className="login-subtitle">
              We're so excited to see you again!
            </span>
            {errors.length > 0 && (
              <span className="error-msgs">{`${errors}. Please try again.`}</span>
            )}
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="emailOrPhone">
                EMAIL OR PHONE NUMBER
              </label>
              <br></br>
              <input
                className="form-input"
                type="text"
                id="emailOrPhone"
                name="emailOrPhone"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                PASSWORD
              </label>
              <br></br>
              <input
                className="form-input"
                type="password"
                id="password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="login-button" type="submit">
              Log In
            </button>
            <div className="register-group">
              <span className="label-register">Need an account?</span>
              <Link to="/register" className="register">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default LoginPage;
