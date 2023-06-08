import { useDispatch, useSelector } from "react-redux"
import { fetchPortfolio } from "../../store/user";
import { useEffect } from "react";
import WatchlistComponent from "../Watchlist/WatchlistComponent";

export default function TransactionsPage() {
    const { user } = useSelector(state => state)
    const { stock } = useSelector(state => state)
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPortfolio(sessionUser.id))
    }, [dispatch, sessionUser.id])
    if (!user) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
    const transactions = user.transactions
    const stocks = stock.stocks
    return (
        <div className="transactions-page">
            <div>
                <div className="watchlist-page-header">
                    <p style={{ fontSize: "40px" }} id="stock-emoji">
                        📉
                    </p>
                    <p id="user-name">{user.first_name}'s Transactions</p>
                    <p style={{ color: "#898989", fontSize: "13px" }}>{transactions?.length} Transactions</p>
                </div>
                <div className="portfolio-page">

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

                                return (<tr className="table-row" key={`transaction-list-${index}`} >
                                    <td>{stocks[stockId].name}</td>
                                    <td id={transaction.purchased ? "purchased-stock" : "sold-stock"}>${cost()}</td>
                                    <td>{transaction.quantity}</td>
                                    <td>{transaction.time_stamp}</td>
                                    <td>{boughtSold}</td>
                                </tr>)

                            })}
                        </tbody>
                    </table>
                </div>
                <WatchlistComponent />

            </div>
        </div>
    )
}
