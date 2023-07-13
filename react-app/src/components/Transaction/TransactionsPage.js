import { useDispatch, useSelector } from "react-redux"
import { fetchPortfolio } from "../../store/user";
import { useEffect } from "react";
import WatchlistComponent from "../Watchlist/WatchlistComponent";
import pawprintImage from '../../static/pawprint.png';
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";


export default function TransactionsPage() {
    const { user } = useSelector(state => state)
    const { stock } = useSelector(state => state)
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPortfolio(sessionUser.id))
    }, [dispatch, sessionUser.id])
    if (!user) {
        return (
            <div>
                <h1>Loading...</h1>
                <div className="pawprints" style={{ backgroundImage: `url(${pawprintImage})` }}></div>
            </div>
        )
    }
    const transactions = user.transactions
    const stocks = stock.stocks
    function formatNumber(number) {
        if (Number.isInteger(number)) {
            return number;
        } else {
            return number.toFixed(1);
        }
    }
    const viewStockDetial = (id) => {
        history.push(`/stocks/${id}`)
    }

    return (
        <div className="transactions-page">
            <div>
                <div className="watchlist-page-header">
                    <p style={{ fontSize: "40px" }} id="stock-emoji">
                        📉
                    </p>
                    <p id="user-name">
                        <span style={{paddingRight: "250px"}}>

                        {user.first_name}'s Transactions
                        </span>
                    <NavLink to="/portfolio" id="portfolio-btn">Portfolio</NavLink>
                    </p>
                    <p style={{ color: "#898989", fontSize: "13px" }}>{transactions?.length} Transactions</p>
                </div>
                <div className="portfolio-page">
                    <div className="table-container" style={{height: "600px"}}>

                        <table id="watchlist-table">
                            <thead>
                                <tr>
                                    <th>Stock</th>
                                    <th>Cost</th>
                                    <th>Quantity</th>
                                    <th>Date</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>

                                {transactions?.map((transaction, index) => {
                                    let boughtSold = ""
                                    const cost = () => {
                                        if (transaction.purchased) {
                                            boughtSold = "Purchased"
                                            return (transaction.quantity * transaction.price_purchased).toFixed(2)
                                        }
                                        boughtSold = "Sold"
                                        return (transaction.quantity * transaction.price_sold).toFixed(2)
                                    }
                                    const stockId = transaction.stock_id

                                    return (<tr className="table-row" key={`transaction-list-${index}`} onClick={() => viewStockDetial(stockId)} >
                                        <td>{stocks[stockId].name}</td>
                                        <td id={transaction.purchased ? "purchased-stock" : "sold-stock"}>${cost()}</td>
                                        <td>{formatNumber(transaction.quantity)}</td>
                                        <td>{(transaction.time_stamp).split(', ')[1]}</td>
                                        <td>{boughtSold}</td>
                                    </tr>)

                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
                <WatchlistComponent type="transactions"/>


            </div>
        </div>
    )
}
