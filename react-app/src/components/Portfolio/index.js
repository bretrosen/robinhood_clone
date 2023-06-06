// import { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { fetchPortfolio } from "../../store/user";

import "./portfolio.css"
import LineChart from "../LineGraph";
import WatchlistComponent from "../Watchlist/WatchlistComponent";

export default function Portfolio() {

    return (
        <div className="portfolio-page">
            <div className="portfolio">
                <img src="/static/stock-dice.svg" alt="dice with stocks on the sides" style={{ width: "100%" }}></img>
                <h1>Welcome to Foxtrot</h1>
                <LineChart />
                <div className="transfer">
                    <div className="transfer-left">

                        <span>Application in review</span>
                        <p>Start a transfer so you can invest as soon as your application is approved.</p>
                        <p className="login-signup">Transer money</p>
                    </div>
                    <img src="/static/phone-money.svg" alt="money coming out of phone" ></img>
                </div>
            </div>
            <WatchlistComponent />
        </div>
    )
}
