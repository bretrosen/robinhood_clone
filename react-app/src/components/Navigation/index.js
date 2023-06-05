import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const sessionStocks = useSelector(state => state.stock.stocks);
	const [search, setSearch] = useState("");


	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
	  };

	const handleSubmit = async (e) => {
		e.preventDefault();


	};

	return (
		<ul className='nav-bar'>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			{/* {isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)} */}
			{!sessionUser && <ul className='nav-bar'>
				<li >
					<NavLink to="/login" className='login-signup' id='log-in'>Log in</NavLink></li>
				<li >
					<NavLink to="signup" className='login-signup' id='sign-up'>Sign up</NavLink></li>
			</ul>
			}

			{sessionUser &&
				<div className='user-nav-bar'>

					<form onSubmit={handleSubmit}>
						<input
						type="text"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						/>
					</form>

					<button onClick={handleLogout} className='login-signup'>Log Out</button>
				</div>}


		</ul>
	);
}

export default Navigation;
