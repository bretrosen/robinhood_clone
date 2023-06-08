
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPortfolio } from "../../store/user";


import "./portfolio.css"
import LineChart from "../LineGraph";
import WatchlistComponent from "../Watchlist/WatchlistComponent";
import OpenModalButton from "../OpenModalButton";
import TransfersModal from "../Navigation/TransfersModal";

export default function Portfolio() {

    const { user } = useSelector(state => state)
    const sessionUser = useSelector(state => state.session.user);
    // console.log(sessionUser);
    const watchlists = user.watch_lists
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPortfolio(sessionUser.id))

    }, [dispatch, sessionUser.id])

    if (Object.values(user).length === 1) return false

    return (
        <div className="portfolio-page">
            <div className="portfolio">
                <img src="/static/stock-dice.svg" alt="dice with stocks on the sides" style={{ width: "100%" }}></img>
                <h1>Welcome to Foxtrot</h1>
                <LineChart />
                <div className="transfer">
                    <div className="transfer-left">

                        <span className="watchlist-med">Unlock your free stock</span>
                        <p className="watchlist-lrg">Add funds to claim your free stock. Limitations apply.</p>
                        <OpenModalButton type="transfer" modalComponent={<TransfersModal />}/>
                    </div>
                    <img src="/static/phone-money.svg" alt="money coming out of phone" id="transfer-img"></img>
                </div>
            </div>
            <WatchlistComponent />
        </div>
    )
}
