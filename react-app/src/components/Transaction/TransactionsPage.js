import { useDispatch, useSelector } from "react-redux"
import { fetchPortfolio } from "../../store/user";
import { useEffect } from "react";

export default function TransactionsPage(){
    const { user } = useSelector(state => state)
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
    console.log(transactions);
    return (
        <div className="transactions-page">
            <div className="portfolio-page">

                <table id="watchlist-table">
                    <thead>
                        <tr>
                            <th>Stock</th>
                            <th>Cost</th>
                            <th>Quantity</th>
                            <th>Date</th>
                            <th>Market Cap</th>
                        </tr>
                    </thead>
                    <tbody>

                        {transactions?.map((transaction, index) => {
                            return (<tr className="table-row" key={`transaction-list-${index}`} >
                                <td>{transaction.stock_id}</td>
                                <td>${(transaction.quantity * transaction.price_purchased).toFixed(2)}</td>
                                <td>$15.75</td>
                                <td>+0.8%</td>
                                <td>{}</td>
                                <td className="delete-transaction"><i className="fa fa-trash"></i></td>
                            </tr>)

                        })}
                    </tbody>
                </table>

            </div>
        </div>
    )
}
