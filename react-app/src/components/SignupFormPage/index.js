import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { fetchPortfolio } from "../../store/user";

function SignupFormPage() {
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
          <p>Foxtrot</p>
          <h1>Create your login</h1>
          <p>We'll need your name, email address, and a unique password. You'll use this login to access Robinhood next time.</p>
        </div>
        <form id="signup-form" onSubmit={handleSubmit}>
          <p>Enter your first and last name as they appear on your government ID.</p>
          <ul>
            {errors.map((error, idx) => <li key={idx} style={{color: "red"}}>{error}</li>)}
          </ul>
          <label>
            First name
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label>
            Last name
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="signUp">Sign Up</button>
          <p>Already started?</p>
          <NavLink to="/login">Log in to complete your application</NavLink>
          <p>By continuing, you agree to the
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
