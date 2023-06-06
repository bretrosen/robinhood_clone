import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import ProfileButton from './ProfileButton';
import StockList from './StockList';
import './Navigation.css';

function Navigation({ isLoaded }){
	const dispatch = useDispatch();
	const history = useHistory()
	const sessionUser = useSelector(state => state.session.user);
	const sessionStocksObj = useSelector(state => state.stock.stocks);
	const [search, setSearch] = useState("");
	const [green, setGreen] = useState(false);
	const [list, setList] = useState('')

	const stocks = Object.values(sessionStocksObj);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		history.push('/')
	  };

	const handleSubmit = async (e) => {
		e.preventDefault();
	};

	// console.log('this is the list', list)

	const showStockClass = "stock-dropdown" + (search.length > 0 ? "show" : " hidden");

	const showNoItems = "items" + (list.startsWith(search.toUpperCase()) ? "show" : "hidden")

	return (<>
		{/* // <ul className='nav-bar'>
		// 	<li>
		// 		<NavLink exact to="/">Home</NavLink>
		// 	</li> */}
			{/* {isLoaded && (
				<li>
				<ProfileButton user={sessionUser} />
				</li>
			)} */}
			{!sessionUser && <ul className='nav-bar'>
				<li>
					<NavLink exact to="/">Home</NavLink>
				</li>

				<li >
					<NavLink to="/login" className='login-signup' id='log-in'>Log in</NavLink></li>
				<li >
					<NavLink to="signup" className='login-signup' id='sign-up'>Sign up</NavLink></li>
			</ul>
			}

			{sessionUser &&
				<div className='nav-bar'>
					<div className='search-home'>
						<NavLink exact to="/">Home</NavLink>

						<form onSubmit={handleSubmit}>

							<input
							className='stockSearch'
							type="text"
							value={search}
							placeholder='Search for stocks'
							onChange={(e) => setSearch(e.target.value)}
							/>
							<div className={showStockClass}>

								<ul className={showStockClass}>
								{stocks.map((stock)=> (
									<StockList
									stock={stock}
									id={stock.id}
									search={search}
									setGreen={setGreen}
									list={list}
									setList={setList}
									/>
									))}
								{
		    						<div id={showNoItems}>Oops, looks like there are not stocks with that symbol...</div>
								}

								</ul>
							</div>
						</form>
					</div>

					<button onClick={handleLogout} className='login-signup'>Log Out</button>
				</div>}


		{/* // </ul> */}
		</>
	);
}

export default Navigation;
