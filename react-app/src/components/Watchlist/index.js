import { useDispatch, useSelector } from "react-redux";
import WatchlistComponent from "./WatchlistComponent";
import './watchlist.css'
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { removeStockFromList } from "../../store/user";
// import { fetchPortfolio } from "../../store/user";
export default function WatchlistList() {
    const { user } = useSelector(state => state)
    const { watchlistId } = useParams()
    const watch_lists = user.watch_lists
    // console.log("user slice from watchlist =========>", watch_lists);
    // console.log("user slice from watchlist =========>", stocks);
    const history = useHistory()
    function formatLargeNumber(number) {
        const billion = 1000000000;
        const million = 1000000;

        if (number >= billion) {
            return `$${(number / billion).toFixed(2)}B`;
        } else if (number >= million) {
            return `$${(number / million).toFixed(2)}M`;
        } else {
            return `$${number}`;
        }
    }
    // const dispatch = useDispatch()
    // if (!watch_lists) {
    //     dispatch(fetchPortfolio())
    //     return (
    //         <h2>Loading....</h2>
    //     )
    // }
    const viewStockDetial = (id) => {
        history.push(`/stocks/${id}`)
    }
    const list = watch_lists?.find(list => list.id === parseInt(watchlistId))
    const stocks = list?.stocks
    const dispatch = useDispatch()
    const deleteStock = (stockId, watchlistId, e) => {
        e.stopPropagation()
        dispatch(removeStockFromList(stockId, watchlistId))
    }
    // console.log(list);
    return (

        <div>
            <div className="watchlist-page-header">
                <p style={{fontSize: "40px"}}>
                    ⚡️
                </p>
                <p>{list?.name}</p>
                <p style={{color: "#898989", fontSize: "13px"}}>{list?.stocks.length} items</p>
            </div>
            <div className="portfolio-page">

                <table id="watchlist-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Symbol</th>
                            <th>Price</th>
                            <th>Today</th>
                            <th>Market Cap</th>
                        </tr>
                    </thead>
                    <tbody>

                        {stocks?.map((stock, index) => {
                            return (<tr className="table-row" key={`stock-list-${index}`} onClick={() => viewStockDetial(stock.id)}>
                                <td>{stock.name}</td>
                                <td>{stock.symbol}</td>
                                <td>$15.75</td>
                                <td>+0.8%</td>
                                <td>{formatLargeNumber(stock.market_cap)}</td>
                                <td className="delete-stock" onClick={(e) => deleteStock(stock.id, watchlistId, e)}><i className="fa fa-trash"></i></td>
                            </tr>)

                        })}
                    </tbody>
                </table>
                <WatchlistComponent />
            </div>
        </div>
    )
}

// description
// :
// "JPMorgan Chase & Co. is an American multinational investment bank and financial services holding company headquartered in New York City. JPMorgan Chase is incorporated in Delaware. As a Bulge Bracket bank, it is a major provider of various investment banking and financial services. It is one of America's Big Four banks, along with Bank of America, Citigroup, and Wells Fargo. JPMorgan Chase is considered to be a universal bank and a custodian bank. The J.P. Morgan brand is used by the investment banking, asset management, private banking, private wealth management, and treasury services divisions."
// dividend
// :
// 0.0291
// employees
// :
// 256105
// headquarters
// :
// "New York, New York"
// id
// :
// 13
// market_cap
// :
// 401697800000
// name
// :
// "JPMORGAN Chase & Co"
// pe_ratio
// :
// 11.54
// stock_ceo
// :
// "Jaime Dimon"
// symbol
// :
// "JPM"
// year_founded
// :
// 1871
