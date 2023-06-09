import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import { useHistory, NavLink } from "react-router-dom";
import OpenModalButton from '../OpenModalButton/index'
import TransfersModal from './TransfersModal'



function ProfileButton() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);
  const {user} = useSelector(state => state);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  // console.log('is this the correct user?', user)

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
            <li className="user-menu">{sessionUser.first_name} {sessionUser.last_name}</li>
            <li className="user-menu user-border">Account Balance: ${user.buying_power?.toLocaleString(undefined, {    minimumFractionDigits: 2,
    maximumFractionDigits: 2,}) }</li>
            <li className="user-menu user-menu-nav"><NavLink exact to="/portfolio" className="user-menu-nav" onClick={closeMenu} id="dropdown-links-">Portfolio</NavLink></li>
            <li className="user-menu user-menu-nav"><NavLink exact to="/transactions" className="user-menu-nav" onClick={closeMenu} id="dropdown-links-">Transactions</NavLink></li>
            <li className="user-menu user-border"  onClick={closeMenu}>

              <OpenModalButton
              buttonText="Transfer"
              onItemClick={closeMenu}
              modalComponent={<TransfersModal />}
              />
            </li>

            <li className="user-menu">
              <button onClick={handleLogout} className="nav-button">Log Out</button>
            </li>
          </>

      </ul>
    </>
  );
}

export default ProfileButton;
