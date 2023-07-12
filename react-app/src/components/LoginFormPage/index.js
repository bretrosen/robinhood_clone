import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './LoginForm.css';
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { fetchPortfolio } from "../../store/user";

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/portfolio" />;

  const demoOne = async (e) => {
    e.preventDefault();
    let email = 'demo@aa.io'
    let password = 'password'
    const data = await dispatch(login(email, password))
    const userState = await dispatch(fetchPortfolio(data.id))
    history.push('/portfolio');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(login(email, password));

    if (data) {
      const errors = {}
      errors.login = "Invalid credentials, please try again";
      setErrors(errors);
    }



    const userState = await dispatch(fetchPortfolio(data.id))
  };

  return (
    <>
      <div className="login-page">
        <img src="/static/login-image.jpeg" alt="sci-fi world" style={{width: "50%"}}></img>
        <form id="login-form" onSubmit={handleSubmit}>
          <p className="signup-login-header">Log in to Foxtrot</p>
          <ul>
          {errors.login && (
            <div className="createTransferErrors">* {errors.login}</div>
          )}
          </ul>
          <div className="login-inputs">

          <label>
            Email
            </label>
            <input
              type="text"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              />
              </div>
            <div className="login-inputs">

          <label>
            Password
            </label>
            <input
              type="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
          </div>
          <div className="check-box-div">
          <input type="checkbox"></input>
          <label>Keep me logged in for up to 30 days</label>
          </div>

          {/* <div>
            <p className="forgot-info">Forgot your password?</p>
            <p className="forgot-info">Forgot your email address?</p>
          </div>
          <button type="submit">Log In</button>
          <p >Not on Foxtrot? <NavLink to="/signup" className="forgot-info">Create an account</NavLink ></p>
        </form>
      </div>
    </>
  );
}

export default LoginFormPage;
