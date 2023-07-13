import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import { login } from '../../store/session'
import './SignupForm.css';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { fetchPortfolio } from "../../store/user";

function SignupFormPage() {
  const history = useHistory()
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password, firstName, lastName));
      const userState = await dispatch(fetchPortfolio(data.id))
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <>
      <div className="signup-page">
        <div className="signup-left">

          <p className="huge-font off-blue" >Foxtrot</p>
          <h1>Create your login</h1>
          <p style={{marginTop: '100px'}}>We'll need your name, email address, and a unique password. You'll use this login to access Robinhood next time.</p>
        </div>
        <form id="signup-form" onSubmit={handleSubmit}>
          <p className="signup-login-header " style={{fontSize: '20px', fontWeight: '500'}}>Enter your first and last name as they appear on your government ID.</p>
          <ul>
            {errors.map((error, idx) => <li key={idx} style={{color: "red"}}>{error}</li>)}
          </ul>
          <label>
            First name
          </label>
            <input
              type="text"
              className="login-input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          <label>
            Last name
          </label>
            <input
              type="text"
              className="login-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          <label>
            Email
          </label>
            <input
              type="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          <label>
            Username
          </label>
            <input
              type="text"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
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
          <label>
            Confirm Password
          </label>
            <input
              type="password"
              className="login-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

          <div className="signup-demo-buttons">
            <button type="submit" className="logIn">Sign Up</button>
            <button onClick={demoOne} className="demo-login">Demo Log In</button>
          </div>


          <p>Already started?</p>
          <NavLink to="/login" className='off-white'>Log in to complete your application</NavLink>
          <p style={{marginTop : '20px'}}>By continuing, you agree to the
            Robinhood User Account Agreement
            and
            Privacy Policy
            .</p>
        </form>
      </div>

    </>
  );
}

export default SignupFormPage;
