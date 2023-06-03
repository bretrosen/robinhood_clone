import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='nav-bar'>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
			<li >
				<NavLink to="/login" className='login-signup' id='log-in'>Log in</NavLink></li>
			<li >
				<NavLink to="signup" className='login-signup' id='sign-up'>Sign up</NavLink></li>
		</ul>
	);
}

export default Navigation;
