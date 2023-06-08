import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { logout } from "../../store/session";
import { fetchAllStocks } from '../../store/stock';
import ProfileButton from './ProfileButton';
import StockList from './StockList';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const dispatch = useDispatch();
	// const history = useHistory()
	const sessionUser = useSelector(state => state.session.user);
	const sessionStocksObj = useSelector(state => state.stock.stocks);
	const [search, setSearch] = useState("");
	const [symbol, setSymbol] = useState('')
	const [name, setName] = useState('')


	const stocks = Object.values(sessionStocksObj);

	const handleSubmit = async (e) => {
		e.preventDefault();
	};

	useEffect(() => {
		dispatch(fetchAllStocks())
	}, [])


	const showStockClass = "stock-dropdown" + (search.length > 0 ? "show" : " hidden");

	const showNoItems = "items" + (!symbol.startsWith(search.toUpperCase()) && !name.toLowerCase().startsWith(search.toLowerCase()) ? "show" : "hidden")


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
				<NavLink exact to="/" id="nav-logo">FOXTROT
					<img src='/fox-logo.png' id='fox-image'></img>
				</NavLink>
			</li>
			<div className='nav-login-signup'>
				<li className='remove-dot'>
					<NavLink to="/login" className='login-signup' id='nav-login'>Log in</NavLink></li>
				<li className='remove-dot'>
					<NavLink to="signup" className='login-signup' id='sign-up'>Sign up</NavLink></li>
			</div>
		</ul>
		}

		{sessionUser &&
			<div className='nav-bar'>
				<div className='search-home'>
					<NavLink exact to="/" id="nav-logo">FOXTROT
						<img src='/fox-logo.png' id='fox-image'></img>
					</NavLink>

					<form onSubmit={handleSubmit}>
						<i className="fas fa-search" />
						<input
							className='stockSearch'
							type="text"
							value={search}
							placeholder='Search for stocks'
							onChange={(e) => setSearch(e.target.value)}
						/>
						<div className={showStockClass}>

							<ul className={showStockClass}>
								{stocks.map((stock) => (
									<StockList
										stock={stock}
										search={search}
										setName={setName}
										setSymbol={setSymbol}
										setSearch={setSearch}
										key={stock.id}
									/>
								))}
								{
									<div id={showNoItems}>Oops, looks like there are not stocks with that symbol...</div>
								}

							</ul>
						</div>
					</form>
				</div>
				<ProfileButton user={sessionUser} />
				{/* <button onClick={handleLogout} className='login-signup'>Log Out</button> */}
			</div>}


		{/* // </ul> */}
	</>
	);
}

export default Navigation;
