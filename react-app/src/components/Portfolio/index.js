import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPortfolio } from "../../store/user";
import "./portfolio.css"
export default function Portfolio() {
    const { user } = useSelector(state => state)
    const sessionUser = useSelector(state => state.session.user);
    // console.log(sessionUser);
    const watchlists = user.watch_lists
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPortfolio(sessionUser.id))
    }, [dispatch, sessionUser.id])

    if (!watchlists) {
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <div className="portfolio-page">
            <div className="portfolio">
                <img src="/static/stock-dice.svg" alt="dice with stocks on the sides" style={{ width: "100%" }}></img>
                <h1>Welcome to Foxtrot</h1>

                <div className="transfer">
                    <div className="tranfer-left">

                        <span>Application in review</span>
                        <p>Start a transfer so you can invest as soon as your application is approved.</p>
                        <p className="login-signup">Transer money</p>
                    </div>
                    <img src="/static/phone-money.svg" alt="money coming out of phone" ></img>
                </div>
            </div>
            <div className="portfolio-watchlist">
                <div id="watchlists-header">
                    <p>Lists</p>
                    <p>+</p>
                </div>
                {watchlists.map((list,  index) => {

                    return (
                    <div className="watchlist" key={`watchlist-index-${index}`}>
                        <div className="watchlist-left">
                            <span className="watchlist-icon">⚡️</span>
                                <span className="list-name">{list.name}</span>
                        </div>
                        <div>
                            <i className="fa fa-ellipsis-h"></i>
                            <span>^</span>
                        </div>
                    </div>)

                })}
            </div>
        </div>
    )
}
