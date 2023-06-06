import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const profileHighlight = "profile-highlight" + (showMenu ? "" : null);
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu} className='nav-button account profile' id={profileHighlight}>
        Account
      </button>
      <ul className={ulClassName} ref={ulRef}>

          <>
            <li className="user-menu">{user.first_name} {user.last_name}</li>
            <li className="user-menu user-border">Account Balance: ${user.buying_power}</li>

            <li className="user-menu">
              <button onClick={handleLogout} className="nav-button">Log Out</button>
            </li>
          </>

      </ul>
    </>
  );
}

export default ProfileButton;
